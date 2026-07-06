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
use std::sync::Arc;
use tracing::info;

#[derive(Args)]
pub struct UpArgs {
    /// Port to listen on
    #[arg(long, default_value = "8787")]
    port: u16,

    /// Ollama base URL
    #[arg(long, default_value = "http://localhost:11434")]
    ollama_url: String,
}

struct AppState {
    provider: Arc<dyn Provider>,
}

pub async fn run(args: UpArgs) {
    tracing_subscriber::fmt::init();

    let provider = OllamaProvider::new(&args.ollama_url);

    let state = Arc::new(AppState {
        provider: Arc::new(provider),
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

    let response = state
        .provider
        .chat(&request)
        .await
        .map_err(|e| (StatusCode::BAD_GATEWAY, e.to_string()))?;

    info!("← {} tokens used", 
        response.usage.as_ref().map(|u| u.total_tokens).unwrap_or(0)
    );

    Ok(Json(response))
}