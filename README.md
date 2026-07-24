# peppino.it

Static one-page biographical showcase for **Peppino Zola** — plain HTML + CSS + vanilla JS, no framework, no build step.

## Run locally

Double-click `index.html`, or serve the folder (any static server works):

```
python -m http.server 8123
```

then open http://localhost:8123.

Everything works without JS too (scroll-reveal, lightbox and mobile menu are progressive enhancements).

## Structure

```
index.html            single page (all sections)
assets/css/style.css  design system (Stile A: navy / ivory / gold, Playfair + EB Garamond)
assets/js/main.js     smooth-scroll reveal, lightbox, hamburger menu
assets/img/           processed photos + book covers
scripts/prepare_photos.py  regenerates assets/img from the raw scans
CNAME robots.txt sitemap.xml  deploy/SEO files
```

## Regenerating the photos

The raw scans live in `foto_nonno/` (kept out of the repo) and are rotated by the scanner.
`scripts/prepare_photos.py` maps each scan to a semantic name, applies the correct
rotation and exports 1200px JPEGs:

```
pip install pillow
python scripts/prepare_photos.py
```

## Deploy — GitHub Pages on peppino.it

1. Push the repo to GitHub, branch `main`.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Custom domain: `peppino.it` (the `CNAME` file in the root must contain exactly that).
4. DNS for the apex, 4 A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (optional AAAA: `2606:50c0:8000::153` … `8003::153`); `www` as CNAME to `<user>.github.io`.
   Verify current IPs in the GitHub Pages docs at deploy time.
5. Enable **Enforce HTTPS**.

Alternatives: Cloudflare Pages, Netlify (drag & drop), or any static web server.

## TODO

- **Photos**: straightened, but fine cropping (print borders, frames) still pending — replace progressively.
- **Captions/dates** to confirm with Pietro (e.g. wedding 1967).
- **NONNI2.0 tenth-anniversary volume (2024)**: title/publisher to confirm, then add to Pubblicazioni.
- **Il Sole 24 Ore — "L'Esperto Risponde"** (since 1993): material in the historical archive, possible future section.
- Full press-review list is embedded in `index.html` inside `<details id="archivio-scritti" hidden>` — remove `hidden` to publish it. Tempi direct URLs still to collect.
- Official contact email: peppino.zola39@gmail.com.
