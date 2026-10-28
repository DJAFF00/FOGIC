import Image from "next/image";
import Reveal from "@/components/Reveal";
import Faq, { type FaqItem } from "@/components/Faq";
import CountUp from "@/components/CountUp";
import Dock from "@/components/Dock";
import MobileMenu from "@/components/MobileMenu";
import PromoPrice, { MiniCountdown, PromoBanner } from "@/components/Promo";
import { testimonials } from "@/lib/testimonials";
import { CHARIOW_URL, HERO_IMAGE, OFFER_IMAGE, SITE, STATS, WA_ACCOMPAGNEMENT, WA_DEDICACE } from "@/lib/config";

const preparer = [
  { t: "L’achat d’un terrain", d: "Les précautions à prendre et les vérifications à envisager avant de t’engager." },
  { t: "Les documents immobiliers", d: "Comprendre les pièces qu’on te présente et savoir quelles informations faire vérifier." },
  { t: "Le choix d’un bien", d: "Les questions à examiner avant de décider d’une parcelle ou d’une maison." },
  { t: "La préparation d’un projet", d: "Ce qu’il faut considérer avant de mobiliser ton argent." },
  { t: "L’investissement immobilier", d: "Décider avec méthode, pas sur la seule base d’une promesse ou d’une impression." },
  { t: "La construction d’un patrimoine", d: "Une approche plus réfléchie de tes projets immobiliers, étape après étape." },
];

const profils = [
  "Un particulier qui veut acheter sa première parcelle au Bénin",
  "Un salarié qui prépare un investissement immobilier",
  "Un membre de la diaspora qui veut investir au pays",
  "Une personne qui envisage de construire sa maison",
  "Un propriétaire qui veut développer son patrimoine",
  "Un investisseur qui veut mieux connaître le marché béninois",
];

const plans: {
  name: string; promo: "pdf" | "ded" | null; price?: string; tag: string; items: string[];
  cta: string; href: string; wa: boolean; featured: boolean;
}[] = [
  {
    name: "Guide PDF",
    promo: "pdf",
    tag: "Achat sur Chariow",
    items: ["Livre numérique PDF de 148 pages", "Accès immédiat après paiement"],
    cta: "Acheter sur Chariow",
    href: CHARIOW_URL,
    wa: false,
    featured: false,
  },
  {
    name: "Guide physique dédicacé + PDF",
    promo: "ded",
    tag: "Commande via WhatsApp",
    items: ["Exemplaire physique dédicacé", "Version PDF incluse"],
    cta: "Commander sur WhatsApp",
    href: WA_DEDICACE,
    wa: true,
    featured: true,
  },
  {
    name: "Guide physique dédicacé + accompagnement personnalisé",
    promo: null,
    price: "100 000 FCFA",
    tag: "Échange via WhatsApp",
    items: ["Exemplaire physique dédicacé", "Accompagnement personnalisé", "Détails présentés directement sur WhatsApp"],
    cta: "En discuter sur WhatsApp",
    href: WA_ACCOMPAGNEMENT,
    wa: true,
    featured: false,
  },
];

const statCards = [
  STATS.buyers != null && { v: `${STATS.buyers}+`, l: "lecteurs ont déjà acheté le guide", count: { to: STATS.buyers, suffix: "+" } },
  STATS.reviews != null && { v: `${STATS.reviews}+`, l: "avis déjà reçus", count: { to: STATS.reviews, suffix: "+" } },
  { v: "148", l: "pages de contenu, en PDF", count: { to: 148, suffix: "" } },
  { v: "0 attente", l: "accès immédiat après l’achat du PDF", accent: true },
].filter(Boolean) as { v: string; l: string; accent?: boolean; count?: { to: number; suffix: string } }[];

const questions = [
  "Les documents qu’on me présente sont-ils fiables ?",
  "Le bien correspond-il vraiment à ce qu’on me montre ?",
  "Quelles vérifications faire avant de payer ?",
  "Comment éviter une décision prise dans la précipitation ?",
];

