/* One-off: turn assets/icon-source.png (ChatGPT art with a baked black rounded
   frame) into clean full-bleed icon masters + all app icon sizes. */
const sharp = require('sharp');
const fs = require('fs');

const NAVY = [11, 20, 29];          // match the source art's own background exactly (seamless fills)
const SRC = 'assets/icon-source.png';

(async () => {
  const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, c = info.channels;
  const idx = (x, y) => (y * w + x) * c;
  const dark = (x, y) => { const i = idx(x, y); return data[i] + data[i + 1] + data[i + 2] < 24; };

  // 1) flood-fill the connected black frame (from the 4 corners) into a mask
  const fill = new Uint8Array(w * h);
  const stack = [[0, 0], [w - 1, 0], [0, h - 1], [w - 1, h - 1]];
  while (stack.length) {
    const [x, y] = stack.pop();
    if (x < 0 || y < 0 || x >= w || y >= h) continue;
    const p = y * w + x;
    if (fill[p] || !dark(x, y)) continue;
    fill[p] = 1;
    stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
  }

  // 2) dilate the mask by R px (separable) to also swallow the thin rounded-rect
  //    border stroke that sits just inside the black frame
  const R = 7;
  const dil = new Uint8Array(w * h);
  const tmp = new Uint8Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {   // horizontal
    let on = 0; for (let k = -R; k <= R; k++) { const xx = x + k; if (xx >= 0 && xx < w && fill[y * w + xx]) { on = 1; break; } }
    tmp[y * w + x] = on;
  }
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {   // vertical
    let on = 0; for (let k = -R; k <= R; k++) { const yy = y + k; if (yy >= 0 && yy < h && tmp[yy * w + x]) { on = 1; break; } }
    dil[y * w + x] = on;
  }

  // 3) paint masked pixels navy → clean full-bleed square
  for (let p = 0; p < w * h; p++) if (dil[p]) { const i = p * c; data[i] = NAVY[0]; data[i + 1] = NAVY[1]; data[i + 2] = NAVY[2]; data[i + 3] = 255; }

  const clean = sharp(Buffer.from(data), { raw: { width: w, height: h, channels: c } }).png();
  const cleanBuf = await clean.toBuffer();

  // master 1024 full-bleed
  await sharp(cleanBuf).resize(1024, 1024).png().toFile('assets/icon.png');

  // adaptive/maskable foreground: subject scaled to 76% on navy (safe zone)
  const inner = Math.round(1024 * 0.76);
  const fg = await sharp({ create: { width: 1024, height: 1024, channels: 4, background: { r: NAVY[0], g: NAVY[1], b: NAVY[2], alpha: 1 } } })
    .composite([{ input: await sharp(cleanBuf).resize(inner, inner).png().toBuffer(), gravity: 'center' }])
    .png().toBuffer();
  await fs.promises.writeFile('assets/icon-foreground.png', fg);

  // PWA / root pngs
  await sharp(cleanBuf).resize(192, 192).png().toFile('icon-192.png');
  await sharp(cleanBuf).resize(512, 512).png().toFile('icon-512.png');
  await sharp(fg).resize(512, 512).png().toFile('icon-maskable-512.png');

  // Windows installer master
  await sharp(cleanBuf).resize(512, 512).png().toFile('build/icon.png');

  console.log('icons written: assets/icon.png, icon-foreground.png, icon-192/512, icon-maskable-512, build/icon.png');
})();
