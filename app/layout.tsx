// app/layout.tsx
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Montserrat } from "next/font/google";
import { SupabaseProvider } from "./providers/SupabaseProvider";

export const metadata = {
  title: "Casa Sueño",
  description: "Your dream holiday apartment in Spain",
};

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} bg-white text-gray-800 antialiased flex flex-col min-h-screen`}
      >
        <SupabaseProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </SupabaseProvider>
      </body>
    </html>
  );
}
