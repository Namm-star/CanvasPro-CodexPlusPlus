# Codex++ · CanvasPro Edition

> This repository is the **CanvasPro edition**. The default endpoint is `https://api.canvasproai.com/v1`. Open the manager, enter your CanvasPro API key, and click “Save and launch Codex”. Preset models: `gpt-6.1-sol`, `gpt-6-sol`, `gpt-6-astra`, and `gpt-5.6-sol`. Install the official Codex desktop app first. See [CanvasPro edition](docs/CANVASPRO.md).

## Original Author and Upstream Project

This edition is based on **[CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)** by **[BigPizzaV3](https://github.com/BigPizzaV3)** and upstream contributors. Its launcher, manager, provider management, and UI enhancements come from the original project. We gratefully acknowledge their work.

CanvasPro changes cover the default API provider, key-only setup and launch flow, verified text model presets, and edition-specific distribution materials. This repository is maintained independently by [Namm-star](https://github.com/Namm-star); it does not imply endorsement of CanvasPro by the original author. Upstream copyrights, the [AGPL-3.0-only license](LICENSE), and [third-party notices](THIRD_PARTY_NOTICES.md) are retained. See [ATTRIBUTION.md](ATTRIBUTION.md) for provenance and modification details.

Before future development or releases, read the [development history](docs/development/CANVASPRO_HISTORY.md), [maintenance guide](docs/development/CANVASPRO_MAINTENANCE.md), and [current release provenance](docs/development/releases/v2.1.1-canvaspro.1.provenance.json). The [initial release record](docs/development/releases/v1.5.0-canvaspro.1.provenance.json) remains available for historical comparison.

**Edition downloads: [CanvasPro Releases](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases)**. For this edition's setup, API integration, and feedback, use the CanvasPro support group below or [this repository's Issues](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/issues).

<p align="center">
  <img src="docs/images/codex-plus-plus.png" alt="Codex++ icon" width="160">
</p>

<p align="center">
  <a href="README.md">中文</a> | English
</p>

<p align="center">
  <img alt="CanvasPro Release" src="https://img.shields.io/github/v/release/Namm-star/CanvasPro-CodexPlusPlus">
  <img alt="Upstream Stars" src="https://img.shields.io/github/stars/BigPizzaV3/CodexPlusPlus?label=upstream%20stars">
  <img alt="License" src="https://img.shields.io/github/license/Namm-star/CanvasPro-CodexPlusPlus">
  <img alt="Rust" src="https://img.shields.io/badge/rust-1.85%2B-orange">
  <img alt="Tauri" src="https://img.shields.io/badge/tauri-2.x-24C8DB">
</p>

Codex++ is an external launcher and manager for the OpenAI Codex / ChatGPT desktop app. It uses the Chromium DevTools Protocol and a local helper for provider switching, protocol conversion, session management, and UI enhancements without modifying the official app's `app.asar` or installation files.

## Quick Start

Download the edition installer and corresponding source from [CanvasPro GitHub Releases](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases):

- Windows: `CanvasPro-CodexPlusPlus-*-windows-x64-setup.exe`
- Corresponding source: `CanvasPro-CodexPlusPlus-*-source.zip`; distribute it alongside the installer.
- macOS Intel / Apple Silicon universal: `CanvasPro-CodexPlusPlus-*-macos-universal.dmg`

The new version is one unified Codex++ app. On Windows, use its Desktop or Start Menu entry. On macOS, open the universal DMG and drag the visible Codex++.app to Applications. The hidden legacy manager shim exists only for upgrade compatibility. Install the official Codex desktop app separately.

## Get and Use a CanvasPro API Key

### 1. Register or sign in

Open the [CanvasPro API site](https://api.canvasproai.com) and choose register or sign in. It shares accounts with [CanvasPro Infinite Canvas](https://canvasproai.com): registration redirects to the canvas site, and existing canvas users can sign in or enter through the canvas site's API entry.

Check your account balance and top up through the site's prompts if needed. API calls use the CanvasPro shared wallet; see [model pricing](https://api.canvasproai.com/pricing). Creating a key does not add account credit.

### 2. Create and copy your key

1. Open [API Keys](https://api.canvasproai.com/keys) and click “Create API Key”. The manager's “Get a CanvasPro API key” button opens the same page.
2. Give it a recognizable name, such as `CodexPlusPlus-MyComputer`, and keep the page's default available group.
3. Set a key quota and expiry. A limited quota must have enough positive credit for your use. “Unlimited Quota” removes this key's separate quota limit; **it still requires account credit and calls remain billable**.
4. If model restrictions are enabled, allow the GPT model you select in the client. If an IP whitelist is configured, include this computer's public outbound IP. When unsure during first-time setup, keep those defaults.
5. Save, then use the list's copy icon (“Copy API key”) to copy the complete key. Do not copy masked text containing `***`.

### 3. Save and launch

1. Open Codex++ and find “CanvasPro New API” on the overview page.
2. Paste the complete key into “CanvasPro API Key”. Do not include `Bearer `, JSON, request headers, or multiple lines.
3. Select `gpt-6.1-sol` (the default), `gpt-6-sol`, `gpt-6-astra`, or `gpt-5.6-sol`.
4. Click “Save and launch Codex”. The endpoint `https://api.canvasproai.com/v1` and Responses protocol are preset.
5. Start a new task and send a short message to confirm a reply. This request is billable; review usage and charges on the API site.

Later, open `Codex++` and click Save and launch Codex or the launch button to reuse your saved key. The manager clears the input after saving while keeping the saved key locally. To replace it, enter a new key and save and launch again.

See the [full usage guide](docs/CANVASPRO.md) for troubleshooting and manual settings. Do not post complete keys in group chats, screenshots, or Issues. If a key is exposed, disable or delete it on the key page and create a replacement.

## Community and Support

For this CanvasPro edition's setup, API keys, balance, and model access, join the WeChat group **画布&api服务群 (Canvas & API Support)**.

Scan the QR code with WeChat on your phone, or save the image and recognize it in WeChat.

<img src="docs/images/canvaspro-support-group-20261029.png" alt="CanvasPro Canvas &amp; API support group WeChat QR code" width="320">

Updated on **October 29, 2026**. The screenshot marks this QR code as valid **before November 5, 2026**. If it expires, use [this repository's Issues](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/issues) to request the latest way to join.

When reporting a problem, include your operating system, package version, model, and error message. Do not include a complete API key.

## Upstream Sync

This update **[v2.1.1-canvaspro.1](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases/tag/v2.1.1-canvaspro.1)** integrates upstream v2.1.1, including model catalogs, Responses and tool-call fixes, provider configuration, aggregation, isolated Codex instances, and usage indicators. Windows x64 installers, a universal Mac DMG, complete source, and checksum manifests are available on its release page.

CanvasPro remains the default provider. The unified app saves the user's own key before launching Codex. Its updater now uses this edition's repository and recognizes CanvasPro revision numbers. To upgrade from the old edition, download this repository's installer first; the old binary still has its original update source.

This update also brings the upstream gateway and provider pool, older Mac blank-screen fixes, and Codex 26.10 compatibility. The main overview retains CanvasPro setup using just the user's API key; gateway configuration remains available separately.

The static model presets do not automatically track every model on the API site. Existing upstream ecosystem tools and Claude enhancements do not imply equivalent models or official applications are supplied by CanvasPro.

## Data and Compatibility

Existing application identity and configuration directories remain compatible. Codex uses the configured CODEX_HOME or ~/.codex; Codex++ state remains in ~/.codex-session-delete. API keys are stored locally in provider configuration and authentication files; do not share their full contents.

The Mac DMG is universal and uses ad-hoc signing, **without Apple notarization**. See [Apple's official guidance](https://support.apple.com/102445) if macOS blocks it. Only the visible Codex++.app needs to be installed; the hidden manager shim supports legacy updaters.

## Development and License

See the [maintenance guide](docs/development/CANVASPRO_MAINTENANCE.md) for tests, builds, releases, and rollback. Each release's notes and manifests record its actual checks and limitations.

Copyright (C) 2026 BigPizzaV3 and upstream contributors. Retained documents: [AGPL-3.0-only](LICENSE), [third-party notices](THIRD_PARTY_NOTICES.md), and [attribution](ATTRIBUTION.md). Provide matching complete source alongside installers. Third-party applications are installed separately.
