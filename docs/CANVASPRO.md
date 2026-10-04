# CanvasPro 定制版

本工具默认接入 CanvasPro New API。安装官方 Codex 桌面应用和本定制版后，填写自己创建的 CanvasPro API Key，即可保存配置并启动 Codex。使用说明更新于 2026-10-04。

原作者为 [BigPizzaV3](https://github.com/BigPizzaV3) 及上游贡献者，原项目为 [CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)。主体能力来自上游，本定制版仅调整 CanvasPro 接入和发布资料。保留 AGPL-3.0-only、原版权及第三方声明，详细说明见 [ATTRIBUTION.md](../ATTRIBUTION.md)。

定制版仓库：[Namm-star/CanvasPro-CodexPlusPlus](https://github.com/Namm-star/CanvasPro-CodexPlusPlus)。[Releases](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases) 已提供 Windows x64、macOS Apple Silicon arm64、macOS Intel x64 安装包及对应源码。

## 用户使用

### 安装客户端

先安装官方 Codex 桌面应用，本工具是外部启动器，不内置官方应用。再从本仓库 Releases 下载对应版本：

- Windows：运行 `CanvasPro-CodexPlusPlus-*-windows-x64-setup.exe`，通过桌面或开始菜单打开管理工具。
- Mac M 系列：下载 `macos-arm64.dmg`；Intel Mac：下载 `macos-x64.dmg`。打开 DMG，将「Codex++.app」和「Codex++ 管理工具.app」拖入 Applications。

### 申请 API Key

1. 打开 [CanvasPro API 站](https://api.canvasproai.com)，选择注册或登录。本站与[无限画布](https://canvasproai.com)使用统一账号，注册会跳转到画布站；已有画布账号可登录，也可通过画布站的 API 入口进入。
2. 登录后查看余额，余额不足时按页面提示充值。CanvasPro API 与画布使用共享钱包，调用按[模型价格页](https://api.canvasproai.com/pricing)计费；创建 Key 不会赠送或增加余额。
3. 打开 [API 密钥页](https://api.canvasproai.com/keys)，点击「创建 API 密钥」。管理工具的「获取本站 API Key」按钮也可打开此页面。
4. 填写名称，例如 `CodexPlusPlus-我的电脑`，分组保留页面提供的默认可用选择；设置密钥配额和过期时间。有限配额需要有足够使用的正数额度；「无限配额」只是不单独限制该 Key，仍需账户余额并正常扣费。
5. 模型限制若开启，应允许你准备使用的 GPT 型号；IP 白名单若开启，应包含电脑当前出口 IP。初次配置可保留这些默认设置，后续按需要调整。
6. 保存密钥，再用列表里的复制图标（「复制 API 密钥」）复制完整 Key。带 `***` 的列表文本是脱敏显示，不能作为实际密钥使用。

### 保存配置并使用

1. 打开「Codex++ 管理工具」，在概览首页的「CanvasPro New API」面板中，将完整 Key 粘贴到「CanvasPro API Key」。只填密钥本身，不带 `Bearer ` 前缀、JSON、请求头或换行。
2. 选择 `gpt-6.1-sol`（默认）、`gpt-6-sol`、`gpt-6-astra` 或 `gpt-5.6-sol`。
3. 点击「保存并启动 Codex」。工具会保存密钥与模型配置并启动官方 Codex；Base URL 和 Responses 协议已预填，无需手动修改。
4. 新建任务，发送一条简短消息确认能收到回复。此请求会正常计费，用量和扣费可在 API 站查看。
5. 后续从 `Codex++` 入口启动，可复用已保存的配置。切换模型或更换密钥后，再点击「保存并启动 Codex」。

Key 保存在本机配置中；首页使用密码输入框，保存成功后清空输入内容，已保存的 Key 仍可复用。只使用自己在本站创建的密钥，不要将完整 Key 放入群聊、日志、截图或 Issues。怀疑泄露时在密钥页禁用或删除旧 Key，并重新创建。

### 常见接入问题

| 现象 | 检查方法 |
| --- | --- |
| 提示密钥为空或格式不正确 | 首次使用需粘贴完整 Key；不要填写 `Bearer `、JSON、多行内容或脱敏文本 |
| 认证失败 / 401 | 核对是否为本站密钥、是否复制完整，以及密钥是否被禁用或已过期 |
| 余额或配额不足 | 检查共享钱包余额及密钥自己的剩余配额；给 Key 设置配额不会增加账户余额 |
| 模型不可用 / 权限不足 | 检查 Key 的分组、模型限制和 IP 白名单，并确认所选模型在站内可用 |
| 保存后 Key 输入框变空 | 正常行为，界面清空输入，已保存的 Key 仍保存在本机 |
| 看不到 CanvasPro 接入面板 | 确认安装的是本仓库的 CanvasPro 定制版，并查看管理工具概览首页 |

若仍无法使用，可在供应商详情运行模型测试或 Provider Doctor，检查地址、Responses 协议及模型；模型测试也可能产生调用费用。反馈问题时提供系统、版本、模型和错误提示即可，不要附带完整 Key。

## 交流与支持

微信「**无限画布售后服务群**」处理本定制版使用、API Key、余额和模型接入问题。用微信扫码或保存图片后识别：

<img src="images/canvaspro-support-group-20261004.png" alt="无限画布售后服务群微信二维码" width="320">

截图标注本次二维码有效期至 **10 月 11 日**；如已失效，请在[本仓库 Issues](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/issues)获取最新入群方式。

## 接入配置

| 项目 | 默认值 |
| --- | --- |
| 供应商 | CanvasPro New API |
| Base URL | `https://api.canvasproai.com/v1` |
| 协议 | 原生 Responses，`POST /v1/responses` |
| 模式 | Pure API，Custom 会话身份 |
| 默认模型 | `gpt-6.1-sol` |
| 模型清单 | `gpt-6.1-sol`、`gpt-6-sol`、`gpt-6-astra`、`gpt-5.6-sol` |

这份文本清单来自 2026-10-02 对本站公开 `/api/pricing` 的只读回读。本站共 104 款公开模型，其中仅这四款 GPT 文本模型进入本启动器预设。图片、视频使用专用异步接口，不放入 Codex 文本模型菜单；当前目录没有 `gpt-5.5`。菜单为已核对的内置清单，后续上架新文本型号时需更新预设，不宣称自动发现所有模型。

全新安装使用 CanvasPro 配置，空 Key 不会自动调用模型或写入用户的 Codex 配置。已有供应商照常加载，首页主动接入时复用同地址的 Pure API 配置，或新增独立记录；不会把其他供应商改名为 CanvasPro。保存失败时不启动 Codex。

概览首页提供 CanvasPro 接入面板，已有其他供应商配置继续保留。使用上游安装包或应用上游更新可能覆盖本定制功能；分发时应使用本仓库的构建产物。

## 构建与验证

2026-10-02 的构建基于 `BigPizzaV3/CodexPlusPlus@27d50a1`，分支 `codex/canvaspro-default-provider`。本工具独立于 AI CanvasPro 画布服务，不修改线上渠道、模型、计费或数据。

前端无依赖测试可直接执行（Node 24）：

```powershell
Set-Location 'F:/codex项目文件/CodexPlusPlus/apps/codex-plus-manager'
node --test 'src/*.test.ts'
```

用户已授权安装构建依赖。使用 `npm ci` 安装仓库锁定的前端依赖，未修改依赖清单或锁文件。类型检查 `npm run check`、生产前端构建 `npm run vite:build` 均已通过。

Rust 验证用现有工具链执行：

```powershell
Set-Location 'F:/codex项目文件/CodexPlusPlus'
cargo test -p codex-plus-core --test canvaspro_defaults
cargo test -p codex-plus-core --lib settings::tests
cargo test -p codex-plus-core --test relay_config
```

Windows 构建使用 Rust 1.99.0 stable MSVC、电脑已有的 Visual Studio Build Tools 2026 / Windows SDK，以及 NSIS 3.12。原项目 `.github/workflows/pr-build.yml` 包含前端构建、Rust 测试、release 二进制与安装器步骤。本次 `cargo build --release --locked` 成功。安装器文件名带 CanvasPro 标识，并包含使用说明、原作者署名、AGPL 许可证和第三方声明。定制版通过独立仓库提供源码和发布包；不向原仓库推送修改。

安装包：`dist/windows/CanvasPro-CodexPlusPlus-1.5.0-canvaspro.1-windows-x64-setup.exe`。同目录保留对应源码 ZIP 和构建清单。分发安装包时同时提供对应源码 ZIP；上游版权与许可证保持不变。

## 验证记录

- 前端自动测试 317/317、TypeScript 检查和 Vite 生产构建通过。
- Rust 工作区 1693 项通过，7 项上游自带忽略。一次完整运行中，上游 `app_paths_resolves_portable_current_link_to_directory_version` 因 Windows 错误 1314（缺少创建符号链接权限）失败；保留原测试不改，最终运行只跳过该项，其他测试全部通过。
- 新增 4 项 Rust 集成覆盖无 Key 的全新安装默认值、旧供应商保留、仅填写 Key 生成 Responses 配置与 auth.json、禁止新默认配置覆盖已有多供应商。
- 浏览器使用正式构建和仅本地的模拟 Tauri IPC 验证，首页无空白或脚本错误；空 Key、错误请求头、失败不启动、选择型号、成功保存后启动均通过。模拟 Key 没有发送到任何模型接口。
- 上游 `tools/i18n-verify.mjs` 存在旧键缺失/残留，本次未扩大到全站翻译修复；新增 CanvasPro 文案提供中英文。
- 安装器 NSIS 编译成功，解包后的两个 EXE 与 release 编译结果的 SHA-256 逐一一致，使用说明/许可证/第三方声明均在包内。
- macOS Intel / Apple Silicon 原生构建均完成；每种架构的 4 项 CanvasPro 配置测试、Mach-O 架构检查、严格代码签名验证和 DMG 完整性校验通过。每个版本随包提供构建清单和 SHA-256 校验文件；采用 ad-hoc 签名，未经过 Apple 公证。
- 没有使用真实 Key 或发出付费模型请求，不宣称真实 Codex 端到端调用已验收。未在用户日常环境运行安装器，避免改写已有快捷方式与 Codex 配置。
