# Instagram PFP Viewer
View full-size Instagram profile pictures right inside Instagram, in-page and in one click.

You do not need to open another tab or pay for 3rd party apps to view profile pictures anymore.

## Features
- In-page profile picture overlay on Instagram profile pages
- High-resolution avatar fetch (highest resolution available)
- One-click `Download image` button in the modal
- Account context in the viewer (username, verification, bio, counts)
- No external viewer sites or paid tools needed
- Pixel-perfect integration with Instagram’s native interface

## Usage
### 1. Install dependencies:
```bash
npm install
```

### 2. Build the extension:
```bash
npm run build
```
This creates the production files in `dist`.

### 3A. For Chromium-based browsers:
1. Open `chrome://extensions` (or `edge://extensions`)
2. Enable Developer mode
3. Click `Load unpacked`
4. Select the `dist` folder

### 3B. For Firefox-based browsers:
1. Zip the contents of the `dist` folder (not the folder itself)
2. Go to https://addons.mozilla.org/developers/
3. Submit the extension for signing
4. Download the signed `.xpi` file from the dashboard
5. Open the `.xpi` file in Firefox

### 4. Use it on Instagram:
1. Open a profile page on `https://www.instagram.com/<username>/`
2. Hover the profile picture and click `View full-size`
3. Use `Download image` in the modal to save it

---

## Notes
- Logging in to Instagram improves reliability for high-resolution fetches.
- If download does not start, reload the extension once and try again.
- Firefox requires extensions to be signed for permanent installation.
- Unsigned extensions will not install in standard Firefox builds.
- For distribution, always use the signed `.xpi` file.
