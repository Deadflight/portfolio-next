import { routing } from "../routing";

describe("routing config", () => {
  it("defines locales as ['en', 'es']", () => {
    expect(routing.locales).toEqual(["en", "es"]);
  });

  it("sets defaultLocale to 'en'", () => {
    expect(routing.defaultLocale).toBe("en");
  });

  it("sets localePrefix to 'as-needed'", () => {
    expect(routing.localePrefix).toBe("as-needed");
  });
});
