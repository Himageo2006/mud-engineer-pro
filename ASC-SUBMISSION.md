# App Store Connect — Submission Packet
**App:** Mud Engineer Pro  **Bundle ID:** `com.mudengineer.pro`  **Version:** 1.0  **Price:** Free + one IAP
Everything below is paste-ready. Fields are grouped by the ASC page they live on.
Contact email used throughout: **himageo2@gmail.com**

---

## 1. App Information  (ASC ▸ App Information)

| Field | Value |
|---|---|
| **Name** (≤30) | `Mud Engineer Pro` |
| **Subtitle** (≤30) | `Drilling fluids calculators` |
| **Primary Category** | Utilities |
| **Secondary Category** | Education |
| **Content Rights** | Does **not** contain third-party content |
| **Age Rating** | 4+ (see §6 for the questionnaire answers) |
| **Privacy Policy URL** | `https://himageo2006.github.io/mud-engineer-pro/privacy.html` |

> Localizations: English (U.S.) only for v1.0.
> The 1024×1024 app icon is **not uploaded here** — it ships inside the build (generated from `assets/icon.png` during the Codemagic build).

---

## 2. Pricing and Availability  (ASC ▸ Pricing and Availability)

| Field | Value |
|---|---|
| **Price** | Free (USD 0) |
| **Availability** | All countries/regions |
| **Pre-orders** | Off |

---

## 3. Version 1.0  (ASC ▸ the 1.0 version page)

**Promotional Text** (≤170, editable anytime without review)
```
The complete offline toolkit for drilling-fluids engineers: 52 calculators, 21 courses, a full manual, and DMR, proposal and hydraulics report generators.
```

**Keywords** (≤100, comma-separated, no spaces after commas)
```
drilling,fluids,mud weight,rheology,hydraulics,density,barite,oilfield,petroleum,DMR,wellbore,brine
```

**Description** (≤4000)
```
Mud Engineer Pro is the complete, fully offline toolkit for drilling-fluids (mud) engineers — calculators, training, a reference manual, and ready-to-share report generators, all in one app that works anywhere, with no internet and no sign-in.

Every calculator shows the formula, the worked steps, and a short practical note — so you understand the result, not just read a number.

CALCULATORS (52, across 10 categories)
• Basics — pH & alkalinity, unit converter, recommended mud parameters
• Density & weight-up — weight up with Barite 4.2 / 4.1, Hematite, or Calcium Carbonate
• Volumes & capacity — pit/hole/annulus, circulation & lag time, trip sheet
• Hydraulics — pressure losses, ECD, bit hydraulics, hole cleaning
• Rheology — PV/YP, power-law n & K, low-shear yield point
• Solids — solids analysis, dilution, oil on cuttings
• Chemistry — water-phase salinity, pilot-test scale-up
• Brine — NaCl / KCl / CaCl2, bromide and formate brine density, chlorides, crystallization point
• Well control & cementing — kill sheet, slug, displacement

MUD SCHOOL (21 training courses)
Beginner-friendly lessons written in plain language with real analogies and "why it matters," plus scored quizzes so you can check what you learned.

REFERENCE MANUAL (13 chapters)
A searchable handbook covering the fundamentals through solids control and HSE.

REPORT GENERATORS
• Daily Mud Report (DMR) — enter measured data; the app computes PV/YP, OWR, water-phase salinity, ECD, pressure losses and costs, and exports a clean multi-page PDF.
• DMR Verify — recheck a reported sheet and flag out-of-tolerance values.
• Mud Proposal — build a full per-section mud program with volumes and cost.
• Hydraulics Report — a complete circulating-system analysis.

WHY MUD ENGINEER PRO
• 100% offline — works at the rig with no signal
• No account, no ads, no data collection
• Clear formulas and worked examples on every calculation
• Export professional PDFs and presentation slides

FREE & PRO
Download free with 6 core calculators, the full manual, and the first training chapters. Unlock Pro once — a single in-app purchase — for all 52 calculators, all 21 courses, all four report generators, and PDF & slide export. One-time purchase, yours forever.
```

**What's New in This Version** (for 1.0)
```
Initial release.
```

| Field | Value |
|---|---|
| **Support URL** | `https://himageo2006.github.io/mud-engineer-pro/support.html` |
| **Marketing URL** (optional) | `https://himageo2006.github.io/mud-engineer-pro/` |
| **Copyright** | `2026 IM Northstar Labs` |
| **Version** | `1.0` |
| **Build** | select the TestFlight build once it finishes processing |
| **Routing App Coverage File** | none (N/A) |

### Screenshots → **iPhone 6.7"** (1290×2796)
| Slot | File | Shows |
|---|---|---|
| 1 | `store-assets/ios/ios1-home.png` | Home / hub |
| 2 | `store-assets/ios/ios2-calc.png` | A calculator (formula + steps) |
| 3 | `store-assets/ios/ios3-mudschool.png` | Mud School training |
| 4 | `store-assets/ios/ios4-dmr.png` | DMR report generator |

