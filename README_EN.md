# Codex++ · CanvasPro Edition

> This repository is the **CanvasPro edition**. The default endpoint is `https://api.canvasproai.com/v1`. Open the manager, enter your CanvasPro API key, and click “Save and launch Codex”. Preset models: `gpt-6.1-sol`, `gpt-6-sol`, `gpt-6-astra`, and `gpt-5.6-sol`. Install the official Codex desktop app first. See [CanvasPro edition](docs/CANVASPRO.md).

## Original Author and Upstream Project

This edition is based on **[CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)** by **[BigPizzaV3](https://github.com/BigPizzaV3)** and upstream contributors. Its launcher, manager, provider management, and UI enhancements come from the original project. We gratefully acknowledge their work.

CanvasPro changes cover the default API provider, key-only setup and launch flow, verified text model presets, and edition-specific distribution materials. This repository is maintained independently by [Namm-star](https://github.com/Namm-star); it does not imply endorsement of CanvasPro by the original author. Upstream copyrights, the [AGPL-3.0-only license](LICENSE), and [third-party notices](THIRD_PARTY_NOTICES.md) are retained. See [ATTRIBUTION.md](ATTRIBUTION.md) for provenance and modification details.

Before future development or releases, read the [development history](docs/development/CANVASPRO_HISTORY.md), [maintenance guide](docs/development/CANVASPRO_MAINTENANCE.md), and [initial release provenance](docs/development/releases/v1.5.0-canvaspro.1.provenance.json).

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
- macOS Apple Silicon (M series): `CanvasPro-CodexPlusPlus-*-macos-arm64.dmg`
- macOS Intel: `CanvasPro-CodexPlusPlus-*-macos-x64.dmg`

After installation, two entry points are available:

- `Codex++`: silently starts the official desktop app with saved provider settings and enhancements.
- `Codex++ Manager`: manages providers, models, tools, sessions, enhancements, scripts, updates, and diagnostics.

Install the official Codex desktop app first, then this edition. The Windows installer creates Desktop and Start Menu shortcuts. On macOS, open the matching DMG and drag both “Codex++.app” and “Codex++ 管理工具.app” into Applications. Follow the API key setup below.

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

1. Open Codex++ Manager and find “CanvasPro New API” on the overview page.
2. Paste the complete key into “CanvasPro API Key”. Do not include `Bearer `, JSON, request headers, or multiple lines.
3. Select `gpt-6.1-sol` (the default), `gpt-6-sol`, `gpt-6-astra`, or `gpt-5.6-sol`.
4. Click “Save and launch Codex”. The endpoint `https://api.canvasproai.com/v1` and Responses protocol are preset.
5. Start a new task and send a short message to confirm a reply. This request is billable; review usage and charges on the API site.

Later, launch through `Codex++` to reuse your saved key. The manager clears the input after saving while keeping the saved key locally. To replace it, enter a new key and save and launch again.

See the [full usage guide](docs/CANVASPRO.md) for troubleshooting and manual settings. Do not post complete keys in group chats, screenshots, or Issues. If a key is exposed, disable or delete it on the key page and create a replacement.

## Community and Support

For this CanvasPro edition's setup, API keys, balance, and model access, join the WeChat group **无限画布售后服务群 (Infinite Canvas After-sales Support)**.

Scan the QR code with WeChat on your phone, or save the image and recognize it in WeChat.

<img src="docs/images/canvaspro-support-group-20261004.png" alt="CanvasPro Infinite Canvas support group WeChat QR code" width="320">

The screenshot states that this QR code is valid until **October 11**. If it expires, use [this repository's Issues](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/issues) to request the latest way to join.

When reporting a problem, include your operating system, package version, model, and error message. Do not include a complete API key.

## Current Features

| Area | Capabilities |
| --- | --- |
| Provider configuration | Official login, official login plus API, pure API, and aggregate providers; Grok provider management; Responses / Chat Completions; model tests, model discovery, Provider Doctor, cc-switch and deep-link imports |
| Models and context | Per-model context windows, auto-compact limits, `model_catalog_json`, model metadata import (models.json), shared config, and per-provider MCP, Skill, and Plugin selection |
| Session management | Local session scanning, bulk deletion, Markdown export, token usage history, Provider metadata sync, and backups |
| WeChat connection | QR login connects personal WeChat to local Codex sessions; each WeChat contact maps to a separate session, with an allowed-user list |
| Codex enhancements | Plugin marketplace and model whitelist handling, session actions, paste fix, Chinese locale, fast startup, conversation width and scroll restore, service-tier controls, Goals, Stepwise, skin management, and image overlay |
| Development workflow | Project move, Upstream worktree creation, thread IDs, and Zed Remote project discovery and opening |
| Scripts and maintenance | User script installation and toggles, app detection, shortcuts, Watcher, environment cleanup, logs, diagnostics, health checks, and Release updates |

Every UI enhancement is independently configurable. Disabling the global enhancement switch still leaves Codex++ available as a provider and launch manager.

## Provider Modes

Official login, mixed API, and pure API are stored and switched separately:

| Mode | Purpose | Authentication boundary |
| --- | --- | --- |
| Official login | Use only the official ChatGPT / Codex account | Removes custom providers and API keys while preserving official login state |
| Official login + API | Keep official account features and plugins while routing model requests to a compatible API | Stores the key as a provider bearer token, not in pure API `auth.json` |
| Pure API | Use a custom Base URL and key without an official account | Maintains independent `config.toml` and API-key auth without mixing official credentials |
| Aggregate provider | Route across multiple ordinary API providers | Supports failover, conversation round-robin, request round-robin, and weighted round-robin |

Each provider can configure Responses or Chat Completions, model lists, a test model, User-Agent, context windows, auto-compact limits, and enabled MCP servers, Skills, and Plugins. Chat Completions can be converted locally into the Responses protocol used by Codex.

Per-model windows accept values such as `1M`, `200K`, or plain integers. Codex++ generates a dedicated `model_catalog_json` for Codex.

Provider switching saves the current profile before applying the target profile. Real API keys remain local and should never be posted in logs, screenshots, or issues.

## Codex Enhancements

- Session delete, bulk delete, Markdown export, and project move actions.
- Plugin marketplace unlock, plugin auto-expand, and model whitelist handling.
- Plain-text paste, forced Chinese locale, startup acceleration, and native menu localization.
- Conversation width, scroll restoration, thread IDs, service-tier controls, and Goals.
- Stepwise suggestions with a separate API, model, item count, and timeout.
- Skin management: search, preview, install, and image replacement for Dream Skin community themes.
- Upstream worktrees, Zed Remote, custom image overlays, and user scripts.

Settings that depend on renderer injection generally require saving and restarting Codex++.

## Updates and Packages

Codex++ publishes installers through GitHub Releases. Windows builds an NSIS installer, while macOS builds separate Intel x64 and Apple Silicon arm64 DMGs.

The manager's About page can check and start updates. When the silent launcher finds a new version, it opens the manager directly on the update prompt.

## Data Locations

- Codex config: `~/.codex/config.toml`
- Codex auth state: `~/.codex/auth.json`
- Codex local database: prefers `~/.codex/sqlite/*.db`, falls back to legacy `~/.codex/state_5.sqlite`
- Codex++ state and logs: `~/.codex-session-delete/`
- Provider Sync backups: `~/.codex/backups_state/provider-sync`

`~/.codex` above refers to the Codex home directory: it follows the `CODEX_HOME` environment variable when set, and defaults to `.codex` under the user profile otherwise.

## FAQ

### The Codex++ menu does not appear

Launch through the `Codex++` entry instead of opening the official app directly. Check the detected app path, launch status, and diagnostic logs in the manager's Maintenance and About pages.

### Requests fail after switching providers

Run the model test or Provider Doctor from the provider detail page. Verify that the protocol, Base URL, key, and test model match. Pure API and official-login-plus-API use different authentication locations; do not manually copy `auth.json` between them.

### How is Upstream worktree different from Codex native creation?

Codex++ updates the remote branch first, then creates the worktree as if you ran:

```bash
git worktree add -b <new-branch> <worktree-path> upstream/<base-branch>
```

The new worktree starts from the fresh remote tracking branch instead of the local HEAD used by the current session. If Codex++ cannot safely recognize the current Codex version's native worktree form, use the Codex++ menu entry and enter the repository path, branch name, worktree path, remote, and base branch manually.

### macOS says the app cannot be opened or is damaged

Unsigned and unnotarized builds may be blocked by Gatekeeper. Allow the app in System Settings -> Privacy & Security. For formal distribution, configure Apple Developer ID signing and notarization.

### Does it support Intel Macs?

Yes. Releases provide both `macos-x64.dmg` and `macos-arm64.dmg`. Intel Macs should use the x64 package, while Apple Silicon Macs should use the arm64 package.

## Development

```bash
cd apps/codex-plus-manager
npm ci
npm run check
npm run vite:build

cd ../..
cargo fmt --all -- --check
cargo test
cargo build --release
```

Project structure:

```text
apps/
  codex-plus-launcher/          Silent launcher
  codex-plus-manager/           Tauri manager
assets/inject/
  renderer-inject.js            Enhancement script injected into Codex
crates/
  codex-plus-core/              Launch, injection, config, update, install, bridge
  codex-plus-data/              Session data, export, Provider Sync
scripts/installer/
  windows/CodexPlusPlus.nsi     Windows NSIS installer
  macos/package-dmg.sh          macOS DMG packager
```

## License

Copyright (C) 2026 BigPizzaV3

CodexPlusPlus is licensed under the [GNU Affero General Public License v3.0](LICENSE), SPDX identifier `AGPL-3.0-only`. Modified versions that are distributed or offered to users over a network must provide the corresponding source code as required by AGPLv3.

The license covers CodexPlusPlus code only. It does not grant rights to OpenAI, ChatGPT, Codex trademarks, application assets, or other third-party content.

## Compatibility

Codex++ depends on the official desktop app's page structure, CDP behavior, and local data formats. Official app updates may require injection updates. Keep backups before changing provider configuration or local session data.
