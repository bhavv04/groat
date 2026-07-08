use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RequestRow {
    pub id: Option<String>,
    pub created_at: i64,
    pub model: Option<String>,
    pub provider: Option<String>,

    pub prompt_tokens: i64,
    pub completion_tokens: i64,
    pub total_tokens: i64,

    pub cost_usd: f64,
    pub latency_ms: i64,

    pub cache_hit: i64,
    pub cache_similarity: Option<f64>,

    pub routed_model: Option<String>,
    pub routing_reason: Option<String>,

    pub conversation_id: Option<String>,
    pub parent_request_id: Option<String>,
    pub graph_depth: i64,

    pub system_prompt_hash: Option<String>,
    pub prompt_cache_hit: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct CacheEntryRow {
    pub id: String,
    pub created_at: i64,
    pub expires_at: Option<i64>,

    pub prompt_hash: String,
    pub model: String,
    pub response_json: String,

    pub hit_count: i64,
    pub last_hit_at: Option<i64>,

    pub embedding_id: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RoutingRuleRow {
    pub id: String,
    pub created_at: i64,
    pub priority: i64,

    pub match_field: String,
    pub match_value: String,
    pub target_model: String,

    pub enabled: i64,
    pub hit_count: i64,
    pub total_saved_usd: f64,
}