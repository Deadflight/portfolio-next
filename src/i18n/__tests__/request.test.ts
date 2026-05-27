jest.mock("next-intl/server", () => ({
  getRequestConfig: jest.fn(
    (
      createConfig: (params: { requestLocale: Promise<string | undefined> }) => unknown
    ) => createConfig
  ),
}));

import getRequestConfig from "../request";

describe("request config", () => {
  it("resolves locale to 'en' when requestLocale is undefined", async () => {
    const config = await (
      getRequestConfig as unknown as (
        params: { requestLocale: Promise<string | undefined> }
      ) => Promise<{ locale: string }>
    )({ requestLocale: Promise.resolve(undefined) });

    expect(config.locale).toBe("en");
  });

  it("resolves locale to 'es' when requestLocale is 'es'", async () => {
    const config = await (
      getRequestConfig as unknown as (
        params: { requestLocale: Promise<string | undefined> }
      ) => Promise<{ locale: string }>
    )({ requestLocale: Promise.resolve("es") });

    expect(config.locale).toBe("es");
  });

  it("loads messages for the resolved locale", async () => {
    type Messages = { common?: Record<string, unknown> };
    const config = await (
      getRequestConfig as unknown as (
        params: { requestLocale: Promise<string | undefined> }
      ) => Promise<{ messages: Messages }>
    )({ requestLocale: Promise.resolve("en") });

    expect(config.messages).toBeDefined();
    expect((config.messages as Messages).common).toBeDefined();
  });

  it("loads Spanish messages when locale is 'es'", async () => {
    type Messages = { common?: { toggleLanguage?: string } };
    const config = await (
      getRequestConfig as unknown as (
        params: { requestLocale: Promise<string | undefined> }
      ) => Promise<{ messages: Messages }>
    )({ requestLocale: Promise.resolve("es") });

    expect((config.messages as Messages).common?.toggleLanguage).toBe(
      "Cambiar idioma"
    );
  });
});
