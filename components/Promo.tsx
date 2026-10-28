"use client";
import { createContext, useContext, useEffect, useState } from "react";
import Reveal from "@/components/Reveal";
import { CHARIOW_URL, PROMO } from "@/lib/config";

const ActiveCtx = createContext(true);
const LeftCtx = createContext<number | null>(null);

// Compte à rebours basé sur une date de fin FIXE (PROMO.endsAt), identique pour tous les visiteurs.
export function PromoProvider({ children }: { children: React.ReactNode }) {
  const end = Date.parse(PROMO.endsAt);
  const [left, setLeft] = useState<number | null>(null);
  const [active, setActive] = useState(true);
  useEffect(() => {
    const tick = () => {
      const l = end - Date.now();
      setLeft(Math.max(0, l));
      setActive(l > 0);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [end]);
  return (
    <ActiveCtx.Provider value={active}>
      <LeftCtx.Provider value={left}>{children}</LeftCtx.Provider>
    </ActiveCtx.Provider>
  );
}

export const usePromoActive = () => useContext(ActiveCtx);

const pad = (n: number) => String(n).padStart(2, "0");
function useParts() {
  const left = useContext(LeftCtx);
  if (left === null) return { h: "--", m: "--", s: "--" };
  const s = Math.floor(left / 1000);
  return { h: pad(Math.floor(s / 3600)), m: pad(Math.floor((s % 3600) / 60)), s: pad(s % 60) };
}

export function priceText(active: boolean, kind: "pdf" | "ded") {
  return `${active ? PROMO[kind].promo : PROMO[kind].regular} FCFA`;
}

export default function PromoPrice({ kind }: { kind: "pdf" | "ded" }) {
  const active = useContext(ActiveCtx);
  return (
    <span className="pp">
      <strong className="pp-now">{priceText(active, kind)}</strong>
      {active && (
        <span className="pp-old">
          <del>
            <span className="sr">Au lieu de </span>
            {PROMO[kind].regular} FCFA
          </del>
          <em>Prix promo</em>
        </span>
      )}
    </span>
  );
}

export function MiniCountdown() {
  const active = useContext(ActiveCtx);
  const { h, m, s } = useParts();
  if (!active) return null;
  return (
    <p className="mini-cd intro-4">
      <span className="ribbon-dot" aria-hidden /> Prix promo : fin dans{" "}
      <b>{h}:{m}:{s}</b>
    </p>
  );
}

export function PromoBanner() {
  const active = useContext(ActiveCtx);
  const { h, m, s } = useParts();
  if (!active) return null;
  return (
    <Reveal>
      <div className="promo">
        <span className="promo-kicker">Offre promotionnelle</span>
        <h2>Procure-toi ton guide dès maintenant</h2>
        <p className="promo-sub">Les prix promo se terminent dans :</p>
        <div className="cd" role="timer" aria-label="Temps restant de l’offre promotionnelle">
          <div><b>{h}</b><small>heures</small></div>
          <div><b>{m}</b><small>minutes</small></div>
          <div><b>{s}</b><small>secondes</small></div>
        </div>
        <div className="promo-prices">
          <div><small>Guide PDF</small><PromoPrice kind="pdf" /></div>
          <div><small>Guide physique dédicacé + PDF</small><PromoPrice kind="ded" /></div>
        </div>
        <div className="promo-actions">
          <a className="btn btn-gold" href={CHARIOW_URL}>Obtenir le guide PDF</a>
          <a className="btn btn-ghost" href="#plans">Voir toutes les formules</a>
        </div>
      </div>
    </Reveal>
  );
}