const faq: FaqItem[] = [
  { q: "Comment je reçois mon guide ?", a: "Pour le guide PDF, tu achètes depuis la boutique Chariow et tu accèdes au fichier selon les modalités de livraison indiquées sur la page de la boutique. Pour les formules avec guide physique dédicacé, tu es dirigé vers WhatsApp pour échanger directement avec Francis." },
  { q: "Combien coûte le guide ?", a: "Les prix en vigueur sont affichés dans la section « Choisis ta formule » (prix promotionnels pendant la durée de l’offre). La formule guide physique dédicacé + accompagnement personnalisé est à 100 000 FCFA." },
  { q: "Comment commander le guide physique dédicacé ?", a: "Clique sur « Commander sur WhatsApp ». La conversation s’ouvre avec un message déjà prêt : il te suffit de l’envoyer pour échanger sur ta commande." },
  { q: "Dans quel format est le guide ?", a: "Le guide fait 148 pages. Il existe en livre numérique PDF, que tu peux consulter à ton rythme, et en version physique dédicacée." },
  { q: "Je débute, est-ce que c’est pour moi ?", a: "Oui. Tu n’as pas besoin d’être un professionnel de l’immobilier pour commencer à mieux comprendre les enjeux de ton projet." },
  { q: "Je vis à l’étranger, est-ce adapté à la diaspora ?", a: "Oui. Le guide est aussi destiné à la diaspora : si tu souhaites investir au Bénin depuis l’étranger, il t’aide à comprendre les documents et les vérifications avant d’engager ton argent." },
  { q: "Le guide promet-il un investissement sans risque ?", a: "Non. L’objectif n’est pas de te promettre un investissement sans risque, mais de t’aider à mieux t’informer, à poser de meilleures questions et à décider avec davantage de discernement." },
  { q: "Le guide remplace-t-il un professionnel ?", a: "Non. C’est un guide d’information et de sensibilisation. Il ne remplace pas les vérifications auprès des professionnels compétents ni les conseils juridiques, techniques ou financiers adaptés à ta situation." },
];

function Cta({ children = "Obtenir le guide", variant = "gold" }: { children?: React.ReactNode; variant?: "gold" | "navy" }) {
  return (
    <a className={`btn btn-${variant}`} href={CHARIOW_URL}>
      {children}
    </a>
  );
}

