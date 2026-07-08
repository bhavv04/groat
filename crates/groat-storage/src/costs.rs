use crate::{Storage, StorageError};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
pub struct CostSummary {
    pub total_requests: i64,
    pub total_tokens: i64,
    pub total_cost_usd: f64,
    pub cache_hits: i64,
    pub estimated_saved_usd: f64,
}

impl Storage {
    pub async fn get_cost_summary(&self) -> Result<CostSummary, StorageError> {
        let row = sqlx::query!(
            r#"
            SELECT
                COUNT(*)            as total_requests,
                SUM(total_tokens)   as total_tokens,
                SUM(cost_usd)       as total_cost_usd,
                SUM(cache_hit)      as cache_hits
            FROM requests
            "#
        )
        .fetch_one(&self.pool)
        .await?;

        let total_cost = row.total_cost_usd.unwrap_or(0.0);
        let cache_hits = row.cache_hits.unwrap_or(0);

        // Rough saving estimate: each cache hit saved the average request cost
        let avg_cost = if row.total_requests > 0 {
            total_cost / row.total_requests as f64
        } else {
            0.0
        };
        let estimated_saved = cache_hits as f64 * avg_cost;

        Ok(CostSummary {
            total_requests: row.total_requests as i64,  // i32 → i64 cast
            total_tokens: row.total_tokens.unwrap_or(0),
            total_cost_usd: total_cost,
            cache_hits,
            estimated_saved_usd: estimated_saved,
        })
    }

    pub async fn get_cost_by_model(&self) -> Result<Vec<(String, f64)>, StorageError> {
        let rows = sqlx::query!(
            r#"
            SELECT model, SUM(cost_usd) as total
            FROM requests
            GROUP BY model
            ORDER BY total DESC
            "#
        )
        .fetch_all(&self.pool)
        .await?;

        Ok(rows
        .into_iter()
        .map(|r| (r.model, r.total))  // remove .unwrap_or(0.0) — already f64
        .collect())
    }
}