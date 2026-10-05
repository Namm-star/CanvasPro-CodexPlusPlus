# Codex++ · CanvasPro 定制版

> 本仓库是 **CanvasPro 定制版**：默认接入 `https://api.canvasproai.com/v1`，打开管理工具后填写本站 API Key，点击「保存并启动 Codex」即可。内置 `gpt-6.1-sol`、`gpt-6-sol`、`gpt-6-astra`、`gpt-5.6-sol`。需先安装官方 Codex 桌面应用。使用及构建说明见 [CanvasPro 定制版](docs/CANVASPRO.md)。

## 原作者与项目来源

本项目基于 **[BigPizzaV3](https://github.com/BigPizzaV3)** 及上游贡献者开发的 **[CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)**。启动器、管理工具、供应商管理和界面增强等主体能力来自原项目，感谢原作者与贡献者的工作。

CanvasPro 的修改限于默认 API 供应商、填写 Key 后保存并启动的入口、已核对的文本模型预设和定制版发布资料。本仓库由 [Namm-star](https://github.com/Namm-star) 维护，与上游独立；不代表原作者对 CanvasPro 服务的背书。保留上游版权、[AGPL-3.0-only 许可证](LICENSE)和[第三方声明](THIRD_PARTY_NOTICES.md)，具体来源及改动见 [ATTRIBUTION.md](ATTRIBUTION.md)。

后续开发与发布请先读 [开发记录](docs/development/CANVASPRO_HISTORY.md)、[维护手册](docs/development/CANVASPRO_MAINTENANCE.md) 和 [首发发布基线](docs/development/releases/v1.5.0-canvaspro.1.provenance.json)。

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
- macOS Apple Silicon（M 系列）：`CanvasPro-CodexPlusPlus-*-macos-arm64.dmg`
- macOS Intel：`CanvasPro-CodexPlusPlus-*-macos-x64.dmg`

安装后会有两个入口：

- `Codex++`：静默启动官方桌面应用，并加载已保存的供应商配置与增强功能。
- `Codex++ 管理工具`：管理供应商、模型、工具插件、会话、增强功能、脚本、更新和诊断。

首次使用先安装官方 Codex，再安装本定制版。Windows 安装包会创建桌面和开始菜单快捷方式；Mac 打开对应 DMG，将「Codex++.app」和「Codex++ 管理工具.app」拖入 Applications。然后按下面的步骤申请并填写 API Key。

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

1. 打开「Codex++ 管理工具」，在概览首页找到「CanvasPro New API」。
2. 将完整密钥粘贴到「CanvasPro API Key」。只填写密钥本身，不添加 `Bearer `，也不要粘贴 JSON、请求头或多行内容。
3. 选择默认模型：`gpt-6.1-sol`，或 `gpt-6-sol`、`gpt-6-astra`、`gpt-5.6-sol`。
4. 点击「保存并启动 Codex」。工具会保存配置并启动官方 Codex；默认地址 `https://api.canvasproai.com/v1` 和 Responses 协议已填好，无需手动修改。
5. 启动后新建一个任务，发送一条简短消息确认能收到回复；这次请求会按模型价格计费。用量和扣费可在 API 站查看。

以后可直接从 `Codex++` 入口启动，复用已保存的密钥。管理工具保存后会清空密钥输入框，已有密钥仍保存在本机；更换密钥时填入新 Key，再点击「保存并启动 Codex」。

常见问题、手动配置参数和支持方式见[完整使用说明](docs/CANVASPRO.md)。请勿把完整密钥发到群聊、截图或 Issues；怀疑泄露时在密钥页禁用或删除旧密钥并重新创建。

## 交流与支持

CanvasPro 定制版的使用、API Key、余额和模型接入问题，请加入微信「**无限画布售后服务群**」，反馈问题或交流使用体验。

使用微信扫描下方二维码；在电脑上浏览时，可用手机微信扫一扫，或保存图片后在微信中识别二维码。

<img src="docs/images/canvaspro-support-group-20261004.png" alt="无限画布售后服务群微信二维码" width="320">

本次二维码截图标注有效期至 **10 月 11 日**。若二维码已失效，请通过[本仓库 Issues](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/issues)反馈并获取最新入群方式。

提交问题时请说明操作系统、安装包版本、选择的模型和错误提示；不要附带完整 API Key。

## 当前功能

| 模块 | 功能 |
| --- | --- |
| 供应商配置 | 官方登录、官方登录混入 API、纯 API、聚合供应商；Grok 供应商管理；Responses / Chat Completions；模型测试、模型列表、Provider Doctor、cc-switch 与链接导入 |
| 模型与上下文 | 每模型上下文窗口、自动压缩阈值、`model_catalog_json`、模型元数据导入（models.json）、通用配置，以及按供应商选择 MCP、Skill 和 Plugin |
| 会话管理 | 扫描本地会话、批量删除、Markdown 导出、Token 用量历史、Provider metadata 同步与备份 |
| 微信连接 | 个人微信扫码连接本机 Codex 会话，每个微信联系人映射到独立会话，可配置允许的微信用户 |
| Codex 增强 | 插件市场与模型白名单、会话操作、粘贴修复、中文界面、快速启动、会话宽度与滚动恢复、服务层级控制、Goals、Stepwise、皮肤管理、图片覆盖层 |
| 开发工作流 | 项目移动、Upstream worktree、线程 ID、Zed Remote 项目识别与打开 |
| 脚本与维护 | 用户脚本安装与启停、应用检测、快捷方式、Watcher、环境冲突、日志诊断、健康检查和 Release 更新 |

所有界面增强都可以单独关闭。关闭“Codex 增强”总开关后，Codex++ 仍可作为供应商和启动管理工具使用。

## 供应商模式

Codex++ 将官方登录、混入 API 和纯 API 分开保存和切换：

| 模式 | 用途 | 认证边界 |
| --- | --- | --- |
| 官方登录 | 只使用 ChatGPT / Codex 官方账号 | 清理自定义 provider 和 API Key，保留官方登录状态 |
| 官方登录 + API | 保留官方账号与插件入口，模型请求始终走兼容 API（不消耗官方额度，也不是官方优先回落） | API Key 写入 provider bearer token，不写入纯 API 的 `auth.json` |
| 纯 API | 不依赖官方账号，完全使用自定义 Base URL / Key | 独立保存 `config.toml` 与 API Key，不混入官方认证 |
| 聚合供应商 | 在多个普通 API 供应商之间路由 | 支持故障转移、按会话轮转、按请求轮转和权重轮转 |

每个供应商可配置 Responses 或 Chat Completions 协议、模型列表、测试模型、User-Agent、上下文窗口、自动压缩阈值，以及该供应商启用的 MCP Server、Skill 和 Plugin。Chat Completions 可通过本地代理转换为 Codex 使用的 Responses 协议。

每模型窗口支持 `1M`、`200K` 或纯数字。Codex++ 会生成独立 `model_catalog_json`，让 Codex 按当前模型使用对应窗口。

切换供应商时会先保存当前配置，再写入目标配置。真实 API Key 只保存在本机，请勿放入日志、截图或 issue。

## Codex 界面增强

- 会话删除、批量删除、Markdown 导出和项目移动。
- 插件市场解锁、插件自动展开和模型白名单处理。
- 富文本粘贴转纯文本、强制中文、启动加速和原生菜单本地化。
- 会话宽度、滚动位置恢复、线程 ID、服务层级切换和 Goals。
- Stepwise 下一步建议，可单独配置 API、模型、建议数量与超时。
- 皮肤管理：Dream Skin 社区主题的搜索、预览、安装和换图。
- Upstream worktree、Zed Remote、自定义图片覆盖层和用户脚本。

依赖注入脚本的设置通常需要保存后重新启动 Codex++ 才会生效。

## 自动更新与安装包

Codex++ 通过 GitHub Release 发布安装包。Windows 会生成 NSIS 安装程序，macOS 会生成 Intel x64 和 Apple Silicon arm64 两个 DMG。

管理工具的“关于”页可以检查并启动更新。静默启动器发现新版本时会拉起管理工具并进入更新提示。

## 数据位置

以下 `~/.codex` 均指 Codex 主目录：设置了 `CODEX_HOME` 环境变量时以该目录为准，否则为用户目录下的 `.codex`。

- Codex 配置：`~/.codex/config.toml`
- Codex 登录状态：`~/.codex/auth.json`
- Codex 本地数据库：优先读取 `~/.codex/sqlite/*.db`，旧版回退到 `~/.codex/state_5.sqlite`
- Codex++ 状态与日志：`~/.codex-session-delete/`
- Provider 同步备份：`~/.codex/backups_state/provider-sync`

## 常见问题

### Codex++ 菜单没出现

确认从 `Codex++` 入口启动，而不是直接打开官方应用。然后在管理工具的“安装维护”和“关于”页面检查应用路径、启动状态与诊断日志。

### 切换供应商后请求失败

先在供应商详情中运行模型测试或 Provider Doctor，并确认协议、Base URL、Key 和测试模型匹配。纯 API 与官方混入模式使用不同的认证位置，不要手工复制两种模式的 `auth.json`。

### 混入 API Key 模式是“官方优先、额度不足时 API 补偿”吗

不是。官方登录 + API（混入）模式下，模型请求**始终走你配置的兼容 API**，官方账号只保留登录状态和插件入口，不会先消耗官方额度再回落到 API。需要“一个供应商失败时切到另一个”的行为时，使用聚合供应商：它支持故障转移、按会话轮转、按请求轮转和权重轮转。两种模式的认证保存位置不同，配置前先在供应商详情里用模型测试确认目标 API 可用。

### Upstream worktree 和 Codex 原生创建有什么区别

Codex++ 的 Upstream worktree 功能等价于先更新远端分支，再执行：

```bash
git worktree add -b <new-branch> <worktree-path> upstream/<base-branch>
```

这样新 worktree 从最新的远端跟踪分支开始，而不是从当前会话所在的本地 HEAD 开始。如果 Codex++ 无法安全识别当前 Codex 版本的原生 worktree 创建表单，请从 Codex++ 菜单中手动填写仓库路径、分支名、worktree 路径、remote 和 base branch。

### macOS 提示无法打开或已损坏

当前安装包未签名/未公证时，macOS Gatekeeper 可能拦截，出现“已损坏，无法打开”的提示：

![macOS 提示 Codex++ 管理工具已损坏](docs/images/macos-damaged-warning.png)

如果遇到该提示，可以在终端执行下面两条命令，解除苹果系统的安全隔离限制：

```bash
sudo xattr -rd com.apple.quarantine /Applications/Codex++\ 管理工具.app
sudo xattr -rd com.apple.quarantine /Applications/Codex++.app
```

执行后重新打开 `Codex++` 或 `Codex++ 管理工具` 即可。

### macOS Intel 能用吗

可以。Release 会分别提供 `macos-x64.dmg` 和 `macos-arm64.dmg`。Intel Mac 下载 x64 包，Apple Silicon 下载 arm64 包。

## 开发

```bash
# 前端检查
cd apps/codex-plus-manager
npm ci
npm run check
npm run vite:build

# Rust 检查
cd ../..
cargo fmt --all -- --check
cargo test
cargo build --release
```

主要结构：

```text
apps/
  codex-plus-launcher/          静默启动入口
  codex-plus-manager/           Tauri 管理工具
assets/inject/
  renderer-inject.js            注入到 Codex 渲染端的增强脚本
crates/
  codex-plus-core/              启动、注入、配置、更新、安装、桥接等核心逻辑
  codex-plus-data/              会话数据、导出、Provider 同步
scripts/installer/
  windows/CodexPlusPlus.nsi     Windows NSIS 安装包
  macos/package-dmg.sh          macOS DMG 打包
```

## 开源协议

Copyright (C) 2026 BigPizzaV3

CodexPlusPlus 采用 [GNU Affero General Public License v3.0](LICENSE)，SPDX 标识为 `AGPL-3.0-only`。修改并分发本项目，或通过网络提供修改后的版本时，需要按 AGPLv3 提供对应源代码。

许可证只覆盖 CodexPlusPlus 自身代码，不授予 OpenAI、ChatGPT、Codex 的商标、应用资源或其他第三方内容的权利。

## 兼容性说明

Codex++ 依赖官方桌面应用的页面结构、CDP 和本地数据格式。官方应用更新后，部分注入功能可能需要跟随适配；修改供应商配置或本地会话数据前应保留备份。
