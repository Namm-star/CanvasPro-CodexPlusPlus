# CanvasPro Codex++ 开发与发布记录

记录日期：2026-10-05（北京时间）。本记录覆盖 2026-10-02 首次改造与发布、2026-10-04 使用说明调整，以及本次维护资料归档。历史结果按发生时点记载，后续迭代追加新条目。

用户使用见 [CANVASPRO.md](../CANVASPRO.md)，后续开发和发布步骤见 [维护手册](CANVASPRO_MAINTENANCE.md)，首发可核验数据见 [发布基线 JSON](releases/v1.5.0-canvaspro.1.provenance.json)。

## 项目来源与目标

原作者为 [BigPizzaV3](https://github.com/BigPizzaV3) 及贡献者，原仓库为 [BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus)。本项目是其独立定制版，维护仓库为 [Namm-star/CanvasPro-CodexPlusPlus](https://github.com/Namm-star/CanvasPro-CodexPlusPlus)，保留上游 Git 历史、版权、AGPL-3.0-only 和第三方声明，详见 [ATTRIBUTION.md](../../ATTRIBUTION.md)。

用户目标：将原有默认供应商接入改为 CanvasPro New API，用户安装后仅需填写自己申请的 API Key，即可使用预设 GPT 文本模型。上游启动器、管理工具和其他供应商能力继续保留。

桌面工具通过公开 API 调用 CanvasPro；官方 Codex 桌面应用需要另行安装。本轮未修改 AI CanvasPro / New API 的线上渠道、模型配置、价格、共享钱包或数据库。

## 基线与提交

| 基线 | 提交 / 标签 | 用途 |
| --- | --- | --- |
| 上游起点 | `27d50a1a0413b3c445bc95fae081f16b6c7edbf0` | 原项目 v1.5.0 附近的源码基线 |
| 接入应用代码 | `f037d45bc29b9399fdc4b86cbcd7d91b15375fde` | CanvasPro 默认供应商、首页保存启动流程及测试 |
| 首发完整源码 | `e9b6d59c14029c45134afd0d23f46f7c0a6dc09e` | 署名、许可证、安装和发布资料一起纳入 |
| 发布标签 | `v1.5.0-canvaspro.1` → `e9b6d59` | Windows、两种 Mac 安装包和源码 ZIP 的共同源码基线 |
| Mac CI 补全 | `c30e2159b86d743052b889a3b625d570f10be296` | 对已有标签手动构建、原生配置测试和构建清单 |
| Mac CI 校验修正 | `8c29256ffd19fae341d325293a011c4a8ca94d26` | 修正 `lipo` 参数顺序，完成两种架构发布 |
| 用户教程修订 | `0b2eee61a32aa94849ae74b0335a4962bc24e68b` | 2026-10-04 的 README、Key 教程和售后群调整 |

`main` 和 `codex/canvaspro-default-provider` 是定制版的开发入口；`origin` 指向定制版，`upstream` 指向原项目。归档前两分支均处于 `0b2eee6`，本次新增记录会产生后续文档提交。

安装包的源码基线与后来的 CI / 文档提交须分别记录：Mac 的构建工作流来自 `8c29256`，但工作流 checkout 的应用源码仍是发布标签指向的 `e9b6d59`。首发安装包与源码 ZIP 未因 10 月 4 日教程修改而重新打包。当前应用内版本为 `1.5.0`，安装包和发布标签带 `canvaspro.1` 后缀。

## 2026-10-02：默认接入改造

### 已实现的行为

- 新安装的前后端默认供应商为 `CanvasPro New API`，地址 `https://api.canvasproai.com/v1`，使用原生 Responses 协议、Pure API 模式及 Custom 会话身份。
- 首页提供密码形式的 Key 输入、模型选择、「获取本站 API Key」和「保存并启动 Codex」。保存成功后才启动，失败则保留错误提示并停止启动。
- 默认 `gpt-6.1-sol`；另预设 `gpt-6-sol`、`gpt-6-astra`、`gpt-5.6-sol`。
- Key 去除首尾空白，拒绝空白字符、多行内容和带空格的 `Bearer` 请求头；不强制某种前缀。已有同地址 Pure API 配置可复用已保存 Key。
- 没有内置真实密钥；已有供应商继续加载，旧 `RelayProfile::default()` 的官方登录语义保留。
- 新默认配置不能覆盖已有的多供应商记录。模型清单为静态预设，未实现在线自动发现或同步。
- 提供中英文新增文案；安装包命名加入 CanvasPro 标识。

### 模型清单的依据

2026-10-02 对本站公开 `/api/pricing` 只读回读，当时共 104 款公开模型，其中上述四款 GPT 文本模型用于本启动器预设；当时公开目录没有 `gpt-5.5`。这个数字和结论是历史快照，不能用于判断以后线上是否新增模型。

图片和视频采用各自接口，不直接加入 Codex 文本模型菜单。下一次增删模型时需重新核对线上公开目录、文本及工具调用能力、Responses 兼容性和用户分组可见性。

### 关键实现位置

| 文件 | 作用 |
| --- | --- |
| [canvaspro.ts](../../apps/codex-plus-manager/src/canvaspro.ts) | 供应商常量、模型预设、Key 校验、配置复用、保存后启动 |
| [canvaspro.test.ts](../../apps/codex-plus-manager/src/canvaspro.test.ts) | 前端接入逻辑测试 |
| [App.tsx](../../apps/codex-plus-manager/src/App.tsx) | 首页接入面板和实际保存 / 启动调用 |
| [presets.ts](../../apps/codex-plus-manager/src/presets.ts) | 供应商预设入口 |
| [i18n-en.ts](../../apps/codex-plus-manager/src/i18n-en.ts) | CanvasPro 英文文案 |
| [settings.rs](../../crates/codex-plus-core/src/settings.rs) | Rust 默认配置、旧配置兼容及覆盖保护 |
| [canvaspro_defaults.rs](../../crates/codex-plus-core/tests/canvaspro_defaults.rs) | 四项临时目录内的真实配置集成测试 |
| [Windows NSIS 脚本](../../scripts/installer/windows/CodexPlusPlus.nsi) | Windows 安装包和许可证资料 |
| [Mac 打包脚本](../../scripts/installer/macos/package-dmg.sh) | 双应用 DMG、ad-hoc 签名及附带资料 |
| [发布工作流](../../.github/workflows/release-assets.yml) | 按标签构建、保留已有附件、发布及 latest.json |

### 验证结果与边界

| 验证 | 当次结果 | 范围 |
| --- | --- | --- |
| 前端自动测试 | 317 通过，0 失败 | 最终构建清单记录；不以早期对话中的计数替代 |
| TypeScript / Vite | 通过 | 类型检查、生产构建 |
| Rust 工作区 | 1693 通过，7 忽略，1 单独跳过 | 上游 Windows 符号链接测试缺少权限，错误 1314 |
| 新增 Rust 集成 | 4 项通过 | 新安装无 Key、旧供应商保留、Responses 配置和认证文件生成、防止覆盖多供应商 |
| 浏览器接入流程 | 通过 | 生产前端 + 本地模拟 Tauri IPC；覆盖空 Key、格式错误、失败不启动、模型选择、保存后启动及密钥复用 |
| Windows 发布构建 | 通过 | Rust release、NSIS、解包和 EXE / 附带文档的 SHA-256 核对 |
| 两种 Mac 架构 | 均通过 | 原生 release 构建、各 4 项配置测试、架构检查、严格签名检查和 DMG 完整性 |

最终 Windows Rust 命令为 `cargo test --workspace --locked -- --skip app_paths_resolves_portable_current_link_to_directory_version`；没有改写该上游测试或隐藏跳过原因。后续有符号链接权限的环境应运行完整测试。

未在用户日常机器执行安装器或完成官方 Codex 真机端到端联调；未使用真实 API Key 发出付费模型请求。构建和模拟通过不等于已验收实际模型调用。

上游翻译校验存在旧键缺失 / 残留，未在本次扩大修复；新增 CanvasPro 文案已提供中英文。

## 2026-10-02：构建与 GitHub 发布

公开发布：[v1.5.0-canvaspro.1](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/releases/tag/v1.5.0-canvaspro.1)。

Windows 使用 Node 24.14.1、Rust 1.99.0 stable MSVC、现有 Visual Studio Build Tools 2026 / Windows SDK 和 NSIS 3.12；依赖安装获用户授权，未修改依赖清单及锁文件。

Mac 使用 GitHub Actions：Apple Silicon 为 `macos-14` / `aarch64-apple-darwin`，Intel 为 `macos-15-intel` / `x86_64-apple-darwin`；构建清单分别记录 macOS 14.8.9、15.7.9 和 Rust 1.99.0。

第一次 Mac 构建中，新增的 `lipo` 校验参数顺序写反，编译、配置测试和签名已通过，但架构校验失败。修正为 `lipo <binary> -verify_arch <arch>` 后重跑，两种架构成功：[Actions 36994204976](https://github.com/Namm-star/CanvasPro-CodexPlusPlus/actions/runs/36994204976)。没有通过删掉检查来绕过失败。

| 主要附件 | 字节数 | SHA-256 |
| --- | --- | --- |
| Windows x64 setup.exe | 24896080 | `de89dc5c1a624f2e4cb94c43e6138a2253f81026cd5c48f7b875c7d1d1c45d10` |
| macOS arm64.dmg | 37847247 | `705d9876197d217831836dad4e0a48c58102d5b9166a10d83722201cc15b0a2d` |
| macOS x64.dmg | 39109584 | `38d8670c9510bfda4cf0e3aada28c451f2c19847c61ac682d1ee6ac8d8210f5d` |
| source.zip | 22535162 | `66600dfc0a3528fccb74fd19d6649d0ac8a0777084fc16fb6ac2eead5147ddb4` |

完整文件名、各架构 ZIP、构建清单及校验文件见 [发布基线 JSON](releases/v1.5.0-canvaspro.1.provenance.json)。2026-10-05 重新回读 GitHub，发布非草稿、非预发布，以上摘要与公开附件一致。

安装包包含原作者署名、LICENSE、THIRD_PARTY_NOTICES 和使用说明，Mac 的应用 Resources 及 DMG 根目录包含版权资料。Mac 当前为 ad-hoc 签名，未经过 Apple 公证；没有完成 Developer ID 分发签名或真机安装验收。

GitHub 连接插件与本机 Git / `gh` 登录是不同的授权链路。此次用户完成 GitHub CLI 设备授权后，使用其 `Namm-star` 账号创建公开仓库、推送源码并上传附件；未向原仓库推送或提交 PR。

当时 Actions 列表曾返回空，但直接读取 run ID 可确认状态；不能仅凭列表没有条目判断构建未发生。早期本地 Windows 发布确认中 `macosInstallerAvailable=false` 属于 Mac 尚未发布时的记录，已由最终 Mac 清单及本次 GitHub 回读补全。

## 2026-10-04：使用说明与售后入口

按用户要求修改中英文 README 和 `docs/CANVASPRO.md`：

- 移除原版 QQ、微信、Telegram 和其他交流链接，采用用户提供的「无限画布售后服务群」二维码。
- 移除上游赞助商展示内容；原作者署名、项目来源、版权和许可证继续保留。
- 补全统一账号注册登录、共享钱包余额、创建及复制完整 API Key、配额和限制、客户端填写、模型选择、保存启动、密钥复用和常见错误处理。
- 核对线上 `/api/canvaspro/sso/config` 与前端公开代码：注册跳转 `https://canvasproai.com`，API 站使用统一登录。教程中的按钮名称依据当时线上版本。
- 同步 GitHub Release 正文及 `latest.json`；没有改动安装包、源码 ZIP 或发布标签。
- 检查 21 个本地文档 / 图片引用，核对 GitHub README 渲染内容及二维码公开链接 HTTP 200。

二维码文件为 [canvaspro-support-group-20261004.png](../images/canvaspro-support-group-20261004.png)，保留用户原图。截图标注有效期至 10 月 11 日；后续更换时更新图片和日期，不把旧图描述为永久有效。

## 2026-10-05：维护资料归档与已知待办

本次新增本开发记录、维护手册、公开发布基线 JSON，并在 README、使用文档和 AGENTS.md 加入维护入口。AI CanvasPro 主项目保留单独的交接索引；桌面工具的规范记录以本仓库为准。

按当前源码审阅发现的下一版事项：

| 优先级 | 事项 | 依据和验收目标 |
| --- | --- | --- |
| 高 | 自动更新源仍指向上游 | `update.rs` 的 `DEFAULT_REPOSITORY` / `DEFAULT_LATEST_JSON_URL` 仍为 BigPizzaV3；需改为定制版并验证取数、包选择、更新安装，防止上游更新替换定制功能 |
| 高 | 定制后缀不参与版本比较 | `parse_version_tag` 只解析前导数字；仅从 `canvaspro.1` 改为 `.2` 不会被视为新版本。下一版需递增数字版本并统一应用 / 安装包版本，或实现并验证新的比较策略 |
| 中 | “关于”页项目和反馈链接仍为原版 | `App.tsx` 中相关链接尚未切换。署名与上游生态市场可保留，但定制版反馈应指向本仓库 |
| 中 | 缺少真机联调记录 | 分别记录 Windows、Apple Silicon / 可支持的 Intel 环境的官方 Codex 版本、安装、启动、旧配置迁移及实际调用结果；付费请求单独明确范围 |
| 中 | Mac 正式签名和公证 | 当前只有 ad-hoc；如需正式分发，另行准备 Developer ID 和公证流程 |
| 持续 | 模型、售后二维码、教程同步 | 每次迭代重新核对公开模型和页面流程，记录核对日期；定期在实际维护时检查二维码有效性 |

上述事项是已记录的待办，本次文档归档没有修改应用更新逻辑或重新生成安装包。

## 后续迭代记录格式

每次变更追加：日期、用户目标、起始提交、实现提交、变更文件与行为、兼容性处理、测试命令与结果、遗漏 / 跳过原因、发布标签和源码提交、构建工作流提交 / run ID、附件校验、用户可见限制、回退方法和剩余待办。

发布证据应保存在版本控制内的文档和安全的清单中。`.zcode/`、`dist/`、本机日志及 Actions 临时产物用于工作过程，不能作为唯一长期依据；不得归档真实 Key、凭据文件、登录令牌或带授权参数的临时下载 URL。
