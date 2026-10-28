"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CHARIOW_URL } from "@/lib/config";

const links = [
  ["#guide", "Le guide"],
  ["#auteur", "L’auteur"],
  ["#avis", "Avis"],
  ["#offre", "Formules"],
  ["#faq", "Questions"],
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onOutside = (e: Event) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onOutside);
    };
  }, [open]);

  return (
    <div className="mm" ref={ref}>
      <button
        type="button"
        className="burger"
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="mm-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mm-panel"
            className="mm-panel"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <nav className="wrap" aria-label="Menu principal">
              {links.map(([href, label], i) => (
                <motion.a
                  key={href}
                  href={href}
                  className="mm-link"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.25 }}
                >
                  {label}
                  <span aria-hidden>→</span>
                </motion.a>
              ))}
              <a className="btn btn-gold" href={CHARIOW_URL} onClick={() => setOpen(false)}>
                Obtenir le guide
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
