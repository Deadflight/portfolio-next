import { POST, GET } from "./route";

// Mock next/cache — inline factory (Jest hoists jest.mock)
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
  revalidateTag: jest.fn(),
}));

// Mock next/server — avoids Request is not defined in jsdom
jest.mock("next/server", () => ({
  NextRequest: jest.fn(),
  NextResponse: {
    json: jest.fn(),
  },
}));

const { revalidatePath, revalidateTag } = jest.requireMock("next/cache") as {
  revalidatePath: jest.Mock;
  revalidateTag: jest.Mock;
};
const { NextResponse } = jest.requireMock("next/server") as {
  NextResponse: { json: jest.Mock };
};

describe("POST /api/revalidate", () => {
  const VALID_SECRET = "test-webhook-secret";

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.SANITY_WEBHOOK_SECRET = VALID_SECRET;
  });

  function buildPostRequest(secretValue?: string) {
    return {
      headers: {
        get: jest.fn((name: string) => {
          if (name === "x-sanity-webhook-secret") return secretValue ?? null;
          return null;
        }),
      },
    };
  }

  it("returns 200 and calls revalidatePath+revalidateTag when secret matches", async () => {
    NextResponse.json.mockReturnValue({ status: 200 });

    const request = buildPostRequest(VALID_SECRET);
    await POST(request as never);

    expect(revalidatePath).toHaveBeenCalledWith("/[locale]/blog", "page");
    expect(revalidateTag).toHaveBeenCalledWith("sanity");
    expect(NextResponse.json).toHaveBeenCalledWith(
      { revalidated: true }
    );
  });

  it("returns 401 when secret does not match", async () => {
    NextResponse.json.mockReturnValue({ status: 401 });

    const request = buildPostRequest("wrong-secret");
    await POST(request as never);

    expect(revalidatePath).not.toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: "Invalid secret" },
      { status: 401 }
    );
  });

  it("returns 401 when x-sanity-webhook-secret header is missing", async () => {
    NextResponse.json.mockReturnValue({ status: 401 });

    const request = buildPostRequest();
    await POST(request as never);

    expect(revalidatePath).not.toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: "Invalid secret" },
      { status: 401 }
    );
  });

  it("returns 405 for GET requests", async () => {
    NextResponse.json.mockReturnValue({ status: 405 });

    await GET();

    expect(revalidatePath).not.toHaveBeenCalled();
    expect(revalidateTag).not.toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith(
      { message: "Method not allowed" },
      { status: 405 }
    );
  });
});
