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
          <div className="flex h-full items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200 transform"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <DialogPanel className="relative w-full max-w-5xl rounded-lg bg-white overflow-hidden shadow-xl">
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-10"
                >
                  <XMarkIcon className="h-7 w-7" />
                </button>

                {/* Main image */}
                <div className="relative w-full pt-[60%]">
                  <Image
                    src={images[idx]}
                    alt={`House photo ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
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
                        `relative h-20 w-28 flex-shrink-0 cursor-pointer rounded overflow-hidden border-2 ` +
                        (i === idx
                          ? "border-indigo-500"
                          : "border-transparent hover:border-gray-300")
                      }
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90px, 120px"
                      />
                    </div>
                  ))}
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100"
                >
                  <ChevronLeftIcon className="h-8 w-8 text-gray-700" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg hover:bg-gray-100"
                >
                  <ChevronRightIcon className="h-8 w-8 text-gray-700" />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
