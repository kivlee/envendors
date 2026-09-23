"use client";

import { useEffect, useRef } from "react";
import { useMotionPaused } from "@/components/motion";

// ASCII-art density ramp, lightest to heaviest.
const RAMP = [".", ":", "-", "~", "^", "=", "+", "*", "i", "l", "1", "#", "%", "@"];
const THICKNESS = 0.24; // half-height of the ribbon, as a share of the area's height
const SHAPE_SIZE = 0.66; // height of a logo, as a share of the area's height
const HOLD_S = 4.5; // seconds each ribbon or logo stays on screen
const WASH_S = 2.6; // seconds for the wave to wash one shape into the next
const WAVE_W = 0.22; // width of the churning wave front, as a share of the area's width
const INK = "#131313";
// Character size. Small screens get a finer grid, so logos keep their detail.
const FONT_SIZE = 12;
const CELL_H = 16;
const SMALL_SCREEN = 640; // px
const FONT_SIZE_SMALL = 8;
const CELL_H_SMALL = 10;
const FPS = 30;
const SPEED = 0.35; // how fast the ribbon drifts

const smooth = (x: number) => x * x * (3 - 2 * x);
const clamp01 = (x: number) => Math.min(1, Math.max(0, x));

// A living background drawn in ASCII characters on a fixed grid: a slowly
// waving ribbon that, when given shapes (image URLs), is washed into each of
// them in turn by a wave, as if by water, and back into the ribbon.
export default function GlyphField({ className = "", shapes = [] }: { className?: string; shapes?: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shapeKey = shapes.join("|");
  const paused = useMotionPaused();
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const urls = shapeKey ? shapeKey.split("|") : [];
    let cols = 0;
    let rows = 0;
    let cellW = 9;
    let cellH = CELL_H;
    let small = false; // a phone-sized area: finer, bolder and crisper
    let width = 0;
    let height = 0;
    let grain = new Float32Array(0);
    const images: (HTMLImageElement | null)[] = urls.map(() => null);
    let masks: (Float32Array | null)[] = urls.map(() => null);
    let frame = 0;
    let lastDraw = 0;
    let visible = true;
    let alive = true;
    let start = performance.now();

    // Render a logo into a grid the size of the character grid and keep its
    // coverage per cell (0 to 1). A slight blur gives it soft ASCII edges.
    const buildMask = (img: HTMLImageElement) => {
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true });
      if (!o) return null;
      const aspect = img.naturalWidth / img.naturalHeight || 1;
      let boxH = height * SHAPE_SIZE;
      let boxW = boxH * aspect;
      const maxW = width * (width < SMALL_SCREEN ? 0.94 : 0.8);
      if (boxW > maxW) {
        boxW = maxW;
        boxH = boxW / aspect;
      }
      const w = boxW / cellW;
      const h = boxH / cellH;
      // Soft edges look good on a large grid; on a small one they turn to mush.
      o.filter = small ? "none" : "blur(0.6px)";
      o.drawImage(img, (cols - w) / 2, (rows - h) / 2, w, h);
      const data = o.getImageData(0, 0, cols, rows).data;
      const mask = new Float32Array(cols * rows);
      for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] / 255;
      return mask;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      ({ width, height } = canvas.getBoundingClientRect());
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      small = width < SMALL_SCREEN;
      cellH = small ? CELL_H_SMALL : CELL_H;
      ctx.font = `${small ? `600 ${FONT_SIZE_SMALL}` : FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
      ctx.textBaseline = "top";
      cellW = Math.ceil(ctx.measureText("M").width) + 1;
      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);
      // A fixed per-cell grain, so edges break up like hand-made ASCII art.
      grain = new Float32Array(cols * rows).map(() => Math.random() - 0.5);
      masks = images.map((img) => (img ? buildMask(img) : null));
      draw(performance.now());
    };

    function draw(now: number) {
      const seconds = (now - start) / 1000;
      const t = seconds * SPEED;
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = INK;

      // Where the ribbon sits in each column this frame.
      const centre = new Float32Array(cols);
      const thick = new Float32Array(cols);
      const taper = new Float32Array(cols);
      for (let c = 0; c < cols; c++) {
        const x = c / cols;
        centre[c] = rows * 0.5 + Math.sin(x * 7 + t * 1.2) * rows * 0.1 + Math.sin(x * 2.6 - t * 0.7) * rows * 0.07;
        taper[c] = Math.sin(Math.PI * x) ** 0.7;
        thick[c] = rows * THICKNESS * (0.75 + 0.25 * Math.sin(x * 11 - t * 1.6)) * taper[c];
      }

      // The show: ribbon, then each loaded logo, then back to the ribbon.
      const states = [-1, ...masks.map((m, k) => (m ? k : -2)).filter((k) => k >= 0)];
      const period = HOLD_S + WASH_S;
      const elapsed = still ? 0 : seconds % (states.length * period);
      const step = Math.floor(elapsed / period);
      const local = elapsed - step * period;
      const washing = local > HOLD_S;
      const p = washing ? (local - HOLD_S) / WASH_S : 0;
      const from = states[step];
      const to = states[(step + 1) % states.length];
      // The wave front travels from beyond the left edge to beyond the right edge.
      const front = -WAVE_W + p * (1 + 2 * WAVE_W);

      // How dense a state is at a (possibly displaced) cell.
      const valueOf = (state: number, c: number, r: number) => {
        c = Math.round(c);
        r = Math.round(r);
        if (c < 0 || r < 0 || c >= cols || r >= rows) return 0;
        if (state === -1) {
          if (thick[c] < 0.5) return 0;
          return Math.max(0, 1 - Math.abs(r - centre[c]) / thick[c]) * taper[c];
        }
        // A logo that isn't ready yet (still loading, or rebuilt after a resize) draws nothing.
        const mask = masks[state];
        if (!mask || mask.length !== cols * rows) return 0;
        // Logos shimmer slightly, so they feel alive while they hold.
        // On small screens logos are filled solid and barely shimmer, so they stay legible.
        if (small) return Math.min(1, mask[r * cols + c] * 1.6) * (0.94 + 0.06 * Math.sin(c * 0.35 + r * 0.6 - seconds * 2.5));
        return mask[r * cols + c] * (0.82 + 0.18 * Math.sin(c * 0.35 + r * 0.6 - seconds * 2.5));
      };

      for (let r = 0; r < rows; r++) {
        // The front is not a straight line: it rolls, like the lip of a wave.
        const edge = front + Math.sin(r * 0.45 + seconds * 4) * 0.025 + Math.sin(r * 0.13 - seconds * 1.7) * 0.04;
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          let v: number;
          if (!washing) {
            v = valueOf(from, c, r);
          } else {
            // d: -1 well behind the wave (new shape), +1 still ahead of it (old shape).
            const d = (c / cols - edge) / WAVE_W;
            if (d <= -1) v = valueOf(to, c, r);
            else if (d >= 1) v = valueOf(from, c, r);
            else {
              // Inside the wave the water churns: both shapes are pulled and
              // rippled, and show through each other before the new one settles.
              const churn = 1 - Math.abs(d);
              const dy = Math.sin(c * 0.22 + seconds * 7) * rows * 0.09 * churn;
              const dx = Math.cos(r * 0.35 - seconds * 6) * cols * 0.015 * churn;
              const mix = smooth(clamp01((1 - d) / 2)); // 0 ahead of the wave, 1 behind it
              const oldRaw = valueOf(from, c - dx, r + dy);
              const nextRaw = valueOf(to, c + dx, r - dy);
              // Spray along the lip of the wave, only where there is something to wash.
              const presence = clamp01(Math.max(oldRaw, nextRaw) * 2.5);
              const foam = churn ** 4 * 0.6 * presence * (0.5 + 0.5 * Math.sin(r * 1.3 + c * 0.7 + seconds * 9));
              v = Math.max(oldRaw * (1 - mix), nextRaw * mix, foam);
            }
          }
          if (v < 0.02) continue;
          const level = Math.floor((v + grain[i] * (small ? 0.1 : 0.25)) * RAMP.length);
          if (level < 0) continue;
          ctx!.fillText(RAMP[Math.min(RAMP.length - 1, level)], c * cellW, r * cellH + 2);
        }
      }
    }

    let lastTick = performance.now();
    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      // While paused, move the start forward with the clock so time stands still
      // and the animation resumes exactly where it stopped.
      if (pausedRef.current) start += now - lastTick;
      lastTick = now;
      if (pausedRef.current || !visible || now - lastDraw < 1000 / FPS) return;
      lastDraw = now;
      draw(now);
    };

    resize();
    urls.forEach((url, k) => {
      const img = new Image();
      img.src = url;
      img
        .decode()
        .then(() => {
          if (!alive) return;
          images[k] = img;
          masks[k] = buildMask(img);
        })
        .catch(() => {});
    });
    const resizer = new ResizeObserver(resize);
    resizer.observe(canvas);
    // Stop drawing while the field is scrolled out of view.
    const viewer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    viewer.observe(canvas);
    if (!still) frame = requestAnimationFrame(loop);

    return () => {
      alive = false;
      resizer.disconnect();
      viewer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [shapeKey]);

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block size-full ${className}`} />;
}
