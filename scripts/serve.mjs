// Servidor estático local para conferir o dist/. Uso: node scripts/serve.mjs [porta]
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('.', import.meta.url)), '..', 'dist');
const port = Number(process.argv[2]) || 4173;
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };

createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = normalize(join(root, p));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
  } catch {
    if (!extname(file)) file = join(file, 'index.html');
  }
  try {
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }).end(data);
  } catch {
    const nf = await readFile(join(root, '404.html')).catch(() => Buffer.from('404'));
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(nf);
  }
}).listen(port, () => console.log(`http://localhost:${port}`));
