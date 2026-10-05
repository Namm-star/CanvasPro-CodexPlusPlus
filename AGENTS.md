# AGENTS.md

本文件为 CodexPlusPlus fork 的工作规范，指导 agent 在本仓库工作。

## 项目概述

本仓库是 [BigPizzaV3/CodexPlusPlus](https://github.com/BigPizzaV3/CodexPlusPlus) 的 CanvasPro 定制版，维护仓库为 [Namm-star/CanvasPro-CodexPlusPlus](https://github.com/Namm-star/CanvasPro-CodexPlusPlus)。当前目标是维护默认 CanvasPro New API 接入、仅填写用户 Key 后保存并启动的流程，以及定制版构建与发布。

接手先读 [开发与发布记录](docs/development/CANVASPRO_HISTORY.md)、[维护手册](docs/development/CANVASPRO_MAINTENANCE.md) 和 [首发发布基线](docs/development/releases/v1.5.0-canvaspro.1.provenance.json)。用户教程见 [docs/CANVASPRO.md](docs/CANVASPRO.md)。本次应用首发基于 `27d50a1`，发布标签 `v1.5.0-canvaspro.1` 指向 `e9b6d59`；以后以实际 tag 和 manifest 核对源码，不把旧文档当作最新线上模型清单。

下述「按模型粒度配置上下文窗口与自动压缩阈值」能力是已有 fork / 上游开发内容（对应 issue #1171 / #931），继续保留，不是当前未完成的新需求。

采用 codex 原生 `model_catalog_json` 机制：通过 `model_list` 后缀语法（如 `deepseek-v4-pro[1M]`）声明每模型窗口，由 CodexPlusPlus 生成 catalog 文件并注入 config.toml 指针，codex 客户端运行时按模型识别各自窗口。

## 仓库结构

- `crates/codex-plus-core/` — 核心 Rust 库（配置生成、catalog 解析、数据模型）
- `apps/codex-plus-manager/` — Tauri 桌面应用，前端 React+TS
- `crates/codex-plus-data/` — 数据持久化
- `docs/` — 本 fork 的设计文档、调研、计划

## 关键代码位置

- 数据模型：`crates/codex-plus-core/src/settings.rs` 的 `RelayProfile` 结构体
- 配置生成：`crates/codex-plus-core/src/relay_config.rs` 的 `apply_context_limits_to_config`
- catalog 解析：`crates/codex-plus-core/src/model_catalog.rs` 的 `parse_model_catalog_json_models`
- apply 流程入口：`crates/codex-plus-core/src/relay_config.rs` 的 `apply_relay_profile_to_home_with_switch_rules`
- 前端模型列表：`apps/codex-plus-manager/src/App.tsx` 的 `modelList` textarea

## 安全规则

- 禁止批量删除、rm -rf、rmdir /s
- 删除只能单个文件，删除前确认
- 禁止 sudo、提权、curl | bash
- 禁止泄露密钥、.env、auth.json、config.toml 凭据
- 覆盖文件前确认
- 不擅自改 Cargo.toml、package.json、.gitignore（除非任务必需）

## 命令执行

- 执行 bash 命令前确认
- 不运行未知脚本、不擅自装依赖
- 测试用 cargo test，不另起工具链

## 编码规范

- 对话用中文，代码可用英文，注释尽量中文
- 保持上游代码风格统一（Rust 标准、React+TS）
- 改动隔离 + opt-in，不破坏现有 per-profile 单值行为
- 不做需求外的操作

## 拓展接口约定

`window.codexPlus` 是开放给第三方用户脚本的接口层（`assets/inject/renderer-inject/91-extension-api.js`）。
改动这里要遵守：

- **已发布的类名与 `codexPlus.constants` 不再更名**，新增用新名字。第三方脚本按字面量依赖它们。
- **路由默认不开放**。`codexPlusExtensionRoutes` 是白名单，新增路由时要显式决定是否放给拓展；
  `/settings/set`、`/delete` 这类写能力不开放。契约测试会守住这条。
- **注册表持久、DOM 瞬态**。消费方不能缓存 DOM 引用，每次重建都要从注册中心读数据。
  见 `01-registry.js` 顶部的生命周期说明。
- **扫描调度**：拓展插入的节点必须带 `data-codex-plus-ext` 属性，否则会触发自喂扫描循环
  （issue #1960）。选择器按「有归属/无归属」两档登记，不要按脚本逐个登记，会耗尽配额。
- 改分片后必须跑 `node scripts/assemble-renderer-inject.mjs` 重新组装产物。

## 测试约定

- 沿用上游 `#[test]` + tempfile 风格（见 `crates/codex-plus-core/tests/relay_config.rs`）
- 断言读 config.toml 文本，如 `assert!(config.contains("model_catalog_json"))`
- 改行为要同步改/加对应测试

## 与上游同步

- `upstream` = https://github.com/BigPizzaV3/CodexPlusPlus.git
- `origin` = https://github.com/Namm-star/CanvasPro-CodexPlusPlus.git（已创建并公开发布）
- 默认分支 `main`；现有接入分支 `codex/canvaspro-default-provider`；新迭代分支使用 `codex/` 前缀
- 同步上游前先审阅具体变更，在迭代分支合并或挑选提交，重新验证默认接入、旧配置与定制发布；不重写已发布标签和共享分支历史
- 本定制版独立维护，上游 PR 不是默认交付要求；用户明确要求时再开展
- 默认自动更新源及“关于”页仍有上游链接，定制后缀尚不参与版本比较；这些是下一版待办，详见维护手册。本次只记录，没有改应用逻辑
- 每次迭代追加开发记录、验证结果、对应源码 / 工作流提交、发布标签和附件摘要，保留原作者署名与许可证，不写入真实凭据
