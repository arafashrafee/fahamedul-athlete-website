"use client";

import Image from "next/image";
import type { GalleryItem } from "@/types";
import { ImageHover } from "@/components/ui/ImageHover";

export function PhotoTile({ item }: { item: GalleryItem }) {
  return (
    <ImageHover
      intensity="card"
      className="w-full h-full border border-border bg-surface"
      staticOverlay={
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/85 via-transparent to-transparent opacity-60" />
          <figcaption className="absolute inset-x-0 bottom-0 p-4 flex justify-between items-end">
            <span className="label-sm text-text">{item.alt}</span>
            <span className="label-sm text-primary">{item.id.toUpperCase()}</span>
          </figcaption>
        </>
      }
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        quality={82}
        className="object-cover"
      />
    </ImageHover>
  );
}
