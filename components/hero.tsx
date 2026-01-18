"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const HERO_IMAGES = [
  "/inicio/hero1.jpg",
  "/inicio/hero2.jpg",
  "/inicio/hero3.jpg",
];

const TRANSITION_INTERVAL = 5000; // 5 seconds

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, TRANSITION_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  console.log("Current hero image:", HERO_IMAGES[currentIndex]);

  return (
    <div className="absolute inset-0 z-0 bg-background">
      {HERO_IMAGES.map((imageSrc, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentIndex === index ? 1 : 0,
          }}
        >
          <Image
            src={imageSrc}
            alt={`Hero carousel slide ${index + 1}`}
            fill
            priority={index === 0}
            className="object-cover object-center"
            sizes="(max-width: 960px) 100vw, 960px"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/45 via-foreground/20 to-background/85" />
    </div>
  );
}
