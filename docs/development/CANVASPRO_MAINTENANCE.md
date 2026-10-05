# CanvasPro Codex++ 后续开发与发布手册

更新日期：2026-10-05。适用于 CanvasPro 定制客户端。历史事实见 [开发记录](CANVASPRO_HISTORY.md)，用户教程见 [CANVASPRO.md](../CANVASPRO.md)。

## 接手时确认基线

先读根目录 AGENTS.md、本手册及开发记录，再执行只读检查：

```powershell
git status --short
git branch --show-current
git remote -v
git log -8 --oneline
git show --no-patch 'v1.5.0-canvaspro.1^{commit}'
```

`origin` 应为 `Namm-star/CanvasPro-CodexPlusPlus`，`upstream` 为 `BigPizzaV3/CodexPlusPlus`。安装包以对应 release tag 和构建清单的 `sourceCommit` 为准；开发分支可能含后续 CI 和文档变更，不能把最新 README 当作所有已安装二进制的源码。

用户的旧供应商、Key、Codex 登录和会话数据都需保留。开发应使用临时目录及模拟密钥，避免把日常 `~/.codex` 当测试目录；真实 `auth.json`、含凭据的 `config.toml` 和 `.env` 不纳入记录。

新迭代分支使用 `codex/` 前缀。同步上游时先查看具体提交和差异，在迭代分支合并或挑选变更，并重新验收定制功能；已发布标签保持原有指向，共享分支历史不通过强推重写。

## 修改供应商与模型

1. 按任务重新回读本站公开模型目录，记录日期、型号、文本与工具调用能力、Responses 兼容性及用户分组限制。2026-10-02 的四款模型是首发历史快照，不是以后所有型号的清单。
2. 同时检查前端 `canvaspro.ts` 与后端 `settings.rs`，保持 Base URL、默认型号、列表和 Pure API 模式一致；同步前端测试和 Rust `canvaspro_defaults`。
3. 首页空 Key 不调用模型，格式校验不把真实 Key 输出到错误或日志；复用保存密钥、旧供应商和保存失败不启动等行为须继续验证。
4. 文本模型预设与图片 / 视频接口分开处理；增加图片视频能力需要单独设计客户端协议及交互，不能只加入文本模型菜单。
5. 本仓库的模型预设更新不等于服务端渠道或价格更新。线上 New API、画布共享钱包的改动应按各自项目流程进行并分别留档。

## 更新源与版本

首发尚未完成定制版自动更新切换：`crates/codex-plus-core/src/update.rs` 的仓库和 `latest.json` 常量仍指向上游。下一版应优先修正并验证；定制仓库已有 `latest.json` 并不代表当前客户端已读取它。

当前版本比较只读数字前缀。若继续使用现有实现，下一版应增加数字版本，例如从 `1.5.0` 到 `1.5.1`；只变更 `canvaspro.1` → `canvaspro.2` 不会触发更新。此例不是已经创建的新版本。

需要统一核对的版本位置：

- 根目录 `Cargo.toml` 的 `[workspace.package].version` 及相应锁文件。
- `apps/codex-plus-manager/package.json` 及相应锁文件。
- `apps/codex-plus-manager/src-tauri/tauri.conf.json`。
- Release tag、安装器 `VERSION`、附件命名、构建清单和 `latest.json`。

同时验收定制文件名下的 Windows / Mac 架构包选择、下载及安装流程，并修正“关于”页反馈入口。版本文件和锁文件只在该次迭代确实需要时修改。

## 开发验证

使用仓库锁定依赖及已配置工具链；安装额外工具遵循 AGENTS.md 和用户已有授权。以下为命令入口，测试数以该次实际输出为准：

```powershell
Push-Location apps/codex-plus-manager
npm ci --no-audit --no-fund
npm test
npm run check
npm run vite:build
Pop-Location

cargo test -p codex-plus-core --test canvaspro_defaults --locked
cargo test --workspace --locked
cargo build --release --locked
```

首发的 Windows 环境因符号链接权限不足，只跳过了 `app_paths_resolves_portable_current_link_to_directory_version`。新环境先运行完整测试；如出现同一环境问题，记录错误、影响和明确跳过项，不把首发跳过永久写成默认验收条件。

前端真实构建配合本地模拟 Tauri IPC，应覆盖：首次输入、空 Key、格式错误、已有密钥复用、四款或更新后所有预设选择、保存失败不启动、成功后启动，以及多供应商旧配置保护。

