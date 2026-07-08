pub mod costs;
pub mod migrations;
pub mod requests;
pub mod schema;

use sqlx::SqlitePool;
use std::path::Path;
use thiserror::Error;

#[derive(Debug, Error)]
pub enum StorageError {
    #[error("Database error: {0}")]
    Db(#[from] sqlx::Error),
    #[error("Migration error: {0}")]
    Migration(#[from] sqlx::migrate::MigrateError),
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),
}

#[derive(Clone)]
pub struct Storage {
    pub pool: SqlitePool,
}

impl Storage {
    pub async fn new(db_path: &Path) -> Result<Self, StorageError> {
        // Create parent directory if it doesn't exist
        if let Some(parent) = db_path.parent() {
            tokio::fs::create_dir_all(parent).await?;
        }

        let url = format!("sqlite://{}?mode=rwc", db_path.display());

        let pool = SqlitePool::connect(&url).await?;

        // Run migrations
        sqlx::migrate!("./migrations")
            .run(&pool)
            .await?;

        Ok(Self { pool })
    }
}