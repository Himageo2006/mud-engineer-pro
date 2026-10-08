# iOS — Build to TestFlight & Submit (step by step)
**App:** Mud Engineer Pro  **Bundle ID:** `com.mudengineer.pro`
Build path: **Codemagic** (cloud Mac — no Mac needed). All metadata is in `ASC-SUBMISSION.md`.

The order: **① Codemagic build → TestFlight**, then **② ASC listing** (can overlap), then **③ attach + submit**.

---

## ① Build the IPA on Codemagic → TestFlight

### Prerequisites (one-time, you already have most of these)
- Apple Developer Program membership active (you have it — other apps are live).
- An **App Store Connect API key** connected to Codemagic at team level (you set this up for Benny's / Kingdom Rise — integration name e.g. "BennysFarm"). If not: ASC ▸ Users and Access ▸ **Integrations / Keys** ▸ generate an **App Store Connect API key** (Admin or App Manager), download the `.p8`, note the **Issuer ID** + **Key ID**, then add it in Codemagic ▸ Teams ▸ *your team* ▸ **Integrations ▸ App Store Connect**.
- The ASC **app record exists** (it does — "Mud Engineer Pro", bundle `com.mudengineer.pro`).

### Steps in codemagic.io
1. **Add application** → **GitHub** → authorize → pick **`Himageo2006/mud-engineer-pro`**.
2. Codemagic detects **`codemagic.yaml`** → workflow **"Mud Engineer Pro — iOS (App Store)"** (`ios-capacitor`).
3. **Code signing (iOS):** choose **Automatic / Codemagic-managed**. It uses the ASC API key to create the **App Store distribution** certificate + the `com.mudengineer.pro` provisioning profile. If the bundle ID isn't registered in the Developer portal yet, managed signing **auto-registers** it.
4. **Start new build** → select `ios-capacitor` → **Start**.
5. Wait ~15–25 min. On success the IPA is **auto-uploaded to TestFlight** (`submit_to_testflight: true` in the yaml).

### What the build does (already scripted in codemagic.yaml — nothing for you to do)
`npm ci` → `copy-web.js` → `npx cap add ios` → generates icons from `assets/icon.png` → `npx cap sync ios` (pulls in the IAP plugin `cordova-plugin-purchase`) → sets build number from Codemagic counter → builds + signs the IPA → uploads to TestFlight.

### If a build fails — the usual suspects
- **Signing / "no matching profile"** → make sure Codemagic manages signing and the **ASC API key integration** is selected on the workflow; let it create the cert + profile.
- **"Bundle ID not available / not registered"** → register `com.mudengineer.pro` once in the Apple Developer portal (Identifiers ▸ +), then rebuild. Enable the **In-App Purchase** capability on that identifier.
- **CocoaPods / Capacitor errors** → re-run the build (transient), or bump `node`/`xcode` in the yaml. Tell me the log and I'll fix.
- **Processing stuck on TestFlight** → Apple processing can take 10–30 min after upload; it then appears under TestFlight ▸ iOS builds.

> Send me the Codemagic build log if anything errors — I can read it and patch `codemagic.yaml` or the project.

---

## ② Fill the ASC listing (do this while the build runs)

Open `ASC-SUBMISSION.md` and paste section by section:
- **App Information** (§1) — subtitle, categories, privacy URL, content rights.
- **Pricing** (§2) — Free, all countries.
- **Version 1.0** (§3) — promo text, keywords, description, support/marketing URLs, copyright.
- **Screenshots** (§3) — upload **iPhone 6.7"** (ios1–4) **and iPad 13"** (ipad1–4).
- **App Privacy** (§4) — "No, we do not collect data."
- **Age rating** (§6) — all None → 4+.
- **In-App Purchase** (§5) — create `pro_unlock` (Non-Consumable, $4.99); add the review screenshot + notes.
- **App Review Information** (§7) — no sign-in, contact, reviewer notes.

---

## ③ When the build is on TestFlight → submit for review

1. **TestFlight tab:** the `com.mudengineer.pro` build appears after processing. (Optional: install via TestFlight on your iPhone to test, incl. a **sandbox** `pro_unlock` purchase.)
2. On the **1.0 version page:** under **Build**, select the TestFlight build.
3. **Attach the `pro_unlock` IAP to this version** (In-App Purchases section on the version page) so it's reviewed together.
4. **Before you click Submit for Review** → tell me, so I produce a **clean build with the dev-unlock stripped** (the tap-version-5× shortcut must be gone so review can't bypass payment). I'll commit it; you run one more Codemagic build; select that build; then Submit.
   - *(Leaving the dev-unlock in is fine for TestFlight — only strip it for the App Store review build.)*
5. **Submit for Review.**

---

## Quick status
- ✅ Project build-ready (yaml, IAP plugin, 1024 icon, universal app — all pushed to `origin/main`).
- ✅ All ASC metadata + iPhone & iPad screenshots + IAP shot prepared (`ASC-SUBMISSION.md`).
- ⬜ **You:** run the Codemagic build → TestFlight.
- ⬜ **You:** fill the ASC listing from the packet.
- ⬜ **Me (on your go):** strip the dev-unlock for the final review build.
