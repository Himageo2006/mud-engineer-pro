# Pro unlock — In-App Purchase setup

The app ships **free to download**. The full feature set is unlocked with a **one-time,
non-consumable in-app purchase**. Tiering is applied **only in the native apps** — the
web/PWA build stays fully free (see `app._gate()` in `index.html`).

Product id (both stores): **`pro_unlock`**

## 1. Create the product in each store

### Google Play Console
1. Play Console → your app → **Monetize → Products → In-app products** → **Create product**.
2. Product ID: `pro_unlock` · Type: **(one-time)** · Name: "Mud Engineer Pro — Pro Unlock".
3. Set the price, **Activate** the product.
4. Add a license tester (Play Console → Setup → License testing) to test without being charged.

### App Store Connect
1. ASC → your app → **Monetization → In-App Purchases** → **+** → **Non-Consumable**.
2. Reference Name: "Pro Unlock" · Product ID: `pro_unlock`.
3. Add a price, a localized display name/description, a review screenshot → **Save**.
4. Test with a **Sandbox** Apple ID (Users and Access → Sandbox Testers).

## 2. Install the plugin and sync

```bash
cd "D:\Claude ai\Remotion\MudEngineerPro"
npm i cordova-plugin-purchase
npm run cap:sync
```

The JS bridge is already in `index.html` (search `initIAP`). It:
- registers `pro_unlock` as NON_CONSUMABLE on the right platform,
- on a verified purchase (or if already owned) calls `app.setPro(true)`,
- exposes `window.__mepIAP.buy()` / `.restore()`, which the **Unlock Pro** button
  (`app.buyPro()`) and **Restore purchase** (`app.restorePro()`) call.

No store accounts or plugin → `window.__mepIAP` stays undefined and the buttons show a
friendly "available at launch" message. Nothing breaks on web.

## 3. Build & test on device
- Android: `cd android && .\gradlew.bat assembleDebug` (or a signed release for Play testing).
- iOS: build via Xcode / Codemagic with the IAP capability enabled.
- Buy with a license tester / sandbox account → the app should flip to "Pro unlocked".
- Test **Restore purchase** on a second device signed into the same store account.

## 4. Before store release
- Remove or hide the **developer unlock** (tap the version number 5× → `app.devTap()` in
  `index.html`) so it can't be used to bypass payment.
- Confirm the `pro_unlock` price and localized names are set in both consoles.

## Notes
- Receipt validation here is **on-device** (StoreKit / Play Billing via the plugin), which
  suits a fully-offline app. For server-side validation later, point the plugin's validator
  at your endpoint.
- To change which features are free, edit `FREE_CALCS` and `FREE_COURSE_COUNT` at the top of
  the `app` script in `index.html`.
