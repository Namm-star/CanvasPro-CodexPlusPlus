# Codex++ · CanvasPro 定制版

> 本仓库是 **CanvasPro 定制版**：默认接入 `https://api.canvasproai.com/v1`，打开管理工具后填写本站 API Key，点击「保存并启动 Codex」即可。内置 `gpt-6.1-sol`、`gpt-6-sol`、`gpt-6-astra`、`gpt-5.6-sol`。需先安装官方 Codex 桌面应用。使用及构建说明见 [CanvasPro 定制版](docs/CANVASPRO.md)。

## 原作者与项目来源

本项目基于 **[BigPizzaV3](https://github.com/BigPizzaV3)** 及上游贡献者开发的 **[CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)**。启动器、管理工具、供应商管理和界面增强等主体能力来自原项目，感谢原作者与贡献者的工作。

CanvasPro 的修改限于默认 API 供应商、填写 Key 后保存并启动的入口、已核对的文本模型预设和定制版发布资料。本仓库由 [Namm-star](https://github.com/Namm-star) 维护，与上游独立；不代表原作者对 CanvasPro 服务的背书。保留上游版权、[AGPL-3.0-only 许可证](LICENSE)和[第三方声明](THIRD_PARTY_NOTICES.md)，具体来源及改动见 [ATTRIBUTION.md](ATTRIBUTION.md)。

后续开发与发布请先读 [开发记录](docs/development/CANVASPRO_HISTORY.md)、[维护手册](docs/development/CANVASPRO_MAINTENANCE.md) 和 [当前发布基线](docs/development/releases/v2.1.1-canvaspro.1.provenance.json)。[首发记录](docs/development/releases/v1.5.0-canvaspro.1.provenance.json) 保留供历史核对。

**定制版下载：[CanvasPro Releases](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases)**。本定制版的使用问题、API 接入和建议，请通过下方「交流与支持」联系 CanvasPro，或提交到[本仓库 Issues](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/issues)。

<p align="center">
  <img src="docs/images/codex-plus-plus.png" alt="Codex++ 图标" width="160">
</p>

<p align="center">
  中文 | <a href="README_EN.md">English</a>
</p>

<p align="center">
  <img alt="CanvasPro Release" src="https://img.shields.io/github/v/release/Namm-star/CanvasPro-CodexPlusPlus">
  <img alt="Upstream Stars" src="https://img.shields.io/github/stars/BigPizzaV3/CodexPlusPlus?label=upstream%20stars">
  <img alt="License" src="https://img.shields.io/github/license/Namm-star/CanvasPro-CodexPlusPlus">
  <img alt="Rust" src="https://img.shields.io/badge/rust-1.85%2B-orange">
  <img alt="Tauri" src="https://img.shields.io/badge/tauri-2.x-24C8DB">
</p>

Codex++ 是面向 OpenAI Codex / ChatGPT 桌面应用的外部启动器与管理工具。它通过 Chromium DevTools Protocol 和本地辅助服务提供供应商切换、协议转换、会话管理与界面增强，不修改官方应用的 `app.asar`，也不向安装目录写入补丁文件。

## 快速使用

从 [CanvasPro GitHub Releases](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases) 下载定制版安装包和对应源码：

- Windows：`CanvasPro-CodexPlusPlus-*-windows-x64-setup.exe`
- 对应源码：`CanvasPro-CodexPlusPlus-*-source.zip`；分发安装包时请同时提供源码。
- macOS Intel / Apple Silicon 通用包：`CanvasPro-CodexPlusPlus-*-macos-universal.dmg`

新版采用单应用结构：打开 `Codex++` 就是管理界面。Windows 安装包提供桌面 / 开始菜单入口；Mac 打开通用 DMG，将可见的「Codex++.app」拖入 Applications。旧「管理工具」兼容壳仅用于迁移，用户无需单独安装或启动。官方 Codex 桌面应用仍需另行安装。

## 申请并使用 CanvasPro API Key

### 1. 注册或登录 CanvasPro

打开 [CanvasPro API 站](https://api.canvasproai.com)，点击注册或登录。API 站与[无限画布](https://canvasproai.com)使用统一账号：注册入口会跳转到画布站，已有画布账号可直接登录，也可以从画布站的 API 入口进入。

登录后，先查看账号余额；余额不足时按页面提示充值。API 模型调用从 CanvasPro 共享钱包扣费，价格可在[模型价格页](https://api.canvasproai.com/pricing)查看。创建密钥本身不会增加账户余额。

### 2. 创建并复制 API Key

1. 打开 [API 密钥页](https://api.canvasproai.com/keys)，点击「创建 API 密钥」。管理工具首页的「获取本站 API Key」也会打开此页面。
2. 名称填写便于识别的名字，例如 `CodexPlusPlus-我的电脑`；分组保留页面提供的默认可用选择。
3. 设定这把密钥的配额和过期时间。使用有限配额时请填入足够本次使用的正数；也可按需要勾选「无限配额」。**无限配额只表示不单独限制这把密钥的额度，调用仍需账户余额并正常扣费。**
4. 如果启用了模型限制，确保允许客户端选择的 GPT 模型；如果设置了 IP 白名单，确保当前电脑的出口 IP 在允许范围内。初次配置不确定时，可先保留这两项默认设置。
5. 保存后，在密钥列表点击复制图标（「复制 API 密钥」），复制完整密钥。不要复制列表中带 `***` 的脱敏文本。

### 3. 填入管理工具并启动

1. 打开「Codex++」，在概览首页找到「CanvasPro New API」。
2. 将完整密钥粘贴到「CanvasPro API Key」。只填写密钥本身，不添加 `Bearer `，也不要粘贴 JSON、请求头或多行内容。
3. 选择默认模型：`gpt-6.1-sol`，或 `gpt-6-sol`、`gpt-6-astra`、`gpt-5.6-sol`。
4. 点击「保存并启动 Codex」。工具会保存配置并启动官方 Codex；默认地址 `https://api.canvasproai.com/v1` 和 Responses 协议已填好，无需手动修改。
5. 启动后新建一个任务，发送一条简短消息确认能收到回复；这次请求会按模型价格计费。用量和扣费可在 API 站查看。

以后打开 `Codex++`，点击「保存并启动 Codex」或启动按钮，复用已保存的密钥。管理工具保存后会清空密钥输入框，已有密钥仍保存在本机；更换密钥时填入新 Key，再点击「保存并启动 Codex」。

常见问题、手动配置参数和支持方式见[完整使用说明](docs/CANVASPRO.md)。请勿把完整密钥发到群聊、截图或 Issues；怀疑泄露时在密钥页禁用或删除旧密钥并重新创建。

## 交流与支持

CanvasPro 定制版的使用、API Key、余额和模型接入问题，请加入微信「**画布&api服务群**」，反馈问题或交流使用体验。

使用微信扫描下方二维码；在电脑上浏览时，可用手机微信扫一扫，或保存图片后在微信中识别二维码。

<img src="docs/images/canvaspro-support-group-20261029.png" alt="画布&amp;api服务群微信二维码" width="320">

二维码更新于 **2026 年 10 月 29 日**，截图标注有效期至 **2026 年 11 月 5 日前**。若二维码失效，请通过[本仓库 Issues](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/issues)获取最新入群方式。

提交问题时请说明操作系统、安装包版本、选择的模型和错误提示；不要附带完整 API Key。

## 本次同步

当前发布版本为 **[v2.1.1-canvaspro.1](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases/tag/v2.1.1-canvaspro.1)**，基于上游 v2.1.1，提供 Windows x64 安装包、Mac universal DMG、完整源码及校验清单。

- 同步新版 Codex 的模型目录、Responses 协议、工具调用与供应商配置修复。
- 同步 v2.1.1 的网关与供应商池、旧版 Mac 黑屏和 Codex 26.10 兼容修复；总览首页保留 CanvasPro 填 Key 即用的入口。
- 跟进模型聚合、官方账号成员、Codex 多开、用量状态栏及上游其他增强。
- 采用统一应用与 Mac 双架构通用包，保留旧版本配置和升级迁移。
- 默认仍为 CanvasPro；填自己的 Key 后保存并启动。更新检查与下载已改为本定制仓库，并支持同一上游版本的 CanvasPro 修订号升级。

## 当前功能

| 模块 | 功能 |
| --- | --- |
| CanvasPro 接入 | 默认 Responses / Pure API，首页填 Key、选模型、保存后启动 |
| 供应商与模型 | 官方登录、官方登录 + API、纯 API、故障转移、模型聚合、每模型上下文和自动压缩 |
| 启动与实例 | 统一管理界面、按供应商身份隔离的 Codex 多开、可选自动接管官方 App |
| 会话与用量 | 会话管理、导出、分享、本机 Token 用量状态栏与历史 |
| 增强与生态 | 独立开关、脚本、皮肤、MCP / Skill / Plugin 管理及语音输入 |
| 维护与更新 | 日志、健康检查、环境诊断、本定制版 Release 更新 |

模型菜单仍为已核对的静态文本预设；本站上架新模型不会自动改变安装包内的清单。Claude 等工具的上游增强不代表本站提供相应模型或官方应用。

## 数据与升级

应用身份和原有配置目录保持兼容：Codex 默认配置在用户目录的 `~/.codex`，Codex++ 状态在 `~/.codex-session-delete`。设置了 `CODEX_HOME` 时以该目录为准。升级不应清空用户的供应商、Key 或会话。

新版纯 API 认证会将 Key 写入本机供应商配置和认证文件；不要分享这些文件的完整内容。更新器已指向 CanvasPro 仓库；从旧版升级到本版，先下载本仓库对应安装包，旧二进制尚不会读取新更新源。

Mac 包目前使用 ad-hoc 签名，**未经过 Apple 公证**。如被系统拦截，参阅 [Apple 官方说明](https://support.apple.com/102445)。通用包同时包含 Intel 和 Apple Silicon 程序；隐藏的旧管理工具壳用于旧更新器兼容。

## 开发与验证

在仓库根目录执行：

```powershell
Push-Location apps/codex-plus-manager
npm ci
npm test
npm run check
npm run vite:build
Pop-Location
cargo test --workspace --locked
cargo build --release --locked
```

构建、发布、回退和测试限制见 [维护手册](docs/development/CANVASPRO_MAINTENANCE.md)，每版实际验证结果见对应发布说明和构建清单。

## 开源协议

Copyright (C) 2026 BigPizzaV3。主体能力来自原项目及其贡献者；本定制版保留 [AGPL-3.0-only](LICENSE)、[第三方声明](THIRD_PARTY_NOTICES.md)和[来源说明](ATTRIBUTION.md)。分发安装包时同时提供对应完整源码。OpenAI、Codex、Claude 等第三方应用需要另行安装，其商标和资源不属于本项目许可范围。
