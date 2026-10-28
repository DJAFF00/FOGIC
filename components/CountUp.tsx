"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

// Compte de 0 jusqu'à la valeur cible quand l'élément apparaît à l'écran.
export default function CountUp({ to, suffix = "", duration = 1.8 }: { to: number; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setV(to); return; }
    const c = animate(0, to, { duration, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref}>
      <span aria-hidden>{v.toLocaleString("fr-FR")}{suffix}</span>
      <span className="sr">{to.toLocaleString("fr-FR")}{suffix}</span>
    </span>
  );
}
