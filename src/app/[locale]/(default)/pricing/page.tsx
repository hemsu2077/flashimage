import Pricing from "@/components/blocks/pricing";
import { getPricingPage } from "@/services/page";
import FAQ from "@/components/blocks/faq";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations();
  
  let canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/pricing`;
  if (locale !== "en") {
    canonicalUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/${locale}/pricing`;
  }

  return {
    title: t("metadata.pricing.title"),
    description: t("metadata.pricing.description"),
    keywords: t("metadata.pricing.keywords"),
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = await getPricingPage(locale);

  return (
    <>
      {page.pricing && <Pricing pricing={page.pricing} />}
      {page.faq && <FAQ section={page.faq} />}
    </>
  );
}
