# Mud Engineer Pro — Build & Deploy Guide

One codebase → **Windows, iOS and Android**. The whole app is a single offline
`index.html` (no server, no internet). Everything below just *wraps* that same file.

```
MudEngineerPro/
├─ index.html            ← the entire app (calculators + training + manual)
├─ manifest.webmanifest  ← PWA metadata
├─ sw.js                 ← offline service worker
├─ icon.svg / icon-maskable.svg
├─ copy-web.js           ← copies web files into www/ for packaging
├─ capacitor.config.json ← iOS/Android config
├─ electron/main.js      ← Windows desktop wrapper
└─ package.json          ← build scripts
```

---

## 0. Use it right now (no build)
Double-click **`index.html`** — it opens in any browser and works fully offline.
That is already a usable product for a laptop or rig PC.

## 1. Install as an app (PWA — quickest path to all 3 platforms)
Host the folder on any HTTPS URL (GitHub Pages, Netlify, company server), then:
- **Android/Chrome:** open the URL → menu → *Install app / Add to Home screen*.
- **iOS/Safari:** open the URL → Share → *Add to Home Screen*.
- **Windows/Edge or Chrome:** open the URL → address-bar *Install* icon.
The service worker caches everything, so after first load it runs offline.

---

## 2. Windows desktop (.exe installer) — Electron
```bash
npm install
npm run win:dev      # test the desktop window
npm run win:build    # produces dist-win/Mud Engineer Pro Setup x.x.x.exe
```
Put a `build/icon.ico` (256×256) in place first for the app/installer icon
(convert `icon.svg` → `.ico` with any converter or ImageMagick:
`magick icon.svg -define icon:auto-resize=256,128,64,48,32,16 build/icon.ico`).

## 3. Android (.apk / .aab for Play Store) — Capacitor
Prerequisites: Node.js, Android Studio (SDK + JDK 17).
```bash
npm install
npm run web                     # builds www/
npx cap add android
npm run cap:sync
npm run cap:android             # opens Android Studio
```
In Android Studio: **Build → Generate Signed Bundle/APK** → create/keep a keystore
(store it safely — you need the same one for every update) → produces the `.aab`
for Play Console or an `.apk` for direct install.

## 4. iOS (App Store) — Capacitor
Prerequisites: a **Mac** with Xcode (Apple requires it), or a cloud Mac service
(e.g. Codemagic / MacStadium) if you only have Windows.
```bash
npm install
npm run web
npx cap add ios
npm run cap:sync
npm run cap:ios                 # opens Xcode
```
In Xcode: set the Team/Bundle ID (`com.mudengineer.pro`), then **Product → Archive**
→ upload to App Store Connect.

### App icons for the stores
Generate all icon sizes automatically from the SVG:
```bash
npm install -g @capacitor/assets
npx @capacitor/assets generate --iconBackgroundColor '#0f1419' --iconBackgroundColorDark '#0f1419'
```
(Place a 1024×1024 `assets/icon.png` first — export it from `icon.svg`.)

---

## Updating the app
Edit **`index.html`** only. Then:
- PWA/web: bump `CACHE` version in `sw.js` (e.g. `mudeng-pro-v2`) and re-host.
- Windows/iOS/Android: re-run the matching build command above (they auto-copy the
  latest web files into `www/` first).

## Notes
- No data leaves the device; there are no network calls, logins or ads.
- All formulas show their working and are drawn from the field handbooks
  (M-I SWACO, EMEC, AVA, Baroid) and standard API/IADC references.
- `www/`, `node_modules/`, `dist-win/`, `android/`, `ios/` are all generated —
  safe to delete and rebuild.
