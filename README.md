# Site FOGIC — Guide « Investir dans l’immobilier au Bénin »

Next.js 15 (App Router) + TypeScript + framer-motion. CSS pur dans `app/globals.css`.

## Lancer
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## À remplacer
- `lib/config.ts` → `CHARIOW_URL` : lien de la boutique Chariow (tous les boutons l’utilisent).
- `public/product-book.png` : actuellement recadrée depuis le flyer (basse définition). Remplacer par la vraie couverture.
- `public/logo-fogic.jpg` : idem, remplacer par le logo d’origine (PNG transparent si possible).

## Déploiement
Vercel : importer le dossier, aucune variable d’environnement requise.

## Mise à jour : formules, dock, témoignages
- `lib/config.ts` : `WHATSAPP_NUMBER` (à confirmer), messages WhatsApp préremplis, `PRODUCT_IMAGE` (image du produit Chariow : enregistrer dans `public/` puis changer `src`, `width`, `height`).
- `components/Dock.tsx` : barre toujours visible (mobile : 2 boutons ; ordinateur : pastille WhatsApp flottante).
- `lib/testimonials.ts` : témoignages FICTIFS à remplacer par de vrais avis avant la mise en ligne.
