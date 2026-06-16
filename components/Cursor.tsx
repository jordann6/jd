"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const dot = dotRef.current;
    const co = coordRef.current;
    if (!ring || !dot || !co) return;

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let x = rx;
    let y = ry;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.transform = `translate(${x - 2}px, ${y - 2}px)`;
      co.style.transform = `translate(${x + 18}px, ${y + 18}px)`;
      co.textContent = `+${x.toString().padStart(4, "0")}.000 / +${y
        .toString()
        .padStart(4, "0")}.000`;
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      ring.style.transform = `translate(${rx - 14}px, ${ry - 14}px)`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", onMove);

    const sel = "a, button, .proj__item, .contact__link, .skills__group .items span, .filter-chip";
    const onOver = (e: Event) => {
      if ((e.target as Element).closest(sel)) ring.classList.add("cursor-active");
    };
    const onOut = (e: Event) => {
      if ((e.target as Element).closest(sel)) ring.classList.remove("cursor-active");
    };
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
    };
  }, []);

  return (
    <>
      <div className="cursor-ring" ref={ringRef} aria-hidden />
      <div className="cursor-dot" ref={dotRef} aria-hidden />
      <div className="cursor-coords" ref={coordRef} aria-hidden>
        +000.000 / +000.000
      </div>
    </>
  );
}
