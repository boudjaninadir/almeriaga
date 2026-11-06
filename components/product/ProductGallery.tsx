'use client';

import Image from 'next/image';
import { useState } from 'react';

type GalleryImage = { src: string; label: string };

export function ProductGallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  if (!current) return null;

  return (
    <div>
      <div className="relative aspect-[680/720] w-full overflow-hidden bg-surface">
        <Image
          src={current.src}
          alt={current.label}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 58vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <button
              key={image.src + index}
              type="button"
              onClick={() => setActive(index)}
              aria-pressed={index === active}
              className={
                'relative aspect-[4/3] overflow-hidden bg-surface border transition-colors ' +
                (index === active ? 'border-ink' : 'border-transparent hover:border-stone')
              }
            >
              <Image src={image.src} alt={image.label} fill sizes="20vw" className="object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-paper/90 px-2 py-1 text-start font-sans text-[10px] text-stone">
                {image.label}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
