import { GA_EVENTS, sendEvent } from "./events";

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...OLD_ENV };
});

afterEach(() => {
  process.env = OLD_ENV;
  jest.restoreAllMocks();
});

describe("GA_EVENTS constants", () => {
  it("defines DOWNLOAD_CV constant (maps to GA4 recommended file_download)", () => {
    expect(GA_EVENTS.DOWNLOAD_CV).toBe("file_download");
  });

  it("defines NAV_CLICK constant", () => {
    expect(GA_EVENTS.NAV_CLICK).toBe("nav_click");
  });

  it("defines CONTACT_SUBMIT constant (maps to GA4 recommended generate_lead)", () => {
    expect(GA_EVENTS.CONTACT_SUBMIT).toBe("generate_lead");
  });
});

describe("sendEvent SSR guard", () => {
  it("returns early when window is undefined", () => {
    const originalWindow = (globalThis as unknown as Record<string, unknown>)
      .window;
    delete (globalThis as unknown as Record<string, unknown>).window;

    const result = sendEvent(GA_EVENTS.DOWNLOAD_CV);

    (globalThis as unknown as Record<string, unknown>).window = originalWindow;

    expect(result).toBeUndefined();
  });
});

describe("sendEvent in development mode", () => {
  beforeEach(() => {
    // @ts-expect-error - NODE_ENV is mutable at runtime despite Node types
    process.env.NODE_ENV = "development";
  });

  it("logs the event via console.log in development", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

    sendEvent(GA_EVENTS.NAV_CLICK, { href: "#home" });

    expect(consoleSpy).toHaveBeenCalledWith("[GA Event]", "nav_click", {
      href: "#home",
    });
  });

  it("does not call window.gtag in development", () => {
    const gtagMock = jest.fn();
    (window as unknown as Record<string, unknown>).gtag = gtagMock;

    sendEvent(GA_EVENTS.DOWNLOAD_CV);

    expect(gtagMock).not.toHaveBeenCalled();
  });
});

describe("sendEvent in production mode", () => {
  beforeEach(() => {
    // @ts-expect-error - NODE_ENV is mutable at runtime despite Node types
    process.env.NODE_ENV = "production";
  });

  it("calls window.gtag with event name and params in production", () => {
    const gtagMock = jest.fn();
    (window as unknown as Record<string, unknown>).gtag = gtagMock;

    sendEvent(GA_EVENTS.CONTACT_SUBMIT, { form: "contact" });

    expect(gtagMock).toHaveBeenCalledWith("event", "generate_lead", {
      form: "contact",
    });
  });
});
