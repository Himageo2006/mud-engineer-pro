# Mud Engineer Pro

A complete **offline** toolkit for drilling‑fluids (mud) engineers — field calculators, a full "Mud School" training curriculum, the drilling‑fluids manual, and printable well reports, all in a single self‑contained `index.html`. Nothing is sent anywhere; it runs entirely on the device.

> Built from the field handbooks (M‑I SWACO, EMEC, AVA, Baroid) and standard API/IADC references.

## Features

- **42 field calculators** across 10 categories — density/weight‑up, volumes & pump, hydraulics, rheology, solids, chemistry, brines, pressure & well control, cementing, and a categorized unit converter. Every result shows its formula and worked steps.
- **Hydraulics Report** — full circulating‑system report (section‑by‑section drill‑string & annular pressure losses, bit hydraulics, ECD, standpipe pressure, pressure distribution) — printable.
- **Mud School** — 21 courses (one per M‑I manual chapter), 100+ lessons and 100+ scored quiz questions, written in plain, beginner‑friendly language.
- **Built‑in manual** — quick‑reference chapters plus the field formula sheet and glossary.
- **Unit‑switchable inputs** — enter values in ppg/SG, bbl/m³, ft/m, psi/bar, gpm, lb/kg, etc.
- **Favourites & recently‑used**, dark/light theme, copy‑result, and a clean printable layout.

## Run it

Just open **`index.html`** in any modern browser — it works fully offline, no install.

## Install as an app (PWA / iOS / Android / Windows)

The app is an installable PWA and wraps to native via Capacitor (iOS/Android) and Electron (Windows). See **[BUILD.md](BUILD.md)** for the exact build steps.

## Live version

If GitHub Pages is enabled for this repo, the app is served at:
`https://<user>.github.io/<repo>/`

## Notes

- Formulas use standard US oilfield units internally (ppg, bbl, ft, psi) with metric readouts.
- No data leaves the device; there are no logins, network calls, or ads.
