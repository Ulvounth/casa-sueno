import PriceTable from "@/app/components/PriceTable";
import { getTranslations } from "next-intl/server";

export default async function PricesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "prices" });
  return (
    <main className="py-8">
      <div className="max-w-2xl mx-auto mb-8 mt-16">
        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-100 via-blue-50 to-white border-l-4 border-blue-400 rounded-lg shadow-sm p-6">
          <svg
            className="w-8 h-8 text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 2m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h1 className="text-3xl font-bold text-blue-900 mb-1">
              {t("title")}
            </h1>
            <p className="text-gray-700 text-base">{t("intro")}</p>
          </div>
        </div>
      </div>
      <PriceTable />
    </main>
  );
}
