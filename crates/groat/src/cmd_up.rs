use axum::{
    extract::State,
    http::StatusCode,
    response::Json,
    routing::post,
    Router,
};
use clap::Args;
use groat_core::{ChatRequest, ChatResponse};
use groat_providers::{ollama::OllamaProvider, Provider};
use groat_storage::{Storage, requests::NewRequest};
use std::sync::Arc;
use std::time::Instant;
use std::path::PathBuf;
use tracing::info;

#[derive(Args)]
pub struct UpArgs {
    /// Port to listen on
    #[arg(long, default_value = "8787")]
    port: u16,

    /// Ollama base URL
    #[arg(long, default_value = "http://localhost:11434")]
    ollama_url: String,

    /// Path to the database file
    #[arg(long, default_value = "groat.db")]
    db_path: PathBuf,
}

struct AppState {
    provider: Arc<dyn Provider>,
    storage: Storage,
}

pub async fn run(args: UpArgs) {
    tracing_subscriber::fmt::init();

    let provider = OllamaProvider::new(&args.ollama_url);

    let storage = Storage::new(&args.db_path)
        .await
        .expect("failed to open database");

    let state = Arc::new(AppState {
        provider: Arc::new(provider),
        storage,
    });

    let app = Router::new()
        .route("/v1/chat/completions", post(chat_handler))
        .with_state(state);

    let addr = format!("0.0.0.0:{}", args.port);
    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();

    info!("groat listening on http://{}", addr);
    println!("groat listening on http://localhost:{}", args.port);

    axum::serve(listener, app).await.unwrap();
}

async fn chat_handler(
    State(state): State<Arc<AppState>>,
    Json(request): Json<ChatRequest>,
) -> Result<Json<ChatResponse>, (StatusCode, String)> {
    info!("→ {} — {} messages", request.model, request.messages.len());

    let start = Instant::now();

    let response = state
        .provider
        .chat(&request)
        .await
        .map_err(|e| (StatusCode::BAD_GATEWAY, e.to_string()))?;

    let latency_ms = start.elapsed().as_millis() as i64;

    let usage = response.usage.as_ref();
    let prompt_tokens = usage.map(|u| u.prompt_tokens as i64).unwrap_or(0);
    let completion_tokens = usage.map(|u| u.completion_tokens as i64).unwrap_or(0);

    info!("← {} tokens · {}ms", prompt_tokens + completion_tokens, latency_ms);

    // log to storage — fire and forget, don't fail the request if logging fails
    let storage = state.storage.clone();
    let model = request.model.clone();
    tokio::spawn(async move {
        let result = storage.insert_request(NewRequest {
            model: model.clone(),
            provider: "ollama".to_string(),
            prompt_tokens,
            completion_tokens,
            cost_usd: 0.0, // ollama is free — will be non-zero for OpenAI/Anthropic
            latency_ms,
            cache_hit: false,
            cache_similarity: None,
            routed_model: None,
            routing_reason: None,
            conversation_id: None,
            parent_request_id: None,
            system_prompt_hash: None,
        }).await;

        if let Err(e) = result {
            tracing::warn!("failed to log request: {}", e);
        }
    });

    Ok(Json(response))
}