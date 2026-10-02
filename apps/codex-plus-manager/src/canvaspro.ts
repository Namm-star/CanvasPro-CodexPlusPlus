/** CanvasPro 当前公开的文本型号；图片和视频使用专用异步协议，不放入 Codex 菜单。 */
export const CANVASPRO_PROFILE_ID = "canvaspro";
export const CANVASPRO_PRESET = {
  id: CANVASPRO_PROFILE_ID,
  name: "CanvasPro New API",
  websiteUrl: "https://api.canvasproai.com",
  apiKeyUrl: "https://api.canvasproai.com/keys",
  category: "aggregator" as const,
  baseUrl: "https://api.canvasproai.com/v1",
  protocol: "responses" as const,
  model: "gpt-6.1-sol",
  modelList: ["gpt-6.1-sol", "gpt-6-sol", "gpt-6-astra", "gpt-5.6-sol"],
};

export function canvasProKeyError(apiKey: string): "missingKey" | "invalidKey" | null {
  const key = apiKey.trim();
  if (!key) return "missingKey";
  // 不约束供应商 Key 的前缀，但禁止把多行内容或 Bearer 请求头粘贴为密钥。
  if (/\s/.test(key)) return "invalidKey";
  return null;
}

export function canvasProSetupKey(input: string, savedKey = ""): string {
  return input.trim() || savedKey.trim();
}

export function canvasProProfilePatch(apiKey: string, model = CANVASPRO_PRESET.model) {
  const error = canvasProKeyError(apiKey);
  if (error) throw new Error(error);
  if (!CANVASPRO_PRESET.modelList.includes(model)) throw new Error("unsupportedModel");
  return {
    name: CANVASPRO_PRESET.name,
    model,
    baseUrl: CANVASPRO_PRESET.baseUrl,
    upstreamBaseUrl: CANVASPRO_PRESET.baseUrl,
    apiKey: apiKey.trim(),
    protocol: CANVASPRO_PRESET.protocol,
    relayMode: "pureApi" as const,
    sessionProvider: "custom" as const,
    officialMixApiKey: false,
    noAuth: false,
    testModel: model,
    modelList: CANVASPRO_PRESET.modelList.join("\n"),
  };
}

export function canvasProProfileId(profiles: { id: string; baseUrl: string; relayMode: string }[]): string {
  const existing = profiles.find((profile) =>
    profile.baseUrl.replace(/\/+$/, "") === CANVASPRO_PRESET.baseUrl
      && profile.relayMode === "pureApi",
  );
  if (existing) return existing.id;
  const ids = new Set(profiles.map((profile) => profile.id));
  let id = CANVASPRO_PROFILE_ID;
  for (let suffix = 2; ids.has(id); suffix += 1) id = `${CANVASPRO_PROFILE_ID}-${suffix}`;
  return id;
}

/** 配置失败时禁止启动，避免用户以为已切换而继续使用原供应商。 */
export async function activateCanvasPro(
  apply: () => Promise<boolean>,
  launch: () => Promise<void>,
): Promise<boolean> {
  if (!await apply()) return false;
  await launch();
  return true;
}