export default function Page() {
  return (
    <>
      <div className="top">
        <div className="ribbon" role="note">
          <div className="wrap ribbon-in">
            <span className="ribbon-dot" aria-hidden />
            <p>
              <span className="rb-long"><b>Le tout premier guide</b> qui pense et priorise la sécurité juridique des biens des citoyens béninois et de la diaspora</span>
              <span className="rb-short"><b>1er guide</b> pour la sécurité juridique de tes biens · Bénin &amp; diaspora</span>
            </p>
          </div>
        </div>
      <header className="nav">
        <div className="wrap nav-in">
          <a href="#top" className="brand" aria-label="FOGIC — accueil">
            <Image src="/logo-fogic.png" alt="" width={46} height={46} className="brand-logo" priority />
            <span className="brand-txt">
              <b>FOGIC</b>
              <small>Parcelles &amp; Maisons</small>
            </span>
          </a>
          <nav className="nav-links" aria-label="Navigation">
            <a href="#guide">Le guide</a>
            <a href="#auteur">L’auteur</a>
            <a href="#avis">Avis</a>
            <a href="#offre">Formules</a>
            <a href="#faq">Questions</a>
          </nav>
          <a className="btn btn-gold nav-cta" href={CHARIOW_URL}>Obtenir le guide</a>
          <MobileMenu />
        </div>
      </header>
      </div>

      <main id="top">
        {/* HERO */}
        <section className="hero">
          <div className="hero-grid" aria-hidden />
          <div className="wrap hero-in">
            <div className="hero-copy">
              <p className="pill intro-1">Guide numérique PDF · Bénin &amp; diaspora</p>
              <h1 className="intro-2">
                Avant d’engager ton argent dans l’immobilier, comprends ce que tu fais.
              </h1>
              <p className="lead intro-3">
                Un terrain peut sembler intéressant. Une maison peut paraître être une bonne
                affaire. Mais sais-tu quelles vérifications effectuer avant de payer, et quels
                documents examiner ?
              </p>
              <div className="hero-actions intro-4">
                <Cta>Obtenir le guide</Cta>
                <div className="price">
                  <PromoPrice kind="pdf" />
                  <span>Livre numérique PDF · 148 pages</span>
                </div>
              </div>
              <MiniCountdown />
              <p className="byline intro-4">
                Par <b>{SITE.author}</b>, fondateur de {SITE.brand}
              </p>
            </div>
          </div>
        <div className="hero-photo intro-book">
          <picture>
            <source media="(min-width: 860px)" srcSet={HERO_IMAGE.src} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={HERO_IMAGE.mobileSrc}
              alt="Un homme souriant tient le guide « Investir dans l’immobilier au Bénin — Le guide complet »"
              width={HERO_IMAGE.width}
              height={HERO_IMAGE.height}
              fetchPriority="high"
              decoding="async"
              className="hero-photo-img"
            />
          </picture>
        </div>
        </section>

        {/* CHIFFRES */}
        <section className="stats" aria-label="Le guide en chiffres">
          <div className="wrap stats-grid">
            {statCards.map((st, i) => (
              <Reveal key={st.l} delay={i * 0.06} className="stat">
                <strong className={st.accent ? "is-accent" : ""}>
                  {st.count ? <CountUp to={st.count.to} suffix={st.count.suffix} /> : st.v}
                </strong>
                <span>{st.l}</span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="sec sec-light" id="guide">
          <div className="wrap split">
            <Reveal className="split-head">
              <h2>Une décision immobilière se prépare.</h2>
              <p className="muted">
                Plus le montant engagé est important, plus il est utile de s’informer avant de
                s’engager. Ces questions, mieux vaut se les poser avant de sortir son argent, pas après
                avoir rencontré un problème.
              </p>
            </Reveal>
            <ul className="qlist">
              {questions.map((q, i) => (
                <li key={q}>
                  <Reveal delay={i * 0.07} y={18}>
                    <span className="qmark" aria-hidden>?</span>
                    <span>{q}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* REFRAME */}
        <section className="sec sec-white">
          <div className="wrap">
            <Reveal className="center narrow">
              <h2>L’investissement immobilier, ce n’est pas seulement pour faire du business.</h2>
              <p className="muted">C’est aussi pour toi.</p>
            </Reveal>
            <div className="trio">
              {[
                ["Tu achètes une parcelle, tu construis et tu y habites", "C’est un investissement."],
                ["Tu achètes une maison pour y habiter", "C’est un investissement."],
                ["Tu veux simplement construire ton patrimoine immobilier", "C’est aussi un investissement."],
              ].map(([a, b], i) => (
                <Reveal key={a} delay={i * 0.08} className="trio-card">
                  <p>{a}</p>
                  <strong>{b}</strong>
                </Reveal>
              ))}
            </div>
            <Reveal className="callout">
              <p>
                Le guide ne parle pas seulement de ceux qui veulent faire du business. Il parle
                surtout de <b>ta sécurité juridique</b> concernant tes investissements.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CE QUE TU PEUX MIEUX PREPARER */}
        <section className="sec sec-navy">
          <div className="wrap">
            <Reveal className="narrow">
              <h2 className="on-dark">Ce que tu pourras mieux préparer</h2>
              <p className="on-dark-muted">
                Le guide t’aide à approfondir ta compréhension des enjeux liés à :
              </p>
            </Reveal>
            <div className="grid3">
              {preparer.map((p, i) => (
                <Reveal key={p.t} delay={(i % 3) * 0.07} className="pcard">
                  <h3>{p.t}</h3>
                  <p>{p.d}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="honest">
              L’objectif n’est pas de te promettre un investissement sans risque. Il est de t’aider
              à mieux t’informer, à poser de meilleures questions et à prendre tes décisions avec
              davantage de discernement.
            </Reveal>
          </div>
        </section>

        {/* POUR QUI */}
        <section className="sec sec-light">
          <div className="wrap split">
            <Reveal className="split-head">
              <h2>À qui s’adresse ce guide ?</h2>
              <p className="muted">
                Tu n’as pas besoin d’être un professionnel de l’immobilier pour commencer à mieux
                comprendre les enjeux de ton projet.
              </p>
            </Reveal>
            <ul className="plist">
              {profils.map((p, i) => (
                <li key={p}>
                  <Reveal delay={i * 0.05} y={14}>
                    <span className="tick" aria-hidden />
                    <span>{p}</span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* DIASPORA */}
        <section className="diaspora">
          <Reveal className="wrap diaspora-in">
            <h2>Tu vis à l’étranger ? Ce guide est aussi pour toi.</h2>
            <p>
              Investir au pays depuis la diaspora, c’est souvent décider à distance. Raison de plus pour
              comprendre les documents, les vérifications et les questions à poser avant d’engager ton
              argent dans un projet immobilier au Bénin.
            </p>
          </Reveal>
        </section>

        {/* AUTEUR */}
        <section className="sec sec-white" id="auteur">
          <div className="wrap author">
            <Reveal className="author-logo">
              <Image src="/logo-fogic.png" alt="Logo FOGIC Prestigie — Parcelles et Maisons" width={300} height={300} sizes="(max-width: 860px) 60vw, 300px" />
            <p className="exp"><b>10 ans</b><span>d’expérience dans l’immobilier</span></p>
            </Reveal>
            <Reveal delay={0.1} className="author-txt">
              <h2>Pourquoi l’expérience de terrain compte</h2>
              <p>
                Je suis <b>{SITE.author}</b>, fondateur de {SITE.brand} — {SITE.brandFull}.
              </p>
              <p>
                Avec 10 ans d’expérience dans l’immobilier, je m’intéresse aux questions concrètes
                auxquelles les acheteurs, les propriétaires et les investisseurs sont confrontés
                lorsqu’ils veulent réaliser leurs projets.
              </p>
              <p>
                J’ai conçu ce livre dans une démarche de partage de connaissances et d’expérience,
                avec une conviction : mieux comprendre l’immobilier avant de s’engager permet de
                prendre des décisions plus éclairées.
              </p>
            </Reveal>
          </div>
        </section>

        {/* ALERTE */}
        <section className="sec-warn">
          <Reveal className="wrap warn-in">
            <span className="warn-ico" aria-hidden>!</span>
            <p>
              Ne sois pas parmi ceux qui pleurent dans 10 ou 15 ans en disant : « il y a des
              années, j’ai acheté ma parcelle et on me l’a retirée. »
            </p>
          </Reveal>
        </section>

        {/* TEMOIGNAGES */}
        <section className="sec sec-white" id="avis">
          <div className="wrap">
            <Reveal className="center narrow">
              <h2>Ce que disent les lecteurs</h2>
            </Reveal>
            <div className="tgrid">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={(i % 2) * 0.08} className="tcard">
                  <span className="tquote" aria-hidden>“</span>
                  <p>{t.text}</p>
                  <div className="tby">
                    <span className="tavatar" aria-hidden>{t.name.charAt(0)}</span>
                    <div>
                      <b>{t.name}</b>
                      <small>{t.role}</small>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* OFFRE */}
        <section className="sec sec-light" id="offre">
          <div className="wrap">
            <PromoBanner />
            <Reveal className="center narrow">
              <h2>Choisis ta formule</h2>
              <p className="muted">Un même guide, plusieurs façons de le recevoir.</p>
            </Reveal>

            <div className="offer">
              <Reveal className="offer-photo">
                <Image
                  src={OFFER_IMAGE.src}
                  alt="Un homme souriant présente le guide « Investir dans l’immobilier au Bénin »"
                  fill
                  sizes="(max-width: 860px) 92vw, 460px"
                  quality={90}
                  className="offer-photo-img"
                />
              </Reveal>
              <Reveal delay={0.1} className="offer-card">
                <h3>Investir dans l’immobilier au Bénin — Le guide complet</h3>
                <dl>
                  <div><dt>Auteur</dt><dd>{SITE.author}</dd></div>
                  <div><dt>Marque</dt><dd>{SITE.brand} — {SITE.brandFull}</dd></div>
                  <div><dt>Pages</dt><dd>148 pages</dd></div>
                  <div><dt>Formats</dt><dd>Livre numérique PDF · Édition physique dédicacée</dd></div>
                </dl>
                <p className="fine">
                  Ce livre est un guide d’information et de sensibilisation. Il ne remplace pas les
                  vérifications auprès des professionnels compétents ni les conseils juridiques,
                  techniques ou financiers adaptés à chaque situation.
                </p>
              </Reveal>
            </div>

            <div className="plans" id="plans">
              {plans.map((p, i) => (
                <Reveal key={p.name} delay={i * 0.08} className={`plan ${p.featured ? "plan-feat" : ""}`}>
                  <span className="plan-tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  {p.promo ? (
                    <div className="plan-priceblock"><PromoPrice kind={p.promo} /></div>
                  ) : (
                    <strong className="plan-price">{p.price}</strong>
                  )}
                  <ul>
                    {p.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                  <a
                    className={`btn ${p.wa ? "btn-wa" : "btn-gold"}`}
                    href={p.href}
                    {...(p.wa ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {p.cta}
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec sec-white" id="faq">
          <div className="wrap narrow-faq">
            <Reveal className="center">
              <h2>Questions fréquentes</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <Faq items={faq} />
            </Reveal>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="final">
          <div className="wrap final-in">
            <Reveal>
              <h2>Ton projet immobilier mérite les bonnes informations.</h2>
              <p>
                Si tu envisages d’engager une partie importante de ton argent dans l’immobilier,
                prends le temps de mieux comprendre ton projet avant de décider.
              </p>
              <div className="final-actions">
                <Cta>Obtenir le guide</Cta>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-in">
          <div>
            <b>{SITE.brand}</b>
            <p>{SITE.brandFull}</p>
          </div>
          <div className="foot-contact">
            <p>Nos contacts</p>
            {SITE.phones.map((p) => (
              <a key={p.tel} href={`https://wa.me/${p.wa}`} target="_blank" rel="noopener noreferrer">
                {p.label}
              </a>
            ))}
          </div>
        </div>
        <p className="wrap copy">© {new Date().getFullYear()} {SITE.brand}. Tous droits réservés.</p>
      </footer>

      <Dock />
    </>
  );
}
