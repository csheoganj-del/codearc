import fs from 'fs';
import path from 'path';

const htmlPath = path.join(process.env.TEMP || process.env.TMP || '.', 'jawai.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const m = html.match(/const FRAMES\s*=\s*(\[[\s\S]*?\]);/);
if (!m) {
  console.error('NO FRAMES array found');
  process.exit(1);
}

const frames = Function(`return ${m[1]}`)();
console.log('frameCount', frames.length);

const outDir = path.resolve('public/assets/work-live');
fs.mkdirSync(outDir, { recursive: true });

// Evenly sample ~16 frames across the sequence (size-friendly, smooth enough)
const target = Math.min(16, frames.length);
const picks = [];
for (let i = 0; i < target; i++) {
  picks.push(Math.round((i * (frames.length - 1)) / Math.max(1, target - 1)));
}
const unique = [...new Set(picks)];
console.log('picks', unique.join(','));

const manifest = [];
unique.forEach((idx, i) => {
  let raw = frames[idx];
  if (raw.startsWith('data:')) {
    raw = raw.split(',')[1] || raw;
  }
  const buf = Buffer.from(raw, 'base64');
  const name = `jawai-f${String(i).padStart(2, '0')}.jpg`;
  fs.writeFileSync(path.join(outDir, name), buf);
  manifest.push(`/assets/work-live/${name}`);
  console.log(name, buf.length, 'from', idx);
});

fs.writeFileSync(
  path.join(outDir, 'jawai-manifest.json'),
  JSON.stringify({ frames: manifest, fps: 8 }, null, 2),
);
console.log('wrote', unique.length, 'frames');
