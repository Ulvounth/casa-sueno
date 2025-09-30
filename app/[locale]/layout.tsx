import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { locales } from "@/i18n";
import "../globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { WebVitals } from "../components/WebVitals";
import { Montserrat } from "next/font/google";

export const metadata = {
  title: "Casa Sueño",
  description: "Your dream holiday apartment in Spain",
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
