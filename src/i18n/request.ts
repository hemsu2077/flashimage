import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // 直接使用 en 作为默认语言，不处理其他语言
  if (!routing.locales.includes(locale as any)) {
    locale = "en";
  }

  try {
    const messages = (await import(`./messages/${locale.toLowerCase()}.json`))
      .default;
    return {
      locale: locale,
      messages: messages,
    };
  } catch (e) {
    return {
      locale: "en",
      messages: (await import(`./messages/en.json`)).default,
    };
  }
});
