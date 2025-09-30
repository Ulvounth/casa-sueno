// lib/analytics.ts
interface WebVitalMetric {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

export function trackWebVitals(metric: WebVitalMetric) {
  if (process.env.NODE_ENV === "production") {
    // Log to console for now - can be extended to send to analytics services
    console.log("Web Vital:", metric);

    // Example: Send to Google Analytics
    // gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_category: 'Web Vitals',
    //   event_label: metric.id,
    //   non_interaction: true,
    // });

    // Example: Send to Vercel Analytics
    // analytics.track(metric.name, {
    //   value: metric.value,
    //   label: metric.id,
    // });
  }
}
