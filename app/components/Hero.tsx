// app/components/Hero.tsx
"use client";
import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";

const videos = [
  "/videos/placeholder1.mp4",
  "/videos/placeholder2.mp4",
  "/videos/placeholder3.mp4",
];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % videos.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        key={videos[idx]}
        src={videos[idx]}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop={false}
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">
          Welcome to Casa Sueño
        </h1>
        <p className="mt-4 text-lg md:text-2xl drop-shadow">
          Your dream holiday home in Spain
        </p>
        <button
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-red-600 px-6 py-3 text-lg font-semibold transition hover:bg-red-700"
        >
          View All Photos
        </button>
      </div>

      {open && (
        <ImageModal
          images={["/img/1.jpg", "/img/2.jpg", "/img/3.jpg"]}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}
