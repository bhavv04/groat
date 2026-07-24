use anyhow::{Context, Result};
use candle_core::{Device, Tensor};
use candle_nn::VarBuilder;
use candle_transformers::models::bert::{BertModel, Config};
use hf_hub::{api::tokio::Api, Repo, RepoType};
use tokenizers::Tokenizer;

pub struct Embedder {
    model: BertModel,
    tokenizer: Tokenizer,
    device: Device,
}

impl Embedder {
    /// Download and load bge-small-en-v1.5 from HuggingFace.
    /// Model is cached locally after first download (~33MB).
    pub async fn new() -> Result<Self> {
        let device = Device::Cpu;

        let api = Api::new()?;
        let repo = api.repo(Repo::new(
            "BAAI/bge-small-en-v1.5".to_string(),
            RepoType::Model,
        ));

        tracing::info!("loading bge-small-en-v1.5 (downloads on first run)");

        let config_path = repo.get("config.json").await?;
        let tokenizer_path = repo.get("tokenizer.json").await?;
        let weights_path = repo.get("model.safetensors").await?;

        let config: Config = serde_json::from_str(
            &std::fs::read_to_string(config_path)?
        )?;

        let tokenizer = Tokenizer::from_file(tokenizer_path)
            .map_err(|e| anyhow::anyhow!("tokenizer error: {}", e))?;

        let vb = unsafe {
            VarBuilder::from_mmaped_safetensors(
                &[weights_path],
                candle_core::DType::F32,
                &device,
            )?
        };

        let model = BertModel::load(vb, &config)
            .context("failed to load BERT model")?;

        Ok(Self { model, tokenizer, device })
    }

    /// Embed a string into a 384-dimensional vector.
    pub fn embed(&self, text: &str) -> Result<Vec<f32>> {
        let tokens = self.tokenizer
            .encode(text, true)
            .map_err(|e| anyhow::anyhow!("tokenize error: {}", e))?;

        let token_ids = tokens.get_ids().to_vec();
        let token_ids = Tensor::new(
            token_ids.as_slice(),
            &self.device,
        )?.unsqueeze(0)?;

        let token_type_ids = token_ids.zeros_like()?;

        let embeddings = self.model.forward(
            &token_ids,
            &token_type_ids,
            None,
        )?;

        // mean pooling over sequence dimension
        let embeddings = (embeddings.sum(1)? / embeddings.dim(1)? as f64)?;

        // L2 normalise so cosine similarity = dot product
        let norm = embeddings.sqr()?.sum_all()?.sqrt()?;
        let embeddings = embeddings.broadcast_div(&norm)?;

        Ok(embeddings.squeeze(0)?.to_vec1::<f32>()?)
    }
}