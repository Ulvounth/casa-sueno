"use client";

import { Fragment, useState } from "react";
import {
  Transition,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface ImageModalProps {
  images: string[];
  onClose: () => void;
}

export default function ImageModal({ images, onClose }: ImageModalProps) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <Transition show as={Fragment} appear>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/80" />
        </TransitionChild>

        {/* Panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="flex h-full items-center justify-center p-2 md:p-4 lg:p-6 xl:p-8">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200 transform"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <DialogPanel className="relative w-full max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-[90vw] rounded-lg bg-white overflow-hidden shadow-xl">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-2 md:top-4 md:right-4 lg:top-6 lg:right-6 text-gray-600 hover:text-gray-900 z-10 bg-white/80 hover:bg-white rounded-full p-2 transition-all"
                >
                  <XMarkIcon className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
                </button>

                {/* Main image */}
                <div className="relative w-full pt-[50%] md:pt-[55%] lg:pt-[60%] xl:pt-[65%] 2xl:pt-[70vh] bg-gray-100">
                  <Image
                    src={images[idx]}
                    alt={`House photo ${idx + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 95vw, (max-width: 1024px) 90vw, (max-width: 1280px) 85vw, 80vw"
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                  />
                </div>

                {/* Thumbnails strip */}
                <div className="mt-4 flex space-x-2 overflow-x-auto px-4 pb-4">
                  {images.map((src, i) => (
                    <div
                      key={i}
                      onClick={() => setIdx(i)}
                      className={
                        `relative h-16 w-24 sm:h-20 sm:w-28 lg:h-24 lg:w-32 xl:h-28 xl:w-40 flex-shrink-0 cursor-pointer rounded overflow-hidden border-2 ` +
                        (i === idx
                          ? "border-indigo-500"
                          : "border-transparent hover:border-gray-300")
                      }
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-contain bg-gray-50"
                        sizes="(max-width: 640px) 90px, (max-width: 1024px) 120px, (max-width: 1280px) 140px, 160px"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prev}
                  className="absolute left-2 md:left-4 lg:left-6 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 md:p-3 lg:p-4 shadow-lg hover:bg-gray-100 transition-all"
                >
                  <ChevronLeftIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-gray-700" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 md:right-4 lg:right-6 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 md:p-3 lg:p-4 shadow-lg hover:bg-gray-100 transition-all"
                >
                  <ChevronRightIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 text-gray-700" />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
