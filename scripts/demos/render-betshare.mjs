import { execFile } from 'node:child_process';
import { copyFile, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { createRequire } from 'node:module';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const here = fileURLToPath(new URL('.', import.meta.url));
const betshare = resolve(process.argv[2] ?? '../betshare');
const require = createRequire(join(betshare, 'package.json'));
const { build } = require('esbuild');
const chrome = process.env.CHROME_BIN ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const output = resolve(here, '../../public/demos');
const temporary = await mkdtemp(join(tmpdir(), 'portfolio-betshare-'));
const groupTabs = join(betshare, 'app/dashboard/groups/[id]/GroupTabs.tsx');
const size = '920,700';
const scenes = JSON.parse(await readFile(join(here, 'betshare-scenes.json'), 'utf8'));

const stubs = {
  'next/navigation': 'export const useRouter = () => ({ refresh() {} });',
  'next/image': 'import { createElement } from "react"; export default (props) => createElement("img", props);',
  'next/dynamic': 'export default () => () => null;',
  '../actions': 'export async function leaveGroup() {} export async function removeGroupMember() { return { ok: true }; }',
  './reaction-actions': 'export async function toggleReaction() { return { ok: true }; }',
};

try {
  const { outputFiles } = await build({
    entryPoints: [join(here, 'betshare-scenes.jsx')],
    bundle: true,
    jsx: 'automatic',
    format: 'iife',
    nodePaths: [join(betshare, 'node_modules')],
    alias: {
      '@': betshare,
      'betshare-group-tabs': groupTabs,
      react: join(betshare, 'node_modules/react'),
      'react-dom': join(betshare, 'node_modules/react-dom'),
    },
    write: false,
    minify: true,
    define: { 'process.env.NODE_ENV': '"production"' },
    plugins: [{
      name: 'isolate-betshare-server-actions',
      setup(plugin) {
        plugin.onResolve({ filter: /^(next\/(navigation|image|dynamic)|\.\.\/actions|\.\/reaction-actions)$/ }, ({ path }) => ({
          path, namespace: 'sample',
        }));
        plugin.onLoad({ filter: /.*/, namespace: 'sample' }, ({ path }) => ({
          contents: stubs[path], resolveDir: betshare,
        }));
      },
    }],
  });

  const cssPath = join(temporary, 'app.css');
  await run(process.execPath, [
    require.resolve('tailwindcss/lib/cli.js'),
    '-i', join(betshare, 'app/globals.css'),
    '-c', join(betshare, 'tailwind.config.ts'),
    '-o', cssPath,
  ], { cwd: betshare });
  const assets = new Map([
    ['/', ['text/html', page()]],
    ['/app.js', ['application/javascript', outputFiles[0].contents]],
    ['/app.css', ['text/css', await readFile(cssPath)]],
    ['/logo.png', ['image/png', await readFile(join(betshare, 'public/brand_assets/primary-logo.png'))]],
    ['/brand_assets/send.png', ['image/png', await readFile(join(betshare, 'public/brand_assets/send.png'))]],
  ]);
  const server = createServer((request, response) => {
    const asset = assets.get(request.url.split('?')[0]);
    if (!asset) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { 'Content-Type': asset[0] }).end(asset[1]);
  });

  await new Promise((ready, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', ready);
  });

  try {
    for (const [scene, { title, expectedContent }] of Object.entries(scenes)) {
      const { stdout } = await run(chrome, [
        '--headless', '--dump-dom', '--disable-background-networking', '--no-first-run', '--no-default-browser-check',
        '--password-store=basic', '--mock-keychain', `--user-data-dir=${join(temporary, 'chrome')}`,
        `--window-size=${size}`, '--hide-scrollbars', '--virtual-time-budget=1200',
        `--screenshot=${join(temporary, scene + '.png')}`,
        `http://127.0.0.1:${server.address().port}/?scene=${scene}`,
      ], { timeout: 20000 });
      if (!stdout.includes(title) || !stdout.includes(expectedContent)) {
        throw new Error(`BetShare scene did not render: ${scene}`);
      }
    }

    const orderedScenes = Object.entries(scenes);
    const frames = orderedScenes.map(([scene, { seconds }]) => `file '${scene}.png'\nduration ${seconds}\n`).join('');
    const [lastScene] = orderedScenes.at(-1);
    const duration = orderedScenes.reduce((total, [, { seconds }]) => total + seconds, 0);
    await writeFile(join(temporary, 'frames.txt'), frames + `file '${lastScene}.png'\n`);
    await run('ffmpeg', [
      '-y', '-f', 'concat', '-safe', '0', '-i', join(temporary, 'frames.txt'),
      '-vf', 'fps=24', '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p',
      '-movflags', '+faststart', '-t', String(duration), '-an', join(output, 'betshare-groups.mp4'),
    ]);
    await copyFile(join(temporary, 'profit.png'), join(output, 'betshare-groups.png'));
  } finally {
    server.close();
  }
} finally {
  await rm(temporary, { recursive: true, force: true });
}

function page() {
  return `<!doctype html>
  <html lang="en">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/app.css">
    <style>
      :root { --font-inter: Arial; --font-bebas: 'Arial Narrow'; }
      body { background: #0d0d0d; color: #f5f0eb; }
      .demo-header { padding: 14px 38px; height: 56px; display: flex; align-items: center;
        justify-content: space-between; border-bottom: 1px solid #252525; }
      .demo-header span { color: #d5c6b6; font-size: 12px; letter-spacing: .13em; }
      .demo-main { padding: 16px 38px 0; }
      .demo-main h1 { font-size: 34px; font-weight: 750; line-height: 1.15; }
      .demo-members { color: #a1978f; margin: 3px 0 8px; }
      .demo-main .mb-8 { margin-bottom: 16px; }
      .demo-main button { cursor: pointer; }
      footer { position: fixed; inset: auto 0 0; padding: 14px 38px; background: #201710;
        border-top: 1px solid #9c5110; color: #fff2de; font-size: 19px; font-weight: 700; }
    </style>
    <div id="root"></div>
    <script defer src="/app.js"></script>
  </html>`;
}
