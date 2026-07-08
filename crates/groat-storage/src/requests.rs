use crate::{schema::RequestRow, Storage, StorageError};
use uuid::Uuid;
use chrono::Utc;

pub struct NewRequest {
    pub model: String,
    pub provider: String,
    pub prompt_tokens: i64,
    pub completion_tokens: i64,
    pub cost_usd: f64,
    pub latency_ms: i64,
    pub cache_hit: bool,
    pub cache_similarity: Option<f64>,
    pub routed_model: Option<String>,
    pub routing_reason: Option<String>,
    pub conversation_id: Option<String>,
    pub parent_request_id: Option<String>,
    pub system_prompt_hash: Option<String>,
}

impl Storage {
    pub async fn insert_request(
        &self,
        req: NewRequest,
    ) -> Result<String, StorageError> {
        let id = Uuid::new_v4().to_string();
        let now = Utc::now().timestamp();
        let total_tokens = req.prompt_tokens + req.completion_tokens;
        let graph_depth = 0i64; // will be computed from parent later

        sqlx::query!(
            r#"
            INSERT INTO requests (
                id, created_at, model, provider,
                prompt_tokens, completion_tokens, total_tokens,
                cost_usd, latency_ms,
                cache_hit, cache_similarity,
                routed_model, routing_reason,
                conversation_id, parent_request_id, graph_depth,
                system_prompt_hash, prompt_cache_hit
            ) VALUES (
                ?, ?, ?, ?,
                ?, ?, ?,
                ?, ?,
                ?, ?,
                ?, ?,
                ?, ?, ?,
                ?, ?
            )
            "#,
            id, now, req.model, req.provider,
            req.prompt_tokens, req.completion_tokens, total_tokens,
            req.cost_usd, req.latency_ms,
            req.cache_hit, req.cache_similarity,
            req.routed_model, req.routing_reason,
            req.conversation_id, req.parent_request_id, graph_depth,
            req.system_prompt_hash, false
        )
        .execute(&self.pool)
        .await?;

        Ok(id)
    }

    pub async fn get_recent_requests(
        &self,
        limit: i64,
    ) -> Result<Vec<RequestRow>, StorageError> {
        let rows = sqlx::query_as!(
            RequestRow,
            r#"
            SELECT * FROM requests
            ORDER BY created_at DESC
            LIMIT ?
            "#,
            limit
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(rows)
    }
}