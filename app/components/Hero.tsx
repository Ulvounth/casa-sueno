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

      {/* text & button - positioned below header */}
      <div className="max-w-7xl mx-auto relative z-10 px-4 pt-24 md:pt-28">
        <div className="max-w-lg">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-lg">
            Welcome to Casa Sueño
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl text-white drop-shadow">
            Your dream holiday home in Spain
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-8 inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white text-black px-6 py-2 text-base font-medium shadow-sm transition-all duration-200 hover:bg-gray-100 hover:shadow-md hover:scale-105 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            See all photos
          </button>
        </div>
      </div>

      {/* Scroll down indicator - Just arrow - positioned at bottom of screen - Hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 hidden md:block">
        <button
          onClick={() => {
            document.getElementById("about-section")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="transition-all duration-300 hover:scale-110 group cursor-pointer"
        >
          {/* Arrow circle only */}
          <div className="relative">
            <div className="absolute inset-0 bg-black/40 rounded-full blur-sm scale-110"></div>
            <div className="relative w-10 h-10 border-2 border-white/90 bg-white/15 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/25 group-hover:border-white shadow-lg">
              <svg
                className="w-4 h-4 animate-bounce group-hover:animate-none"
                fill="none"
                stroke="white"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
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
