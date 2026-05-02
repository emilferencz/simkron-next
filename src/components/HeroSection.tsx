"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Reference canvas: 1920 × 1080 px (exact Canva dimensions)
// Positions converted to vw/vh for pixel-perfect proportional scaling
const vw = (px: number) => `calc(${px} / 1920 * 100vw)`;
const vh = (px: number) => `calc(${px} / 1080 * 100vh)`;

// Lines — exact gradient data extracted from Canva published site JSON
// All use 180deg (top→bottom), transition completes at 43% of height
const LINES = [
  { left: 242,  w: 21.75, h: 811,  top: "#00f0ff", bot: "#fff7bd" },
  { left: 269,  w: 21.75, h: 684,  top: "#00f0ff", bot: "#fff7bd" },
  { left: 295,  w: 21.75, h: 626,  top: "#00f0ff", bot: "#fff6ba" },
  { left: 323,  w: 15.41, h: 590,  top: "#00f0ff", bot: "#fff6ba" },
  { left: 463,  w: 22.18, h: 550,  top: "#00f0ff", bot: "#ffde00" },
  { left: 492,  w: 22.18, h: 577,  top: "#00f0ff", bot: "#ffde00" },
  { left: 523,  w: 20.06, h: 607,  top: "#00f0ff", bot: "#ffde00" },
  { left: 552,  w: 19.11, h: 615,  top: "#00f0ff", bot: "#ffde00" },
  { left: 583,  w: 19.11, h: 635,  top: "#00f0ff", bot: "#ffde00" },
  { left: 615,  w: 18.85, h: 678,  top: "#00f0ff", bot: "#ffde00" },
  { left: 647,  w: 16.92, h: 736,  top: "#ff66c4", bot: "#ffde00" },
  { left: 674,  w: 21.84, h: 813,  top: "#00f0ff", bot: "#ffde00" },
];

// Blur overlay elements — exact Canva positions (in 1920×1080 scale)
// These create the atmospheric depth and dark backdrop behind text logos
const BLURS = [
  // Turquoise blur — upper-center area
  { top: 199,  h: 554, color: "rgba(92,225,230,0.28)" },
  // Dark #231f20 blur — lower-center area (two overlapping)
  { top: 471,  h: 392, color: "rgba(35,31,32,0.42)" },
  { top: 578,  h: 392, color: "rgba(35,31,32,0.38)" },
  // Dark teal #195775 blur — bottom area
  { top: 679,  h: 392, color: "rgba(25,87,117,0.38)" },
];

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax — robot + Technologies slowest, SimKron medium
  const robotY   = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const techY    = useTransform(scrollYProgress, [0, 1], [0, -220]);
  const simkronY = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const labelY   = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* ── Background gradient — exact from Canva published site: 90deg, #c3a455 → #7ee1d8 ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(90deg, #c3a455 0%, #7ee1d8 100%)",
        }}
      />

      {/* ── Rainbow vertical lines — exact Canva positions ── */}
      {LINES.map((line, i) => (
        <motion.div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            left: vw(line.left),
            top: 0,
            width: vw(line.w),
            height: vh(line.h),
            background: `linear-gradient(180deg, ${line.top} 0%, ${line.bot} 43%)`,
            borderRadius: "0 0 50% 50% / 0 0 12px 12px",
          }}
          initial={{ y: "-110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
        />
      ))}

      {/* ── Blur overlays — from Canva (above lines, below robot/text) ── */}
      {BLURS.map((blur, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            top: vh(blur.top),
            left: "-50%",
            width: "200%",
            height: vh(blur.h),
            background: blur.color,
            filter: "blur(55px)",
            pointerEvents: "none",
          }}
        />
      ))}

      {/* ── Robot — exact Canva position ── */}
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          left: vw(221.76),
          top: vh(257.56),
          width: vw(505.66),
          height: vh(589.18),
          y: robotY,
        }}
      >
        <motion.div
          style={{ position: "relative", width: "100%", height: "100%" }}
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <Image
            src="/robot.png"
            alt="SimKron robot arm"
            fill
            sizes="(max-width: 1920px) 30vw, 506px"
            className="object-contain"
            priority
          />
        </motion.div>
      </motion.div>

      {/* ── Label text — exact Canva position ── */}
      <motion.div
        style={{
          position: "absolute",
          left: vw(593.56),
          top: vh(161.47),
          width: vw(1006.53),
          y: labelY,
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: "easeOut", delay: 0.1 }}
      >
        <p style={{
          fontSize: vw(40),
          color: "#000000",
          fontWeight: "normal",
          textAlign: "center",
        }}>
          Prelucrări mecanice Brașov - CNC și Automatizări Industriale
        </p>
        <p style={{
          fontSize: vw(16),
          color: "#000000",
          textAlign: "center",
          marginTop: vh(24),
          lineHeight: 1.65,
        }}>
          Când credem în ideile noastre, ne angajăm să<br />
          explorăm toate modalitățile pentru ca<br />
          acestea să devină realitate.
        </p>
      </motion.div>

      {/* ── SimKron text image — exact Canva position ── */}
      <motion.div
        style={{
          position: "absolute",
          left: vw(602.59),
          top: vh(457.25),
          width: vw(988.47),
          height: vh(231.05),
          y: simkronY,
        }}
      >
        <motion.div
          style={{ position: "relative", width: "100%", height: "100%" }}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
        >
          <Image
            src="/simkron-logo-v2.png"
            alt="SimKron"
            fill
            unoptimized
            sizes="(max-width: 1920px) 52vw, 988px"
            className="object-contain object-left-bottom"
            priority
          />
        </motion.div>
      </motion.div>

      {/* ── Technologies text image — exact Canva position ── */}
      <motion.div
        style={{
          position: "absolute",
          left: vw(909.64),
          top: vh(647.28),
          width: vw(659.39),
          height: vh(154.13),
          y: techY,
        }}
      >
        <motion.div
          style={{ position: "relative", width: "100%", height: "100%" }}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.38 }}
        >
          <Image
            src="/technologies-text.png"
            alt="Technologies"
            fill
            unoptimized
            sizes="(max-width: 1920px) 35vw, 659px"
            className="object-contain object-left"
            priority
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
