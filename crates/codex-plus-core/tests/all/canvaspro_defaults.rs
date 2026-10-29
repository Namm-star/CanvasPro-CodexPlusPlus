use codex_plus_core::relay_config::{
    apply_relay_profile_to_home_with_switch_rules, normalize_relay_profile_for_storage,
    relay_config_status_from_home,
};
use codex_plus_core::settings::{
    BackendSettings, CANVASPRO_BASE_URL, CANVASPRO_DEFAULT_MODEL, CANVASPRO_MODELS,
    RelayMode, RelayProfile, SettingsStore, canvaspro_default_profile, is_default_single_profile,
};

#[test]
fn local_config_import_keeps_the_new_canvaspro_default_selected() {
    let temp = tempfile::tempdir().unwrap();
    let store = SettingsStore::new(temp.path().join("settings.json"));
    let settings = codex_plus_core::provider_import::initialize_local_config_provider(
        &store, temp.path(),
    ).unwrap();
    let active = settings.active_relay_profile();
    assert_eq!(active.name, "CanvasPro New API");
    assert_eq!(active.base_url, CANVASPRO_BASE_URL);
    assert!(active.api_key.is_empty());
    assert_eq!(settings.relay_profiles.len(), 2);
    assert!(settings.relay_profiles.iter().any(|profile|
        profile.name == "系统默认" && profile.relay_mode == RelayMode::Official));
    assert!(!temp.path().join("config.toml").exists());
    assert!(!temp.path().join("auth.json").exists());
}

#[test]
fn local_config_import_preserves_a_saved_canvaspro_key_and_selection() {
    let temp = tempfile::tempdir().unwrap();
    let store = SettingsStore::new(temp.path().join("settings.json"));
    let mut profile = canvaspro_default_profile();
    profile.api_key = "sk-local-fixture".to_string();
    normalize_relay_profile_for_storage(&mut profile).unwrap();
    apply_relay_profile_to_home_with_switch_rules(temp.path(), &profile, "").unwrap();
    store.save(&BackendSettings {
        active_relay_id: profile.id.clone(),
        relay_profiles: vec![profile.clone()],
        ..BackendSettings::default()
    }).unwrap();
    let config_before = std::fs::read(temp.path().join("config.toml")).unwrap();
    let auth_before = std::fs::read(temp.path().join("auth.json")).unwrap();
    let settings = codex_plus_core::provider_import::initialize_local_config_provider(
        &store, temp.path(),
    ).unwrap();
    let active = settings.active_relay_profile();
    assert_eq!(settings.active_relay_id, profile.id);
    assert_eq!(active.name, profile.name);
    assert_eq!(active.base_url, CANVASPRO_BASE_URL);
    assert_eq!(active.api_key, "sk-local-fixture");
    assert_eq!(std::fs::read(temp.path().join("config.toml")).unwrap(), config_before);
    assert_eq!(std::fs::read(temp.path().join("auth.json")).unwrap(), auth_before);
}

#[test]
fn new_install_uses_canvaspro_without_embedded_credentials() {
    let temp = tempfile::tempdir().unwrap();
    let store = SettingsStore::new(temp.path().join("settings.json"));
    let settings = store.load().unwrap();
    let profile = settings.active_relay_profile();
    assert_eq!(profile, canvaspro_default_profile());
    assert_eq!(profile.relay_mode, RelayMode::PureApi);
    assert_eq!(profile.base_url, CANVASPRO_BASE_URL);
    assert_eq!(profile.model, CANVASPRO_DEFAULT_MODEL);
    assert_eq!(profile.model_list, CANVASPRO_MODELS);
    assert!(profile.api_key.is_empty());
    assert!(profile.auth_contents.is_empty());
    assert!(!temp.path().join("settings.json").exists());
}

#[test]
fn saved_providers_and_legacy_defaults_keep_their_original_behavior() {
    let temp = tempfile::tempdir().unwrap();
    let path = temp.path().join("settings.json");
    std::fs::write(&path, r#"{"activeRelayId":"existing","relayProfiles":[{"id":"existing","name":"My provider","baseUrl":"https://other.example/v1","relayMode":"pureApi","apiKey":"local-fixture"}]}"#).unwrap();
    let settings = SettingsStore::new(path).load().unwrap();
    assert_eq!(settings.relay_profiles.len(), 1);
    assert_eq!(settings.active_relay_profile().name, "My provider");
    assert_eq!(settings.active_relay_profile().base_url, "https://other.example/v1");
    assert_eq!(RelayProfile::default().relay_mode, RelayMode::Official);
    assert!(is_default_single_profile(&[RelayProfile::default()]));
    assert!(is_default_single_profile(&[canvaspro_default_profile()]));
}

#[test]
fn key_only_setup_writes_canvaspro_responses_config_in_an_isolated_home() {
    let temp = tempfile::tempdir().unwrap();
    let mut profile = canvaspro_default_profile();
    profile.api_key = "sk-local-fixture".to_string();
    normalize_relay_profile_for_storage(&mut profile).unwrap();
    apply_relay_profile_to_home_with_switch_rules(temp.path(), &profile, "").unwrap();
    let config = std::fs::read_to_string(temp.path().join("config.toml")).unwrap();
    assert!(config.contains(r#"base_url = "https://api.canvasproai.com/v1""#));
    assert!(config.contains(r#"wire_api = "responses""#));
    assert!(config.contains(r#"model = "gpt-6.1-sol""#));
    assert!(!config.contains("jojocode.com"));
    // 新版 Codex 的 Pure API 供应商不再借用 auth.json，必须显式携带本机 Key。
    let document = config.parse::<toml_edit::DocumentMut>().unwrap();
    let provider_id = document["model_provider"].as_str().unwrap();
    assert_eq!(
        document["model_providers"][provider_id]["experimental_bearer_token"].as_str(),
        Some("sk-local-fixture")
    );
    let auth: serde_json::Value = serde_json::from_str(
        &std::fs::read_to_string(temp.path().join("auth.json")).unwrap(),
    ).unwrap();
    assert_eq!(auth["OPENAI_API_KEY"], "sk-local-fixture");
    assert!(relay_config_status_from_home(temp.path()).configured);
}

#[test]
fn fresh_defaults_cannot_overwrite_multiple_existing_providers() {
    let temp = tempfile::tempdir().unwrap();
    let path = temp.path().join("settings.json");
    let original = r#"{"activeRelayId":"a","relayProfiles":[{"id":"a","name":"A"},{"id":"b","name":"B"}]}"#;
    std::fs::write(&path, original).unwrap();
    let store = SettingsStore::new(path.clone());
    assert!(store.save(&BackendSettings::default()).is_err());
    assert_eq!(std::fs::read_to_string(path).unwrap(), original);
}

#[test]
fn preferences_saved_before_entering_a_key_preserve_the_canvaspro_endpoint() {
    let temp = tempfile::tempdir().unwrap();
    let store = SettingsStore::new(temp.path().join("settings.json"));
    store.update(serde_json::json!({"codexAppSessionShare": false})).unwrap();
    let profile = store.load().unwrap().active_relay_profile();
    assert_eq!(profile.base_url, CANVASPRO_BASE_URL);
    assert_eq!(profile.upstream_base_url, CANVASPRO_BASE_URL);
    assert_eq!(profile.model, CANVASPRO_DEFAULT_MODEL);
    assert!(profile.api_key.is_empty());
    assert!(profile.config_contents.contains(CANVASPRO_BASE_URL));
    assert!(!profile.config_contents.contains("experimental_bearer_token"));
    assert!(!temp.path().join("config.toml").exists());
    assert!(!temp.path().join("auth.json").exists());
}
