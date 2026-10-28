import { CHARIOW_URL, SITE, WA_DEDICACE } from "@/lib/config";

const WaIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-2-1-.8.7c-.9-.4-1.6-1.1-2-2l.7-.8-1-2L9 9.5Z" fill="currentColor" stroke="none" />
  </svg>
);

// Toujours visible : barre à 2 boutons sur mobile, pastille flottante sur ordinateur.
export default function Dock() {
  return (
    <aside className="dock" aria-label="Accès rapide aux formules">
      <a className="dock-pdf" href={CHARIOW_URL}>
        <small>Guide PDF</small>
        <b>{SITE.price}</b>
      </a>
      <a className="dock-wa" href={WA_DEDICACE} target="_blank" rel="noopener noreferrer">
        <WaIcon />
        <span>
          <small>Dédicacé + PDF · WhatsApp</small>
          <b>22 400 FCFA</b>
        </span>
      </a>
    </aside>
  );
}
