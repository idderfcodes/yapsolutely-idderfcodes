import Image from "next/image";

export default function ImageAutoSlider () {
  // Images for the infinite scroll - using Unsplash URLs
  const images = [
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=75&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=75&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=75&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=75&w=1200&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1673264933212-d78737f38e48?q=75&w=1200&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1711434824963-ca894373272e?q=75&w=1200&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1675705721263-0bbeec261c49?q=75&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524799526615-766a9833dec0?q=75&w=1200&auto=format&fit=crop"
  ];

  // Duplicate images for seamless loop
  const duplicatedImages = [...images, ...images];

  return (
    <>
      <style>{`
        @keyframes scroll-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .infinite-scroll {
          animation: scroll-right 45s linear infinite;
        }

        .scroll-container {
          mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
          -webkit-mask: linear-gradient(
            90deg,
            transparent 0%,
            black 10%,
            black 90%,
            transparent 100%
          );
        }

        .image-item {
          transition: transform 0.3s ease, filter 0.3s ease;
        }

        .image-item:hover {
          transform: scale(1.05);
          filter: brightness(1.1);
        }
      `}</style>
      
      <div className="relative mt-8 flex w-full items-center justify-center overflow-hidden border-t border-[var(--color-dark-divider)] bg-[#0A0A0A] py-10 [content-visibility:auto] sm:mt-12 sm:py-16">
        {/* Subtle top spotlight to blend from previous section */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[var(--color-accent-primary)] opacity-[0.05] blur-[120px] pointer-events-none rounded-full" />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-screen pointer-events-none"></div>
        
        {/* Scrolling images container */}
        <div className="relative z-10 flex w-full items-center justify-center py-4 sm:py-6">
          <div className="scroll-container w-full max-w-6xl">
            <div className="infinite-scroll flex w-max gap-3 sm:gap-6">
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="image-item relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-xl border border-[var(--color-dark-divider)] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-[var(--color-accent-primary)]/50 sm:h-44 sm:w-44 md:h-56 md:w-56 lg:h-72 lg:w-72"
                >
                  <Image
                    src={image}
                    alt={`Gallery image ${(index % images.length) + 1}`}
                    fill
                    sizes="(max-width: 640px) 128px, (max-width: 1024px) 224px, 288px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
