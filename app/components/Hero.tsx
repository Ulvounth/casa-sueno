"use client";

import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";

const videos = [
  "/videos/placeholder1.mp4",
  "/videos/placeholder2.mp4",
  "/videos/placeholder3.mp4",
];

// point to your compressed carousel folder
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
    <section className="relative h-screen w-full overflow-hidden">
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
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold drop-shadow-lg">
          Welcome to Casa Sueño
        </h1>
        <p className="mt-4 text-lg md:text-2xl drop-shadow">
          Your dream holiday home in Spain
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="
    mt-8
    inline-flex items-center justify-center
    rounded-full
    bg-purple-500
    px-6 py-3 text-lg font-semibold text-white
    shadow-sm
    transition hover:bg-purple-600
    focus:outline-none focus:ring-2 focus:ring-purple-300
  "
        >
          View All Photos
        </button>
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
