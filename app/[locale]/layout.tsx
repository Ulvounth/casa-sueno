import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { WebVitals } from "../components/WebVitals";
import { Montserrat } from "next/font/google";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Casa Sueño - Luxury Vacation Rental in Orihuela, Alicante",
    template: "%s | Casa Sueño",
  },
  description:
    "Experience your dream holiday at Casa Sueño - a beautiful vacation rental in Orihuela, Alicante, Costa Blanca, Spain. Modern amenities, stunning views, and the perfect location for your Spanish getaway.",
  keywords: [
    "vacation rental Orihuela",
    "holiday apartment Alicante",
    "Costa Blanca accommodation",
    "Orihuela holiday home",
    "Spain vacation rental",
    "Casa Sueño",
    "luxury apartment Orihuela",
    "Alicante Costa Blanca",
  ],
  authors: [{ name: "Casa Sueño" }],
  creator: "Casa Sueño",
  publisher: "Casa Sueño",
  metadataBase: new URL("https://casa-sueno.com"),
  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      nl: "/nl",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["nl_NL"],
    url: "https://casa-sueno.com",
    siteName: "Casa Sueño",
    title: "Casa Sueño - Luxury Vacation Rental in Orihuela, Alicante",
    description:
      "Experience your dream holiday at Casa Sueño - a beautiful vacation rental in Orihuela, Alicante, Costa Blanca, Spain.",
    images: [
      {
        url: "/carousel/_DSC8475.JPG",
        width: 1200,
        height: 630,
        alt: "Casa Sueño - Vacation Rental in Orihuela, Alicante",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa Sueño - Luxury Vacation Rental in Orihuela, Alicante",
    description:
      "Experience your dream holiday at Casa Sueño - a beautiful vacation rental in Orihuela, Alicante, Costa Blanca, Spain.",
    images: ["/carousel/_DSC8475.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "W7L2lIfGvUTUwvsu1Te4yF9TIHZRS5wKm4bl",
  },
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as "en" | "nl")) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${montserrat.variable} bg-stone-50 text-stone-800 antialiased flex flex-col min-h-screen`}
      >
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WebVitals />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
