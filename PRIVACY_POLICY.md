# Privacy Policy for Instagram PFP Viewer

Last updated: April 14, 2026

Instagram PFP Viewer is a browser extension that lets users view and download Instagram profile pictures directly inside Instagram.

## What this extension accesses

The extension only runs on Instagram pages covered by the manifest host permission.

It may access:

- The currently open Instagram profile page and its visible DOM, so the extension can place the overlay and detect whether the profile avatar currently has an active story
- Public profile information returned by Instagram, such as username, biography, profile image URL, and public profile counts, when needed to display the viewer
- Instagram cookies `sessionid` and `ds_user_id` only to request the highest-resolution profile image available from Instagram

## How information is processed

- Profile and story state are processed locally in the browser
- In-memory caching is per tab session only
- The extension does not send accessed data to the developer
- The extension does not use remote analytics, ad tech, or tracking services

## Cookies

Instagram cookies are used only to request the highest-resolution profile image from Instagram. They are not sold, shared, or stored by the extension beyond the immediate request flow.

## Downloads

Image downloads happen only when the user clicks a download button in the extension. Downloads are handled by the browser's normal downloads system.

## Data sharing and sale

- No personal data is sold
- No personal data is shared with third parties
- No accessed Instagram data is transmitted to developer-controlled servers

## Data retention

The extension does not keep durable profile caches. Any cached profile data is held in memory for the current tab session only and is cleared when that session ends.

## User control

Users can stop all extension data access by:

- disabling or uninstalling the extension
- closing Instagram tabs where the extension is active
- not using the viewer or download actions

## Changes

This policy may be updated if the extension behavior changes. Updated versions should be published in this repository.

## Contact

For privacy questions about this project, open an issue in this GitHub repository.
