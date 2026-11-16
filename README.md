# Site commercial Cockpit'Gest — pages produites (16/11/2026)

Dossier déployable, charte autonome du site produit (aubergine/violet), cohérent avec l'accueil live.

## Arborescence
```
index.html                      accueil — CSS + JS EN LIGNE (auto-portante), convention maison
assets/site.css                 feuille de style partagée des SOUS-PAGES (charte + composants + animations)
assets/site.js                  script partagé des sous-pages (reveal .vis, spotlight, compteurs)
assets/favicon.svg              favicon (logo @)
assets/og/*.png                 vignettes Open Graph 1200x630 (1 par page)
fonctionnalites/index.html      index des 11 briques
fonctionnalites/<brique>.html   11 pages de fonction (Ce que ça fait / Pourquoi ça compte)
pour-qui/index.html             index des 5 profils
pour-qui/<profil>.html          5 pages profil-cible
faq.html                        FAQ complète (8 thèmes)
sitemap.xml                     plan du site (20 URLs)
robots.txt                      robots + lien sitemap
_bloc-difference-accueil.html   snippet du tableau comparatif (si on garde l'ancien accueil)
```

## Animations (reprises de editeur.css, déclinées violet)
- Tuiles : bordure conique animée (@property --a + spin) + spotlight souris (--mx/--my) + lift.
- Hero : aurora (3 blobs, floatA) + grille masquée (drift).
- CTA : bande couleur animée (grad) + balayage shine. Reveal au scroll (toggle .vis). prefers-reduced-motion respecté.

## SEO / partage
- OG + Twitter Card + canonical + favicon sur chaque page. Vignettes OG à la charte dans assets/og/.
- URLs internes absolues (/...), og:url et sitemap pointent sur https://cockpitgest-site.no-sages-editor.com — adapter si le domaine change.

## Déploiement
- Servir le dossier à la racine de `cockpitgest-site.no-sages-editor.com`.
- Les liens internes sont en chemins absolus (`/fonctionnalites/`, `/pour-qui/`, `/faq.html`, `/assets/cockpitgest.css`) : OK à la racine du sous-domaine.
- L'accueil existant reste en place ; 2 retouches recommandées :
  1. Coller le contenu de `_bloc-difference-accueil.html` avant la section finale.
  2. Mettre à jour la nav de l'accueil pour pointer vers les vraies pages (Fonctionnalités → /fonctionnalites/, Pour qui → /pour-qui/, + FAQ).

## Charte
- Tokens repris tels quels de l'accueil live (--base #1A1226, --accent #A855F7, --grad 7C3AED→A855F7).
- Polices Space Grotesk / Inter / JetBrains Mono (Google Fonts).
- Badges DISPONIBLE (vert) / BIENTÔT (ambre). Statuts "bientôt" respectés : Automatisations, émission facture électronique.

## Décisions ouvertes (à trancher)
- URL du bloc fonctions : /fonctionnalites/ (retenu) vs /leviers/.
- "Pour qui" : 5 pages (retenu) vs 1 page à sections.
- Migration éventuelle vers editeur.css (charte éditeur) si standardisation — ici on a privilégié la continuité avec l'accueil live.

Fichiers générés : 47.