代码编译和模拟验证完成后，再按该次范围做真机安装与官方 Codex 联调。记录官方应用版本、操作系统、配置迁移、实际请求和结果；付费模型调用与模拟测试分别记录，不把构建通过写成端到端通过。

## 构建与发布

Windows 的历史可用工具链为 Node 24、Rust stable MSVC、Visual Studio Build Tools / Windows SDK、NSIS；Mac 在对应架构的 GitHub macOS runner 原生构建。实际版本按当次清单记录。

Windows 先完成 Vite 前端和 Rust release 编译，再按现有 NSIS 脚本的 `VERSION` 打包，解包核对两份 EXE、使用说明及许可证资料。创建当前已提交源码的 ZIP，不把含未提交改动的目录直接压缩为“对应源码”。

正式发布需要核对：

1. 变更已提交，确定新的数字应用版本、发布标签和不可混淆的源码提交；完成相关测试并在 `docs/releases/` 写本次说明。
2. 新建该版本的 tag / GitHub Release，使用当前 `release-assets.yml` 构建其源码。缺少自动触发时，可对已有标签手动运行工作流：

```powershell
# 示例值，使用时替换为这次真实创建的版本标签。
gh workflow run release-assets.yml --repo Namm-star/CanvasPro-CodexPlusPlus --ref main -f tag=v1.5.1-canvaspro.1
```

3. 记录工作流定义提交和实际 checkout 的源码提交。以两个 Mac job 及最终 metadata job 的结果为准；保存具体 run URL。首发成功 run 为 `36994204976`，不是以后版本的测试证明。
4. 现有工作流会保留已有 Windows setup；两种 Mac DMG 都存在时跳过 Mac。只补齐缺失架构时当前会重跑两种 Mac，需核对附件和清单。修改已有发布版本的代码应创建新版本，不能以补包名义重指旧 tag 或混入另一份源码。
5. Mac 核对 `lipo <binary> -verify_arch <arch>`、两应用的 plist / 可执行文件 / 版权资料、严格 codesign 验证和 `hdiutil verify`。ad-hoc 签名与 Apple 公证分别记录；当前流程只做前者。
6. 每个平台生成 sourceCommit、工具链、架构、测试状态和 SHA-256 清单；Windows 未来 CI 自动发布的清单仍需补齐或明确人工产出，不能直接复制旧版本清单。CI 的 ZIP 和 DMG 也逐一记录。
7. 上传安装包、对应完整源码、构建清单及校验文件，再核对 GitHub 附件 digest、大小和实际下载。源码 ZIP 与所有二进制对应同一源码提交。
8. `latest.json` 中的 version、body、下载 URL 和附件与 Release 一致；单独更新 Release 正文后也更新 metadata。其摘要随文档变化，是可变发布资料，不应与安装包的固定摘要混淆。
9. 更新开发记录与本版 provenance；用户能下载和读到说明后再报告发布完成。

`.github/workflows/pr-build.yml` 在主分支 push 时也可能运行构建，产物是开发验收附件，不能替代带标签的正式 Release。文档变更本身只需文档与引用检查，无需重新生成已发布安装包。

## 教程、支持与版权

中英文 README、`docs/CANVASPRO.md`、Release 正文和 `latest.json` 中的用户步骤应一致。统一账号注册 / 登录、密钥页按钮、钱包扣费和模型权限说明需按当次实际页面核对。

交流入口使用 CanvasPro「无限画布售后服务群」；二维码有有效期，维护时更换原图并更新日期。用户反馈入口指向定制仓库。上游作者、许可证和第三方声明继续保留，赞助商展示与使用支持入口不沿用原版。

安装包必须保留对应署名及许可文件，并提供对应源码。原项目脚本 / 皮肤市场链接属于已有生态依赖，不能与定制版更新源、作者署名或售后链接混为一类后批量替换。

## 回退与记录

应用逻辑出现回归时，在开发分支回退具体变更并重跑相应测试；部署给用户的修复使用递增的新数字版本。急需恢复旧行为时可从已核验的首发 tag 重建，保留原源码对应关系。

切换旧安装包前备份用户设置，检查配置兼容，不通过清空 Key、登录状态或会话数据实现回退。服务端 New API 的回退独立于本客户端。

每次迭代追加历史条目及公开安全的构建证据。记录结果、例外和未验收项目；不发布真实密钥、凭据内容或带授权参数的临时 URL。
