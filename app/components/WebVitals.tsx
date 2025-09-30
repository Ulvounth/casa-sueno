"use client";

import { useReportWebVitals } from "next/web-vitals";
import { trackWebVitals } from "@/lib/analytics";

export function WebVitals() {
  useReportWebVitals(trackWebVitals);
  return null;
}
