# Envendors LLC

The Envendors company website. Next.js, React, Tailwind CSS and TypeScript,
exported as plain HTML, CSS and JavaScript, so any web host can serve it.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000. To try it on a phone on the same Wi-Fi, run
`npm run dev:host` and open `http://<this computer's IP>:3000`.

## Publish

```bash
npm run build
```

This writes the finished site into `out/`. Upload the **contents** of `out/`
(not the folder itself) to the web root of the host, for example
`public_html/` on Hostinger. No Node.js is needed on the server.

- `out/.htaccess` makes Apache or LiteSpeed hosts serve clean addresses
  (`/about` from `about.html`), the custom 404 page, HTTPS, caching and basic
  security headers. It is a hidden file: make sure it is uploaded too.
- The site address used in links, the sitemap and share previews is
  `https://envendors.com`. For another address, set `NEXT_PUBLIC_SITE_URL`
  before building.
- After launch, add the site to Google Search Console and submit
  `https://envendors.com/sitemap.xml`.

## GitHub Pages

Every push to `main` builds the site and publishes it to
https://kivlee.github.io/envendors (see `.github/workflows/pages.yml`). That build
serves the site from `/envendors` with each page in its own folder; a normal
`npm run build` is unaffected.

## License

Copyright (c) 2026 Envendors LLC. All rights reserved. This code is proprietary and
is not open source: it may not be copied, modified, reused or redistributed without
written permission. See [LICENSE](LICENSE).