### Screenshots → **iPad 13"** (2048×2732) — required (universal app)
| Slot | File | Shows |
|---|---|---|
| 1 | `store-assets/ios/ipad1-home.png` | Home / hub |
| 2 | `store-assets/ios/ipad2-calc.png` | Weight Up calculator (formula + result) |
| 3 | `store-assets/ios/ipad3-mudschool.png` | Mud School (21 courses) |
| 4 | `store-assets/ios/ipad4-dmr.png` | DMR generator |

---

## 4. App Privacy  (ASC ▸ App Privacy — the "nutrition label")

- **Data collection:** select **"No, we do not collect data from this app."**
- Result shown on the store: **Data Not Collected**.
- The app is fully offline, has no accounts, no analytics, no ads, and no network calls. The IAP is processed by Apple (StoreKit) — you do not collect anything.

---

## 5. In-App Purchase  (ASC ▸ Monetization ▸ In-App Purchases)

| Field | Value |
|---|---|
| **Type** | **Non-Consumable** |
| **Reference Name** (internal) | `Mud Engineer Pro — Pro Unlock` |
| **Product ID** | `pro_unlock`  ← must match the app code exactly |
| **Price** | **USD 4.99** (pick the 4.99 price point; Apple auto-converts all regions) |
| **Availability** | All regions |
| **Display Name** (≤30) | `Pro Unlock` |
| **Description** (≤45 chars!) | `Unlock all calculators, courses & reports.` ← the IAP localization Description field is capped at **45 characters**, not 4000. The long marketing copy belongs in the app Description, not here. |
| **Review Screenshot** | `store-assets/ios/iap-review-pro.png` |
| **Review Notes** | `Non-consumable, unlocks the full feature set permanently. In the app, open the menu and tap "Unlock Pro" to purchase.` |

> The IAP must be **submitted together with the 1.0 build** (attach it to the version) or it won't be reviewed.

---

## 6. Age Rating questionnaire  (answers → 4+)

Answer **None / No** to every category:
- Cartoon/Fantasy Violence, Realistic Violence, Sexual Content/Nudity, Profanity, Alcohol/Tobacco/Drugs, Mature/Suggestive, Horror, Gambling (simulated **and** real) → **None / No**
- Unrestricted Web Access → **No**
- Contests → **No**
- Made for Kids → **No**

Result: **4+**.

---

## 7. App Review Information  (ASC ▸ the version page, bottom)

| Field | Value |
|---|---|
| **Sign-in required** | **No** (uncheck "Sign-in required") |
| **Demo account** | not needed |
| **Contact — First/Last name** | *(your name)* |
| **Contact — Phone** | *(your number)* |
| **Contact — Email** | `himageo2@gmail.com` |

**Notes to the reviewer**
```
Mud Engineer Pro is a 100% offline toolkit for drilling-fluids (mud) engineers — calculators, training courses, a reference manual, and report generators. It requires no account and makes no network calls.

The app is free with a single non-consumable in-app purchase, "Pro Unlock" ($4.99), that unlocks the full calculator set, all training courses, all four report generators, and PDF/slide export. To review the Pro features, open the menu and tap "Unlock Pro," then complete the purchase in the StoreKit sandbox.
```

---

## 8. iPad screenshots — DONE ✓

Decision: **A — keep the app universal.** Four iPad 13" screenshots (2048×2732) generated and listed in §3 above (`store-assets/ios/ipad1-4*.png`). Upload them under the **iPad 13"** display size in ASC.

---

## 9. Pre-submission checklist

- [ ] TestFlight build processed and selected on the 1.0 page
- [ ] `pro_unlock` IAP created and **attached to the 1.0 submission**
- [ ] Screenshots uploaded — iPhone 6.7" (4) **and** iPad 13" (4)
- [ ] App Privacy set to "Data Not Collected"
- [ ] Age rating completed (4+)
- [ ] Privacy & Support URLs saved
- [ ] **Strip the dev-unlock before submitting for review** — the "tap the version number 5× to toggle Pro" shortcut (`app.devTap()`) must be removed/disabled so review can't bypass payment. (It's fine to leave in for TestFlight; I'll remove it in the build we actually submit for review.)
- [ ] Review notes + contact filled in

---

### Asset file locations (in the project)
```
App icon (1024, in build):   assets/icon.png
iPhone 6.7" screenshots:     store-assets/ios/ios1-home.png
                             store-assets/ios/ios2-calc.png
                             store-assets/ios/ios3-mudschool.png
                             store-assets/ios/ios4-dmr.png
iPad 13" screenshots:        store-assets/ios/ipad1-home.png
                             store-assets/ios/ipad2-calc.png
                             store-assets/ios/ipad3-mudschool.png
                             store-assets/ios/ipad4-dmr.png
IAP review screenshot:       store-assets/ios/iap-review-pro.png
```
