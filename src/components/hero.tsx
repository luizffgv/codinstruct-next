"use client";

import { useEffect, useRef } from "react";
import styles from "./hero.module.css";

const MAX_PARTICLE_SIZE = 35;

export default function Hero({
  children,
  className,
}: Readonly<{ children: React.ReactNode; className?: string }>) {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!(container instanceof HTMLElement))
      throw new TypeError("containerRef doesn't hold an HTML element.");
    const canvas = canvasRef.current;
    if (!(canvas instanceof HTMLCanvasElement))
      throw new TypeError("canvasRef doesn't hold a <canvas> element.");

    const resizeObserver = new ResizeObserver(() => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    });
    resizeObserver.observe(container);

    const ctx = canvas.getContext("2d");
    let state = 0;
    let lastTime = 0;
    if (ctx == undefined) throw new Error("Couldn't create canvas context.");
    const draw = (time: number) => {
      drawID = requestAnimationFrame(draw);

      const canvasRect = canvas.getBoundingClientRect();
      // Return early if the canvas is not visible
      if (
        canvasRect.top > innerHeight ||
        canvasRect.bottom < 0 ||
        canvasRect.left > innerWidth ||
        canvasRect.right < 0
      )
        return;

      const dt = time - lastTime;
      lastTime = time;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = "#232136";
      for (let y = 0; y < canvas.height; y += MAX_PARTICLE_SIZE + 15)
        for (let x = 0; x < canvas.width; x += MAX_PARTICLE_SIZE + 15) {
          const size =
            ((Math.sin(x / 2 + state) + Math.sin(y + state) + 2) / 4) *
            MAX_PARTICLE_SIZE;
          const offset = (MAX_PARTICLE_SIZE - size) / 2;

          ctx.beginPath();
          ctx.roundRect(x + offset, y + offset, size, size, [8]);
          ctx.fill();
        }
      state = (state + dt * 0.001) % 100_000;
    };
    let drawID = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(drawID);
      resizeObserver.disconnect();
    };
  });

  return (
    <section
      className={[styles.hero, className ?? ""].join(" ")}
      ref={containerRef}
    >
      <canvas className={styles.canvas} ref={canvasRef}></canvas>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
