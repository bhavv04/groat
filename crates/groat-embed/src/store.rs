use anyhow::Result;
use sqlx::SqlitePool;
use std::path::Path;

const DIMS: usize = 384;

pub struct VectorStore {
    pool: SqlitePool,
}

impl VectorStore {
    pub async fn new(db_path: &Path) -> Result<Self> {
        let url = format!("sqlite://{}?mode=rwc", db_path.display());
        let pool = SqlitePool::connect(&url).await?;

        // store vectors as BLOBs — simple and dependency-free
        sqlx::query(
            "CREATE TABLE IF NOT EXISTS cache_vectors (
                id          TEXT PRIMARY KEY,
                embedding   BLOB NOT NULL
            )"
        )
        .execute(&pool)
        .await?;

        Ok(Self { pool })
    }

    /// Insert a vector with its associated cache entry ID.
    pub async fn insert(&self, id: &str, vector: &[f32]) -> Result<()> {
        let bytes = vector_to_bytes(vector);
        sqlx::query("INSERT OR REPLACE INTO cache_vectors(id, embedding) VALUES (?, ?)")
            .bind(id)
            .bind(bytes)
            .execute(&self.pool)
            .await?;
        Ok(())
    }

    /// Find the most similar cached vector above the threshold.
    /// Returns (cache_entry_id, similarity_score) if found.
    /// Uses brute-force cosine similarity — fast enough up to ~10k entries.
    pub async fn find_similar(
        &self,
        vector: &[f32],
        threshold: f32,
    ) -> Result<Option<(String, f32)>> {
        let rows = sqlx::query("SELECT id, embedding FROM cache_vectors")
            .fetch_all(&self.pool)
            .await?;

        let mut best_id: Option<String> = None;
        let mut best_score = f32::NEG_INFINITY;

        for row in rows {
            let id: String = sqlx::Row::get(&row, "id");
            let bytes: Vec<u8> = sqlx::Row::get(&row, "embedding");
            let cached = bytes_to_vector(&bytes);

            let score = cosine_similarity(vector, &cached);
            if score > best_score {
                best_score = score;
                best_id = Some(id);
            }
        }

        if best_score >= threshold {
            Ok(best_id.map(|id| (id, best_score)))
        } else {
            Ok(None)
        }
    }
}

fn cosine_similarity(a: &[f32], b: &[f32]) -> f32 {
    let dot: f32 = a.iter().zip(b.iter()).map(|(x, y)| x * y).sum();
    let norm_a: f32 = a.iter().map(|x| x * x).sum::<f32>().sqrt();
    let norm_b: f32 = b.iter().map(|x| x * x).sum::<f32>().sqrt();
    if norm_a == 0.0 || norm_b == 0.0 {
        0.0
    } else {
        dot / (norm_a * norm_b)
    }
}

fn vector_to_bytes(vector: &[f32]) -> Vec<u8> {
    vector.iter().flat_map(|f| f.to_le_bytes()).collect()
}

fn bytes_to_vector(bytes: &[u8]) -> Vec<f32> {
    bytes
        .chunks_exact(4)
        .map(|b| f32::from_le_bytes([b[0], b[1], b[2], b[3]]))
        .collect()
}