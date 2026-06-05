"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Highlight } from "@/types";
import { cn } from "@/lib/utils";
import { CardHover } from "@/components/ui/CardHover";
import { imageHoverZoom } from "@/lib/animations";

type Props = {
  item: Highlight;
  featured?: boolean;
};

export function VideoCard({ item, featured }: Props) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);

  return (
    <CardHover
      intensity="card"
      className={cn(
        "relative overflow-hidden border border-border bg-midnight",
        featured ? "aspect-[16/9]" : "aspect-video",
        "block w-full",
      )}
    >
      {playing ? (
        <iframe
          src={`${item.videoUrl}?autoplay=1`}
          title={item.title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full"
          aria-label={`Play: ${item.title}`}
        >
          <motion.div variants={imageHoverZoom} className="absolute inset-0">
            {!thumbFailed ? (
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes={featured ? "100vw" : "(min-width: 1024px) 33vw, 100vw"}
                quality={85}
                className="object-cover"
                onError={() => setThumbFailed(true)}
              />
            ) : (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(135deg,#161616,#070707)]" />
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 50% 50%, rgba(225,29,72,0.3), transparent 60%)",
                  }}
                />
              </>
            )}
          </motion.div>

          <div className="absolute inset-0 bg-midnight/30 group-hover:bg-midnight/10 transition-colors duration-700" />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border border-primary/70 bg-midnight/30 backdrop-blur transition-all duration-500 group-hover:bg-primary group-hover:border-primary">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 md:w-6 md:h-6 fill-primary group-hover:fill-midnight transition-colors duration-500 ml-1"
              >
                <path d="M8 5v14l11-7L8 5z" />
              </svg>
            </span>
          </span>

          <div className="absolute inset-x-0 bottom-0 p-5 md:p-7 flex items-end justify-between bg-gradient-to-t from-midnight/90 to-transparent">
            <div className="text-left">
              <h3 className="font-display text-xl md:text-3xl text-text">
                {item.title}
              </h3>
              {item.date && (
                <span className="label-sm text-faint">
                  {item.date}
                </span>
              )}
            </div>
            {item.duration && (
              <span className="label-sm text-primary">
                {item.duration}
              </span>
            )}
          </div>
        </button>
      )}
    </CardHover>
  );
}
