# Mud Engineer Pro — Build & Publish Guide (Windows · Android · iPhone)

One codebase → three native apps. The whole app is a single offline `index.html`
(plus the jsPDF libraries and icons). Everything below just **wraps** that same file
into a store‑ready native app.

```
MudEngineerPro/
├─ index.html                    ← the entire app
├─ jspdf.umd.min.js / jspdf.autotable.min.js   ← PDF engine (DMR/Proposal export)
├─ manifest.webmanifest · sw.js  ← PWA metadata + offline service worker
├─ icon-192/512/maskable-512.png · icon.svg    ← app icons
├─ assets/icon.png · assets/icon-foreground.png ← 1024px masters for icon generation
├─ build/icon.ico · build/icon.png             ← Windows installer icon
├─ copy-web.js                   ← copies web files into www/ for packaging
├─ capacitor.config.json         ← Android/iOS config (appId com.mudengineer.pro)
├─ electron/main.js              ← Windows desktop wrapper
└─ package.json                  ← build scripts
```

App identity (change once if you want your own): **appId `com.mudengineer.pro`**,
name **Mud Engineer Pro**, version in `package.json`.

---

## 0.  One‑time setup (do this first, on any machine)

```bash
cd MudEngineerPro
npm install            # installs Capacitor, Electron, electron-builder, @capacitor/assets
```

Icons are already generated (root PNGs + `assets/` masters + `build/icon.ico`). If you
change the logo, replace `assets/icon.png` (1024×1024, opaque) and re‑run `npm run assets`
after a platform is added.

> Tip: the **live web app** (GitHub Pages) is your instant "install anywhere" option —
> Android/Chrome & Windows/Edge show an **Install** button, iPhone/Safari uses **Share → Add to Home Screen**.
> The native builds below are only needed for the **app stores**.

---

## 1.  Windows  (desktop .exe installer — Electron)

Nothing extra to install; you already have Node.

```bash
npm run win:dev      # opens the desktop window to test
npm run win:build    # → dist-win/Mud Engineer Pro Setup <version>.exe  (NSIS installer)
```

- The installer uses `build/icon.ico` (already created).
- Ship the `Setup .exe` directly to rig PCs, **or** publish to the **Microsoft Store**:
  set `package.json > build.win.target` to `["nsis","appx"]`, run `npm run win:build`, then
  upload the `.appx`/`.msix` via **Partner Center** (one‑time $19 individual / $99 company).

---

## 2.  Android  (Google Play — Capacitor + Android Studio)

Needs **Android Studio** (you have it) which includes the SDK + JDK.

```bash
npm run cap:add:android    # creates the android/ native project (one time)
npm run assets             # generates all Android icons/splash from assets/icon.png
npm run cap:sync           # copies the web app into the native project
npm run cap:android        # opens Android Studio
```

In Android Studio:
1. Let Gradle sync finish.
2. **Build ▸ Generate Signed Bundle / APK ▸ Android App Bundle (.aab)**.
3. First time: **Create new keystore** — save the `.jks` file and passwords somewhere safe
   (you MUST reuse the same keystore for every future update).
4. Build the release **.aab**.
5. Upload to **Google Play Console** (one‑time $25). Fill the listing, use `icon-512.png`
   as the store icon, add screenshots, set content rating, roll out.

Sideload without the store: **Build ▸ Build APK(s)** → install the `.apk` on any device
(enable "install unknown apps").

> The Gradle build runs on **your machine / Android Studio**, not in this environment.

---

## 3.  iPhone / iPad  (App Store — Capacitor)

Apple requires a build on **macOS** (Xcode) and a paid **Apple Developer account ($99/yr)**.

### 3a.  You have a Mac
```bash
npm run cap:add:ios
npm run assets
npm run cap:sync
npm run cap:ios            # opens Xcode
```
In Xcode: project ▸ **Signing & Capabilities** ▸ pick your Team ▸ confirm bundle id
`com.mudengineer.pro` ▸ **Product ▸ Archive** ▸ **Distribute App ▸ App Store Connect**.
Finish the listing in **App Store Connect** and submit for review.

### 3b.  No Mac → Codemagic (cloud build)
1. Push this repo to GitHub (already done).
2. Sign up at **codemagic.io**, add the repo, pick the **Capacitor / iOS** workflow.
3. Add your Apple credentials (App Store Connect API key) so Codemagic can sign & upload.
   It runs `cap add ios`, `cap sync`, builds the `.ipa`, and can publish to App Store Connect.
4. Finish the listing in App Store Connect and submit.

The **PWA (Add to Home Screen)** already gives iPhone users an offline, full‑screen app today
with no account — useful while the App Store build/review is in progress.

---

## 4.  Updating the app later

- **Edit `index.html`** (the whole app lives here).
- **Web / PWA:** bump `CACHE` in `sw.js`, commit & push → GitHub Pages auto‑updates.
- **Windows:** bump `version` in `package.json`, `npm run win:build`, ship the new installer.
- **Android / iOS:** `npm run cap:sync`, rebuild in Android Studio / Xcode (bump
  `versionCode` / build number), upload the new `.aab` / `.ipa`.

---

## 5.  Checklist before submitting to a store

- [ ] `npm install` succeeds
- [ ] App runs: `npm run win:dev` (Windows) / device run from Android Studio · Xcode
- [ ] Icons look right (`npm run assets` after adding each platform)
- [ ] `version` bumped in `package.json`; Android `versionCode` / iOS build number incremented
- [ ] Screenshots captured (phone + tablet for Play / App Store)

The app collects **no data** and needs **no network** — state that in the store privacy
sections; it makes review straightforward.
