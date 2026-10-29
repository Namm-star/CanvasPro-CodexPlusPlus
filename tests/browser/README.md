# CanvasPro 首页交互烟测

先在 `apps/codex-plus-manager` 完成 `npm ci`、`npm run check`、`npm run vite:build`，再从仓库根目录运行：

```powershell
node tests/browser/canvaspro-onboarding.mjs
```

该可选开发检查需要当前环境可导入 Playwright，使用已有浏览器；不把它作为用户运行应用的依赖。如 Playwright 位于外部工具目录，可通过 `CANVASPRO_PLAYWRIGHT_MODULE` 指定其模块 URL，`CANVASPRO_BROWSER_EXECUTABLE` 指定已安装 Chromium / Chrome 的绝对路径。没有这些工具时先按项目规范配置开发环境，不更改用户日常浏览器资料。

脚本启动随机回环端口，加载真实生产前端，注入本地 Tauri 假实现并阻止外网请求；只使用虚构密钥，不会启动官方 Codex 或发出付费请求。报告与截图写入 `.zcode/`。

覆盖空 Key、粘贴请求头、保存失败不启动、失败后重试、选择模型、保存成功后启动、保存后复用密钥和 JavaScript 错误检查。该检查曾发现 actions 未依赖 `relaySwitching`，导致失败后重试被旧闭包拦截；不能用只测独立 helper 替代整个交互流程。

v2.1.1 使用默认网关总览里的本站入口和 `AppSelect` 的按钮 / 选项交互。fixture 关闭首次引导（引导有上游专门测试），模拟带时间戳且已确认成功的启动状态；旧版 `launchStartedAtMs: null` 在新版并不代表启动成功。原生进程检查与这里的模拟 IPC 交互分别记录。
