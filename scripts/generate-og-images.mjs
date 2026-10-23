// Generates 1200×630 Open Graph JPEGs for every page image.
//   public/images/<folder>/<name>.webp  →  public/images/og/<folder>-<name>.jpg
// "Page images" are the ones passed as `image` to pageMetadata(): every
// `image: '/images/…'` / `image="/images/…"` in data/*.ts and app/**/page.tsx.
// Share cards that no page uses any more are deleted.
// The default share card (og/default.jpg) is the home hero with the logo on top.
// Run after adding or replacing imagery: `npm run og`.
import { mkdir, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const images = path.join(root, 'public', 'images');
const out = path.join(images, 'og');
const WIDTH = 1200;
const HEIGHT = 630;
const PAGE_IMAGE = /image[=:]\s*["'`]\/images\/([a-z-]+)\/([a-z0-9-]+)\.webp/g;

async function sourceFiles(dir, match) {
  const entries = await readdir(path.join(root, dir), { recursive: true, withFileTypes: true });
  return entries.filter((entry) => entry.isFile() && match.test(entry.name)).map((entry) => path.join(entry.parentPath, entry.name));
}

// data/pilgrimage.ts is skipped: yatras are sections of /pilgrimage-packages/, not pages of their own.
const files = [...(await sourceFiles('data', /^(?!pilgrimage)[a-z-]+\.ts$/)), ...(await sourceFiles('app', /^page\.tsx$/))];
const pageImages = new Set();
for (const file of files) {
  for (const [, folder, name] of (await readFile(file, 'utf8')).matchAll(PAGE_IMAGE)) pageImages.add(`${folder}/${name}`);
}

await mkdir(out, { recursive: true });

for (const image of pageImages) {
  const [folder, name] = image.split('/');
  await sharp(path.join(images, folder, `${name}.webp`))
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'attention' })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(path.join(out, `${folder}-${name}.jpg`));
}

const wanted = new Set([...pageImages].map((image) => `${image.replace('/', '-')}.jpg`).concat('default.jpg'));
let removed = 0;
for (const file of await readdir(out)) {
  if (!wanted.has(file)) {
    await rm(path.join(out, file));
    removed += 1;
  }
}
const count = pageImages.size;

const logo = await sharp(path.join(images, 'brand', 'chal-musafir-logo.webp')).resize({ width: 400 }).toBuffer();
const logoMeta = await sharp(logo).metadata();
const plate = await sharp({
  create: { width: 440, height: logoMeta.height + 40, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0.94 } },
})
  .composite([{ input: logo, top: 20, left: 20 }])
  .png()
  .toBuffer();

await sharp(path.join(images, 'hero', 'home.webp'))
  .resize(WIDTH, HEIGHT, { fit: 'cover' })
  .composite([{ input: plate, top: 40, left: 40 }])
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(path.join(out, 'default.jpg'));

console.log(`Generated ${count + 1} Open Graph images in public/images/og/ (removed ${removed} unused)`);
