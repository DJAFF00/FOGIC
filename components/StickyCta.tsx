"use client";
import { useEffect, useState } from "react";
import { CHARIOW_URL, SITE } from "@/lib/config";

// Barre d'achat fixe sur mobile, visible après le hero.
export default function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className={`sticky-cta ${show ? "is-on" : ""}`} aria-hidden={!show}>
      <div>
        <strong>{SITE.price}</strong>
        <span>Guide PDF</span>
      </div>
      <a className="btn btn-gold" href={CHARIOW_URL} tabIndex={show ? 0 : -1}>
        Obtenir le guide
      </a>
    </div>
  );
}
