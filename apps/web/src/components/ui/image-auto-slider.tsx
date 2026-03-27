"use client";

import React from "react";

interface ImageAutoSliderProps {
  images?: string[];
  /** Duration of one full scroll cycle in seconds (default: 20) */
  duration?: number;
  /** Height class for the image items, e.g. "h-48 md:h-64 lg:h-80" */
  sizeClassName?: string;
  /** Optional className for the outer wrapper */
  className?: string;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=2152&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=2126&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1965&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=80&w=1974&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=80&w=2030&auto=format&fit=crop",
  "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=80&w=1940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=80&w=1935&auto=format&fit=crop",
];

export function ImageAutoSlider({
  images = defaultImages,
  duration = 20,
  sizeClassName = "w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80",
  className,
}: ImageAutoSliderProps) {
  const duplicatedImages = [...images, ...images];

  return (
    <div className={className}>
      <style>{`
        @keyframes ias-scroll-right {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ias-infinite-scroll {
          animation: ias-scroll-right ${duration}s linear infinite;
        }
        .ias-scroll-container {
          mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
          -webkit-mask: linear-gradient(90deg, transparent 0%, black 10%, black 90%, transparent 100%);
        }
        .ias-image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .ias-image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>

      <div className="ias-scroll-container w-full">
        <div className="ias-infinite-scroll flex gap-6 w-max">
          {duplicatedImages.map((image, index) => (
            <div
              key={index}
              className={`ias-image-item flex-shrink-0 rounded-xl overflow-hidden shadow-2xl ${sizeClassName}`}
            >
              <img
                src={image}
                alt={`Gallery image ${(index % images.length) + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
