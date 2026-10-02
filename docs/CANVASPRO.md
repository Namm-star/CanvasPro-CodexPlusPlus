# CanvasPro 定制版

2026-10-02。本工作树基于 `BigPizzaV3/CodexPlusPlus@27d50a1`，分支 `codex/canvaspro-default-provider`。独立于 AI CanvasPro 画布服务；不修改线上渠道、模型、计费或数据。

原作者为 [BigPizzaV3](https://github.com/BigPizzaV3) 及上游贡献者，原项目为 [CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)。主体能力来自上游，本定制版仅调整 CanvasPro 接入和发布资料。保留 AGPL-3.0-only、原版权及第三方声明，详细说明见 [ATTRIBUTION.md](../ATTRIBUTION.md)。

定制版仓库：[Namm-star/CanvasPro-CodexPlusPlus](https://github.com/Namm-star/CanvasPro-CodexPlusPlus)。安装包与对应源码见该仓库 [Releases](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases)。macOS Intel / Apple Silicon 的构建流程已保留，是否可下载以实际发布附件为准。

## 用户使用

1. 安装官方 Codex 桌面应用，再安装本定制版的 Codex++。它是官方应用的外部启动器，不内置官方应用。
2. 在 [CanvasPro 密钥页](https://api.canvasproai.com/keys) 创建自己的本站 API Key，确保钱包和密钥权限可用。
3. 打开管理工具，概览首页填入 Key，点击「保存并启动 Codex」。地址、Responses 协议和模型已经预填；无需填写上游供应商配置。
4. 默认使用 `gpt-6.1-sol`，可选择 `gpt-6-sol`、`gpt-6-astra`、`gpt-5.6-sol`。供应商详情仍可管理其他供应商和高级选项。

仅使用本站 Key，不使用管理员或上游 Key。Key 按原项目机制保存在本机配置中；首页使用密码输入框，不展示已存 Key，不在日志输出 Key。模型费用仍由本站共享钱包结算。

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

概览首页用 CanvasPro 接入面板替代远端置顶赞助推荐。上游的其他供应商预设、推荐页和历史赞助说明保留。使用上游安装包或应用上游更新可能覆盖本定制功能；分发时应使用本工作树的构建产物。

## 构建与验证

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
- 没有使用真实 Key 或发出付费模型请求，不宣称真实 Codex 端到端调用已验收。未在用户日常环境运行安装器，避免改写已有快捷方式与 Codex 配置。
