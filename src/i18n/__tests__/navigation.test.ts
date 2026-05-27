// Mock next-intl/navigation — ESM modules not transformed by Jest
jest.mock("next-intl/navigation", () => ({
  createNavigation: jest.fn().mockReturnValue({
    Link: "LinkComponent",
    redirect: "redirectFn",
    usePathname: "usePathnameFn",
    getPathname: "getPathnameFn",
    useRouter: "useRouterFn",
  }),
}));

import { Link, redirect, usePathname, getPathname, useRouter } from "../navigation";

describe("navigation exports", () => {
  it("exports Link", () => {
    expect(Link).toBe("LinkComponent");
  });

  it("exports redirect", () => {
    expect(redirect).toBe("redirectFn");
  });

  it("exports usePathname", () => {
    expect(usePathname).toBe("usePathnameFn");
  });

  it("exports getPathname", () => {
    expect(getPathname).toBe("getPathnameFn");
  });

  it("exports useRouter", () => {
    expect(useRouter).toBe("useRouterFn");
  });
});
