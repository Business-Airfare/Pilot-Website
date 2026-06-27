"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroMercuryContent from "./HeroMercuryContent";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HeroScrub() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const topBlurRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const video = videoRef.current;
      const topBlur = topBlurRef.current;
      const overlay = overlayRef.current;
      if (!container || !video) return;

      const FADE_OUT_SPEED = 3; // fully gone after ~first third of hero scroll

      const setOverlayOpacity = (progress: number) => {
        const fade = Math.max(0, 1 - progress * FADE_OUT_SPEED);
        const opacity = String(fade);
        if (topBlur) topBlur.style.opacity = opacity;
        if (overlay) {
          overlay.style.opacity = opacity;
          const interactive = overlay.querySelector<HTMLElement>(
            "[data-hero-interactive]",
          );
          if (interactive) {
            interactive.style.pointerEvents = fade > 0.12 ? "auto" : "none";
          }
        }
      };

      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=300%",
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        onUpdate: (self) => {
          const v = videoRef.current;
          if (v && v.duration) v.currentTime = self.progress * v.duration;
          setOverlayOpacity(self.progress);
        },
      });

      setOverlayOpacity(0);

      const onLoadedMetadata = () => ScrollTrigger.refresh();
      video.addEventListener("loadedmetadata", onLoadedMetadata);

      return () => {
        video.removeEventListener("loadedmetadata", onLoadedMetadata);
      };
    },
    { scope: containerRef },
  );

  return (
    <section ref={containerRef} className="hero">
      <video
        ref={videoRef}
        src="/hero-scrub.mp4"
        poster="/hero-start-frame.jpg"
        muted
        playsInline
        preload="auto"
      />

      <div ref={topBlurRef} className="hero-top-blur" aria-hidden />

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-10 flex items-start justify-center px-6 pt-24 lg:px-12 lg:pt-28"
      >
        <HeroMercuryContent />
      </div>
    </section>
  );
}
