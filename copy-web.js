// Copies the offline web app into www/ for Capacitor (iOS/Android) and Electron (Windows) packaging.
// The root copy stays the editable source you can double-click; www/ is a build artifact.
const fs = require('fs');
const path = require('path');
const OUT = path.join(__dirname, 'www');
const FILES = ['index.html', 'manifest.webmanifest', 'sw.js', 'icon.svg', 'icon-maskable.svg', 'jspdf.umd.min.js', 'jspdf.autotable.min.js'];
fs.mkdirSync(OUT, { recursive: true });
for (const f of FILES) {
  const src = path.join(__dirname, f);
  if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(OUT, f)); console.log('copied', f); }
  else console.warn('missing', f);
}
console.log('web app copied to www/');
