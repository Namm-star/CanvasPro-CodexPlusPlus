// 仅供本地浏览器验证：模拟 Tauri IPC，不调用原生进程或模型接口。
window.__fixtureCalls = [];
window.__fixtureErrors = [];
// 引导关闭后的接入流程；引导自身由上游独立测试覆盖。
window.localStorage.setItem("codex-plus-plus.onboarding", "1");
window.addEventListener("error", (event) => window.__fixtureErrors.push(event.message));
window.addEventListener("unhandledrejection", (event) => window.__fixtureErrors.push(String(event.reason)));
let fixtureSettings = {
  activeRelayId: "default", activeTool: "codex", tools: {}, relayProfilesEnabled: true,
  relayProfiles: [{ id: "default", name: "CanvasPro New API", model: "gpt-6.1-sol",
    baseUrl: "https://api.canvasproai.com/v1", upstreamBaseUrl: "https://api.canvasproai.com/v1",
    apiKey: "", protocol: "responses", relayMode: "pureApi", modelList: "gpt-6.1-sol\ngpt-6-sol\ngpt-6-astra\ngpt-5.6-sol",
    configContents: "", authContents: "" }],
};
const fixtureScripts = { scripts: [] };
const fixtureResult = () => ({ status: "ok", message: "本地模拟", settings: fixtureSettings,
  settings_path: "mock/settings.json", settingsPath: "mock/settings.json", user_scripts: fixtureScripts });
let callbackId = 0;
window.__TAURI_INTERNALS__ = {
  transformCallback: () => ++callbackId,
  unregisterCallback: () => {},
  convertFileSrc: (value) => value,
  invoke: async (command, args = {}) => {
    window.__fixtureCalls.push(command);
    if (command === "plugin:event|listen") return ++callbackId;
    if (command === "load_settings") return fixtureResult();
    if (command === "save_settings") {
      fixtureSettings = args.settings ?? args.request?.settings ?? fixtureSettings;
      return fixtureResult();
    }
    if (command === "list_tools") return { status: "ok", activeTool: "codex",
      tools: [{ id: "codex", name: "Codex", switchable: true }] };
    if (command === "load_overview") return { status: "ok", codex_version: "模拟版本",
      codex_app: { status: "found", path: "模拟应用" }, silent_shortcut: { status: "installed", path: "模拟入口" },
      management_shortcut: { status: "installed", path: "模拟入口" },
      latest_launch: window.__fixtureStartedAt ? { status: "running", message: "模拟启动成功", started_at_ms: window.__fixtureStartedAt } : null };
    if (command === "load_relay_files") return { status: "ok", configContents: "", authContents: "" };
    if (command === "switch_relay_profile") {
      if (window.__fixtureSwitchFailure) return { ...fixtureResult(), status: "failed", message: "模拟写入失败", relay: {} };
      fixtureSettings = args.request.settings;
      const profile = fixtureSettings.relayProfiles.find((item) => item.id === fixtureSettings.activeRelayId);
      window.__fixtureApplied = { baseUrl: profile.baseUrl, protocol: profile.protocol, model: profile.model,
        modelList: profile.modelList, relayMode: profile.relayMode,
        configContents: profile.configContents, hasKey: !!profile.apiKey };
      return { ...fixtureResult(), relay: { configured: true } };
    }
    if (command === "launch_codex_plus") {
      window.__fixtureStartedAt = Date.now();
      return { status: "ok", message: "模拟启动", launchStartedAtMs: window.__fixtureStartedAt };
    }
    return null;
  },
};
