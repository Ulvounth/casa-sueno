// app/components/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";

const videos = [
  "/videos/placeholder1.mp4",
  "/videos/placeholder2.mp4",
  "/videos/placeholder3.mp4",
];

const carouselImages = [
  "/carousel/image1.jpg",
  "/carousel/image2.jpg",
  "/carousel/image3.jpg",
  "/carousel/image4.jpg",
];

export default function Hero() {
  const [vidIdx, setVidIdx] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const id = setInterval(() => {
      setVidIdx((i) => (i + 1) % videos.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative h-[75vh] md:h-[65vh] w-full overflow-hidden">
      {/* background video carousel */}
      <video
        key={videos[vidIdx]}
        src={videos[vidIdx]}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop={false}
      />

      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* text & button */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <div className="inline-block px-2 py-4">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-lg">
            Welcome to Casa Sueño
          </h1>
          <p className="mt-2 text-sm md:text-lg lg:text-xl text-white drop-shadow">
            Your dream holiday home in Spain
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="
    mt-5 inline-flex items-center justify-center
    rounded-2xl bg-white text-black
    px-6 py-2 text-base font-semibold
    shadow
    transition
    cursor-pointer
    hover:bg-gray-200 hover:scale-105 hover:shadow-lg
    focus:outline-none focus:ring-2 focus:ring-black/30
  "
          >
            See all photos
          </button>
        </div>
      </div>

      {/* image-carousel modal */}
      {isModalOpen && (
        <ImageModal
          images={carouselImages}
          onClose={() => setModalOpen(false)}
        />
      )}
    </section>
  );
}
