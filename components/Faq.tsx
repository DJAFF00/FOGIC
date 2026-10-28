"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type FaqItem = { q: string; a: string };

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.q} className={`faq-item ${isOpen ? "is-open" : ""}`}>
            <button
              className="faq-q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
            >
              <span>{it.q}</span>
              <span className="faq-icon" aria-hidden />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="faq-a">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
