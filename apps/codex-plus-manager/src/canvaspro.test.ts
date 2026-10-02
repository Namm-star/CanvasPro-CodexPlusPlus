import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { activateCanvasPro, canvasProKeyError, canvasProProfileId, canvasProProfilePatch, canvasProSetupKey, CANVASPRO_PRESET } from "./canvaspro.ts";
import { PRESETS } from "./presets.ts";

describe("CanvasPro setup", () => {
  it("uses the CanvasPro Responses endpoint and current text catalog without credentials", () => {
    assert.equal(PRESETS[0], CANVASPRO_PRESET);
    const patch = canvasProProfilePatch("  sk-local-fixture  ");
    assert.equal(patch.apiKey, "sk-local-fixture");
    assert.equal(patch.baseUrl, "https://api.canvasproai.com/v1");
    assert.equal(patch.upstreamBaseUrl, patch.baseUrl);
    assert.equal(patch.protocol, "responses");
    assert.equal(patch.relayMode, "pureApi");
    assert.equal(patch.sessionProvider, "custom");
    assert.equal(patch.noAuth, false);
    assert.equal(patch.model, "gpt-6.1-sol");
    assert.deepEqual(patch.modelList.split("\n"), ["gpt-6.1-sol", "gpt-6-sol", "gpt-6-astra", "gpt-5.6-sol"]);
    assert.equal("apiKey" in CANVASPRO_PRESET, false);
  });

  it("rejects empty keys, pasted headers and multiline keys", () => {
    assert.equal(canvasProKeyError(" \n "), "missingKey");
    assert.equal(canvasProKeyError("Bearer sk-fixture"), "invalidKey");
    assert.equal(canvasProKeyError("first\nsecond"), "invalidKey");
    assert.equal(canvasProKeyError("single-key"), null);
    assert.throws(() => canvasProProfilePatch(""), /missingKey/);
    assert.throws(() => canvasProProfilePatch("key", "gpt-5.5"), /unsupportedModel/);
  });

  it("selects each supported model and preserves the exact upstream ID", () => {
    for (const model of CANVASPRO_PRESET.modelList) {
      const patch = canvasProProfilePatch("local-fixture", model);
      assert.equal(patch.model, model);
      assert.equal(patch.testModel, model);
    }
  });

  it("reuses the saved key on later launches and allows explicit key updates", () => {
    assert.equal(canvasProSetupKey("", "saved-fixture"), "saved-fixture");
    assert.equal(canvasProSetupKey("   ", "saved-fixture"), "saved-fixture");
    assert.equal(canvasProSetupKey(" new-fixture ", "saved-fixture"), "new-fixture");
    assert.equal(canvasProSetupKey(""), "");
    assert.equal(canvasProKeyError(canvasProSetupKey("Bearer wrong", "saved-fixture")), "invalidKey");
  });

  it("reuses a CanvasPro profile while leaving unrelated providers untouched", () => {
    const profiles = [{ id: "old", baseUrl: "https://other.example/v1", relayMode: "pureApi" },
      { id: "my-canvas", baseUrl: "https://api.canvasproai.com/v1/", relayMode: "pureApi" }];
    const before = structuredClone(profiles);
    assert.equal(canvasProProfileId(profiles), "my-canvas");
    assert.deepEqual(profiles, before);
    assert.equal(canvasProProfileId([profiles[0]]), "canvaspro");
  });

  it("avoids ID collisions with existing providers or official profiles", () => {
    assert.equal(canvasProProfileId([{ id: "canvaspro", baseUrl: "https://other.example", relayMode: "pureApi" },
      { id: "canvaspro-2", baseUrl: CANVASPRO_PRESET.baseUrl, relayMode: "official" }]), "canvaspro-3");
  });

  it("launches only after successful configuration", async () => {
    const events: string[] = [];
    assert.equal(await activateCanvasPro(async () => { events.push("apply"); return true; },
      async () => { events.push("launch"); }), true);
    assert.deepEqual(events, ["apply", "launch"]);
    events.length = 0;
    assert.equal(await activateCanvasPro(async () => { events.push("apply"); return false; },
      async () => { events.push("launch"); }), false);
    assert.deepEqual(events, ["apply"]);
  });

  it("does not launch when writing configuration throws", async () => {
    let launched = false;
    await assert.rejects(activateCanvasPro(async () => { throw new Error("fixture write failure"); },
      async () => { launched = true; }), /fixture write failure/);
    assert.equal(launched, false);
  });
});
