CREATE TABLE IF NOT EXISTS requests (
    id                  TEXT PRIMARY KEY,
    created_at          INTEGER NOT NULL,
    model               TEXT NOT NULL,
    provider            TEXT NOT NULL,

    prompt_tokens       INTEGER NOT NULL DEFAULT 0,
    completion_tokens   INTEGER NOT NULL DEFAULT 0,
    total_tokens        INTEGER NOT NULL DEFAULT 0,

    cost_usd            REAL NOT NULL DEFAULT 0.0,
    latency_ms          INTEGER NOT NULL DEFAULT 0,

    cache_hit           INTEGER NOT NULL DEFAULT 0,
    cache_similarity    REAL,

    routed_model        TEXT,
    routing_reason      TEXT,

    conversation_id     TEXT,
    parent_request_id   TEXT,
    graph_depth         INTEGER NOT NULL DEFAULT 0,

    system_prompt_hash  TEXT,
    prompt_cache_hit    INTEGER NOT NULL DEFAULT 0,

    FOREIGN KEY (parent_request_id) REFERENCES requests(id)
);

CREATE TABLE IF NOT EXISTS cache_entries (
    id              TEXT PRIMARY KEY,
    created_at      INTEGER NOT NULL,
    expires_at      INTEGER,

    prompt_hash     TEXT NOT NULL,
    model           TEXT NOT NULL,
    response_json   TEXT NOT NULL,

    hit_count       INTEGER NOT NULL DEFAULT 0,
    last_hit_at     INTEGER,

    embedding_id    TEXT
);

CREATE TABLE IF NOT EXISTS routing_rules (
    id              TEXT PRIMARY KEY,
    created_at      INTEGER NOT NULL,
    priority        INTEGER NOT NULL DEFAULT 0,

    match_field     TEXT NOT NULL,
    match_value     TEXT NOT NULL,
    target_model    TEXT NOT NULL,

    enabled         INTEGER NOT NULL DEFAULT 1,
    hit_count       INTEGER NOT NULL DEFAULT 0,
    total_saved_usd REAL NOT NULL DEFAULT 0.0
);

CREATE INDEX IF NOT EXISTS idx_requests_created_at      ON requests(created_at);
CREATE INDEX IF NOT EXISTS idx_requests_conversation_id ON requests(conversation_id);
CREATE INDEX IF NOT EXISTS idx_requests_model           ON requests(model);
CREATE INDEX IF NOT EXISTS idx_cache_entries_prompt     ON cache_entries(prompt_hash);