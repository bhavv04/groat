pub mod embedder;
pub mod store;

pub use embedder::Embedder;
pub use store::VectorStore;

#[derive(Debug, thiserror::Error)]
pub enum EmbedError {
    #[error("Embedding error: {0}")]
    Embed(#[from] anyhow::Error),
    #[error("Store error: {0}")]
    Store(String),
}