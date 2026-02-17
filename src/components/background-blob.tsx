"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface BackgroundBlobProps {
  className?: string;
  gradient?: string;
  clipPath: string;
  /** Parallax speed: 0 = no movement, negative = slower than scroll (default -0.3) */
  speed?: number;
}

export function BackgroundBlob({
  className = "",
  gradient = "from-primary/20 to-primary/5",
  clipPath,
  speed = -0.3,
}: BackgroundBlobProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 400]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <motion.div className={`absolute blur-3xl ${className}`} style={{ y, willChange: "transform" }}>
        <div
          className={`aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr ${gradient} opacity-30`}
          style={{ clipPath }}
        />
      </motion.div>
    </div>
  );
}
