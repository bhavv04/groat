use async_trait::async_trait;
use groat_core::{ChatRequest, ChatResponse};

pub mod anthropic;
pub mod groq;
pub mod ollama;
pub mod openai;
pub mod together;

#[derive(Debug, thiserror::Error)]
pub enum ProviderError {
    #[error("HTTP error: {0}")]
    Http(#[from] reqwest::Error),
    #[error("Provider returned error: {status} — {message}")]
    Api { status: u16, message: String },
    #[error("Failed to parse response: {0}")]
    Parse(String),
}

#[async_trait]
pub trait Provider: Send + Sync {
    fn name(&self) -> &str;
    async fn chat(&self, request: &ChatRequest) -> Result<ChatResponse, ProviderError>;
}