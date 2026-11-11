// Adds the Meta (Facebook) SDK to the generated iOS project so Facebook/Instagram
// app-install ads can measure installs (AEM, no IDFA, no ATT prompt).
// Codemagic runs this after `npx cap add ios` / `cap sync ios`, before `pod install`.
// usage: node scripts/add-fbsdk-ios.cjs <appId> <clientToken> <displayName>
const fs = require('fs'), path = require('path');
const [appId, token, name] = process.argv.slice(2);
if (!appId || !token || !name) throw new Error('usage: add-fbsdk-ios.cjs <appId> <clientToken> <displayName>');
const ios = path.join(__dirname, '..', 'ios', 'App');

// Podfile
const podPath = path.join(ios, 'Podfile');
let pod = fs.readFileSync(podPath, 'utf8');
if (!pod.includes("pod 'FBSDKCoreKit'")) {
  pod = pod.replace(/(target 'App' do\n\s*capacitor_pods\n)/, "$1  pod 'FBSDKCoreKit'\n");
  if (!pod.includes("pod 'FBSDKCoreKit'")) throw new Error('Podfile anchor missing');
  fs.writeFileSync(podPath, pod);
}

// Info.plist keys
const plPath = path.join(ios, 'App', 'Info.plist');
let pl = fs.readFileSync(plPath, 'utf8');
if (!pl.includes('FacebookAppID')) {
  const keys =
`	<key>FacebookAppID</key>
	<string>${appId}</string>
	<key>FacebookClientToken</key>
	<string>${token}</string>
	<key>FacebookDisplayName</key>
	<string>${name}</string>
	<key>FacebookAutoLogAppEventsEnabled</key>
	<true/>
	<key>FacebookAdvertiserIDCollectionEnabled</key>
	<false/>
`;
  const i = pl.lastIndexOf('</dict>');
  if (i < 0) throw new Error('plist anchor missing');
  pl = pl.slice(0, i) + keys + pl.slice(i);
  fs.writeFileSync(plPath, pl);
}

// AppDelegate
const adPath = path.join(ios, 'App', 'AppDelegate.swift');
let ad = fs.readFileSync(adPath, 'utf8');
if (!ad.includes('FBSDKCoreKit')) {
  ad = ad.replace('import Capacitor\n', 'import Capacitor\nimport FBSDKCoreKit\n');
  ad = ad.replace(/(didFinishLaunchingWithOptions launchOptions: \[UIApplication\.LaunchOptionsKey: Any\]\?\) -> Bool \{\n)/,
    '$1        ApplicationDelegate.shared.application(application, didFinishLaunchingWithOptions: launchOptions)\n');
  ad = ad.replace('        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)',
    '        if ApplicationDelegate.shared.application(app, open: url, options: options) { return true }\n        return ApplicationDelegateProxy.shared.application(app, open: url, options: options)');
  if ((ad.match(/ApplicationDelegate\.shared/g) || []).length !== 2) throw new Error('AppDelegate anchors missing');
  fs.writeFileSync(adPath, ad);
}
console.log('Facebook SDK added, app', appId);
