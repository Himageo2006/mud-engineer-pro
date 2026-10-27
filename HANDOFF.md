# Mud Engineer Pro — Handoff

_Last updated: 2026-10-27 · branch `main` @ `7029439`_

Offline drilling-fluids calculator/training/manual app. Single `index.html`
(~518KB) wrapped via Capacitor (Android/iOS) + Electron.
Repo: github.com/Himageo2006/mud-engineer-pro

## What was done this session (all pushed to `main`)
1. **`8894e4b` — Removed all company-specific (KOC) references.** App is now
   generic: calculator titles, guidance notes, proposal PDF cover (now shows the
   user-entered operator), approval rows, and the legacy migration block. Zero
   "KOC"/"Kuwait"/"N&WK"/"Team-II" left in the source.
2. **`a0a1bec` — Fixed the In-App Purchase unlock bug (critical).**
   The `cordova-plugin-purchase` flow called `tr.verify()` with no validation
   server, so `.verified` never fired, the transaction was never finished, and
   `setPro(true)` never ran → purchase succeeded at StoreKit but Pro stayed
   locked (and Apple reported "already purchased"). Fix: grant + `finish()` on
   `.approved` (no-server-validation pattern) and re-check `store.owned()` on
   `.productUpdated` / after `initialize()` so purchase, Restore, and relaunch
   all unlock. **Verified working on TestFlight build 10.** Same code path fixes
   Android.
3. **`e295fc6` — iOS CI auto-trigger + robust build number.** Push to `main` now
   auto-builds the `ios-capacitor` Codemagic workflow and ships to TestFlight.
   Build number = latest TestFlight + 1.
4. **`7029439` — Added Android Codemagic workflow (`android-capacitor`).**
   Regenerates the Android platform, bumps compile/target SDK to 36 + AGP 8.9.1
   / Gradle 8.11.1, injects a release `signingConfig` from the Codemagic keystore
   env vars, sets versionCode to latest Play + 1, builds a signed `bundleRelease`
   `.aab` (exposed as an artifact). Auto-triggers on push to `main`.

SW cache bumped to **v41**. 52 calculators. App displays **v4.3**.

## Store status
- **iOS:** IAP fix verified on **TestFlight build 10**. Build **9** (broken IAP)
  is still "Waiting for Review" — **swap the review build to 10** before Apple
  picks it up (App Store Connect → App Store tab → 1.0 → Build section →
  remove 9, add 10). App id: `6819994685`.
- **Android:** v4.3 / versionCode 3 on Internal testing. Production gated behind
  Google's closed-testing rule (personal account: **12–20 testers for 14 days**).
  Needs a rebuilt `.aab` carrying the IAP fix (via the new Codemagic workflow or
  local build) uploaded, with a bumped versionCode.

## Open action items (require the owner's login / local machine)
1. **Upload the Android keystore to Codemagic** (one-time) so `android-capacitor`
   can sign. File on the owner's PC:
   `D:\Claude ai\Remotion\MudEngineerPro\android\mudengineer-upload.keystore`
   (BACK IT UP — losing it blocks all future Play updates). Values are in the
   sibling `keystore.properties` (storePassword / keyPassword / keyAlias=mudengineer).
   In Codemagic → Code signing → Android keystores → **reference name
   `mudengineer_upload`**, alias `mudengineer`.
2. **Swap App Store review build 9 → 10** (see iOS status above).
3. **Android closed testing:** recruit 12–20 testers, keep opted in 14 days,
   then apply for production. Recruitment posts were drafted (Reddit / Facebook).
4. (Optional) Enable Play auto-publish: add a Google Play service-account JSON to
   a Codemagic `google_play` group and uncomment the publishing block in
   `codemagic.yaml` (`android-capacitor`).

## Environment notes
- `android/`, `ios/`, `www/`, `node_modules/` are gitignored and NOT in the repo.
  The configured native projects (with SDK/AGP upgrades) live only on the owner's
  PC at `D:\Claude ai\Remotion\MudEngineerPro\`.
- The signing keystore is intentionally not in the repo.
- CI = Codemagic (`codemagic.yaml`): `ios-capacitor` (proven) and
  `android-capacitor` (needs keystore upload to go green). Both auto-trigger on
  push to `main`.
- GitHub Pages auto-deploys the web/PWA on push to `main`.
