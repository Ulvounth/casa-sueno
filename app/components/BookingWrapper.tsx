"use client";

import dynamic from "next/dynamic";

const BookingForm = dynamic(() => import("./BookingForm"), {
  ssr: false,
});

export default function BookingWrapper() {
  return <BookingForm />;
}
