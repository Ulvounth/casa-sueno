"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

export default function PriceTable() {
  const seasonPrices = [
    { name: "low_season", label: "Low season", price: 60 },
    { name: "middle_season", label: "Middle season", price: 80 },
    { name: "high_season", label: "High season", price: 110 },
  ];

  const fixedCosts = [
    { label: "Utilities & Cleaning", price: 90 },
    { label: "Security deposit", price: 200 },
  ];

  const t = useTranslations("prices");
  const locale = useLocale();

  // Holiday periods (High Season) - Verified Nov 2025
  // Summer months (Jun-Sep) already set as high season in database
  const holidayPeriods = [
    // === SUMMER HIGH SEASON ===
    { year: 2025, key: "summer_high_season", period: "1 Jun - 30 Sep 2025" },
    { year: 2026, key: "summer_high_season", period: "1 Jun - 30 Sep 2026" },
    { year: 2027, key: "summer_high_season", period: "1 Jun - 30 Sep 2027" },

    // === 2025-2026 School Year ===
    // Juleferie 2025-26 (Christmas Holiday)
    { year: 2025, key: "christmas_nl", period: "20 Dec - 31 Dec 2025" },
    { year: 2025, key: "christmas_belgium", period: "22 Dec - 31 Dec 2025" },
    { year: 2025, key: "christmas_spain", period: "23 Dec - 31 Dec 2025" },

    // Nyttårsperiode (New Year Period)
    { year: 2026, key: "newyear_nl_be", period: "1 Jan - 4 Jan 2026" },
    { year: 2026, key: "newyear_spain", period: "1 Jan - 7 Jan 2026" },

    // Vinter/Karneval 2026 (Winter/Carnival Holiday)
    {
      year: 2026,
      key: "winter_nl_midden_zuid",
      period: "14 Feb - 22 Feb 2026",
    },
    { year: 2026, key: "winter_belgium", period: "16 Feb - 22 Feb 2026" },
    { year: 2026, key: "winter_nl_noord", period: "21 Feb - 1 Mar 2026" },

    // Påskeferie 2026 (Easter Holiday)
    { year: 2026, key: "easter_belgium", period: "6 Apr - 19 Apr 2026" },
    { year: 2026, key: "easter_nl_approx", period: "6 Apr - 19 Apr 2026" },
    { year: 2026, key: "easter_spain", period: "13 Apr - 19 Apr 2026" },

    // Mai-/Vårferie 2026 (May/Spring Holiday)
    { year: 2026, key: "may_nl", period: "25 Apr - 3 May 2026" },

    // === 2026-2027 School Year ===
    // Høstferie 2026 (Autumn Holiday)
    { year: 2026, key: "autumn_nl_noord", period: "10 Oct - 18 Oct 2026" },
    {
      year: 2026,
      key: "autumn_nl_midden_zuid",
      period: "17 Oct - 25 Oct 2026",
    },
    { year: 2026, key: "autumn_belgium_2wk", period: "19 Oct - 30 Oct 2026" },

    // Juleferie 2026-27 (Christmas Holiday)
    { year: 2026, key: "christmas_nl_be", period: "19 Dec 2026 - 3 Jan 2027" },

    // Vinterferie 2027 (Winter Holiday)
    { year: 2027, key: "winter_belgium", period: "8 Feb - 14 Feb 2027" },
    {
      year: 2027,
      key: "winter_nl_midden_zuid",
      period: "13 Feb - 21 Feb 2027",
    },
    { year: 2027, key: "winter_nl_noord", period: "20 Feb - 28 Feb 2027" },
  ];

  // Tabs for year selection
  const years = [2025, 2026, 2027];
  const [selectedYear, setSelectedYear] = useState(2025);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{t("seasonPrices")}</h3>
        <table className="w-full border">
          <tbody>
            {seasonPrices.map((s) => (
              <tr key={s.name}>
                <td className="border px-2 py-1">{t(s.name) || s.label}</td>
                <td className="border px-2 py-1">€{s.price}/night</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{t("holidayPeriods")}</h3>
        {/* Year Tabs */}
        <div className="flex gap-2 mb-4">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-4 py-2 rounded-t-lg font-medium border-b-2 transition-colors duration-200
                ${selectedYear === year ? "bg-blue-100 border-blue-500 text-blue-900" : "bg-white border-transparent text-gray-600 hover:bg-blue-50"}`}
            >
              {year}
            </button>
          ))}
        </div>
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-left">
                {t("holidayPeriods")}
              </th>
              <th className="border px-2 py-1 text-left">
                {locale === "nl" ? "Periode" : "Period"}
              </th>
            </tr>
          </thead>
          <tbody>
            {holidayPeriods
              .filter((h) => h.year === selectedYear)
              .sort((a, b) => {
                // Extract start date as YYYYMMDD for sorting
                const getStart = (p: { period: string }) => {
                  const [start] = p.period.split(" - ");
                  const [day, month, year] = start.split(" ");
                  // Month as number
                  const months: Record<string, number> = {
                    Jan: 1,
                    Feb: 2,
                    Mar: 3,
                    Apr: 4,
                    May: 5,
                    Jun: 6,
                    Jul: 7,
                    Aug: 8,
                    Sep: 9,
                    Oct: 10,
                    Nov: 11,
                    Dec: 12,
                  };
                  return (
                    parseInt(year) * 10000 +
                    (months[month] ?? 0) * 100 +
                    parseInt(day)
                  );
                };
                return getStart(a) - getStart(b);
              })
              .map((h, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">
                    {t(`holidays.${selectedYear}.${h.key}`)}
                  </td>
                  <td className="border px-2 py-1">{h.period}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">{t("fixedCosts")}</h3>
        <table className="w-full border">
          <tbody>
            {fixedCosts.map((f) => (
              <tr key={f.label}>
                <td className="border px-2 py-1">{t(f.label) || f.label}</td>
                <td className="border px-2 py-1">€{f.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        <p>{t("note")}</p>
      </div>
    </div>
  );
}
