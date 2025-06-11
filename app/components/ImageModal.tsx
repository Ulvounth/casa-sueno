"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
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
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Bakgrunn */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        {/* Innhold */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="flex h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300 transform"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-200 transform"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <Dialog.Panel className="relative w-full max-w-3xl rounded bg-white overflow-hidden">
                {/* Lukk-knapp */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 z-10"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Bilde-container med 16:9-ratio */}
                <div className="relative w-full pt-[56.25%]">
                  <Image
                    src={images[idx]}
                    alt={`Bilde ${idx + 1}`}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Navigasjons-piler */}
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
                >
                  <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
                </button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 hover:bg-white"
                >
                  <ChevronRightIcon className="h-6 w-6 text-gray-700" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
