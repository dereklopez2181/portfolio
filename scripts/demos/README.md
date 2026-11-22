# Regenerate portfolio demos

Run these commands from the portfolio root. The generated files go in `public/demos` and ship with the static site.

- `node scripts/demos/render-betshare.mjs [path-to-betshare]` bundles BetShare’s group tabs from the source checkout and makes a silent MP4 and poster from four sample scenes. Install BetShare’s dependencies first. The renderer uses a localhost server, headless Chrome with a temporary profile, and FFmpeg with the `libx264` encoder. Set `CHROME_BIN` if Chrome is installed outside its default macOS location. It defaults to `../betshare`.
- `node scripts/demos/render-seo-sample.mjs [path-to-seo-repo]` passes fictional research to the SEO project’s Word report generator. Install the SEO project’s dependencies first. It defaults to `../seo_business_analysis`.

The CheckoutJS Deployer walkthrough lives in `src/components/spiderverse/ProjectWalkthrough.tsx`. Its sample terminal output follows the CLI’s deploy, status, and stop workflow.
