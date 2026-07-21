use chrono::Utc;
use groat_storage::Storage;
use std::path::PathBuf;

pub async fn run(db_path: PathBuf) {
    let storage = match Storage::new(&db_path).await {
        Ok(s) => s,
        Err(e) => {
            eprintln!("error: could not open database: {}", e);
            eprintln!("hint: is groat running? try `groat up` first.");
            return;
        }
    };

    let summary = match storage.get_cost_summary().await {
        Ok(s) => s,
        Err(e) => {
            eprintln!("error: could not read stats: {}", e);
            return;
        }
    };

    let recent = match storage.get_recent_requests(5).await {
        Ok(r) => r,
        Err(e) => {
            eprintln!("error: could not read requests: {}", e);
            return;
        }
    };

    // ── header ───────────────────────────────────────────────
    println!();
    println!("  groat v{}  —  every token counts", env!("CARGO_PKG_VERSION"));
    println!();

    // ── summary stats ────────────────────────────────────────
    println!("  {:.<28} {:>10}", "requests", summary.total_requests);
    println!("  {:.<28} {:>10}", "tokens used", format_num(summary.total_tokens));
    println!("  {:.<28} {:>10}", "total cost", format_usd(summary.total_cost_usd));
    println!("  {:.<28} {:>10}", "saved (cache hits)", format_usd(summary.estimated_saved_usd));
    println!();

    // ── cost by model ─────────────────────────────────────────
    if let Ok(by_model) = storage.get_cost_by_model().await {
        if !by_model.is_empty() {
            println!("  by model");
            println!("  {}", "─".repeat(44));
            for (model, cost) in &by_model {
                println!("  {:.<32} {:>10}", model, format_usd(*cost));
            }
            println!();
        }
    }

    // ── recent requests ───────────────────────────────────────
    if !recent.is_empty() {
        println!("  last {} requests", recent.len());
        println!("  {}", "─".repeat(64));
        for row in &recent {
            let model = row.model.as_deref().unwrap_or("unknown");
            let tokens = row.total_tokens;
            let latency = row.latency_ms;
            let cost = format_usd(row.cost_usd);
            let ago = format_ago(row.created_at);
            let cache = if row.cache_hit == 1 { " [cache]" } else { "" };

            println!(
                "  {:<20} {:>6} tokens   {:>6}ms   {:>8}   {}{}",
                model, tokens, latency, cost, ago, cache
            );
        }
        println!();
    } else {
        println!("  no requests yet — run `groat up` and send some requests");
        println!();
    }
}

fn format_usd(amount: f64) -> String {
    if amount == 0.0 {
        "$0.000".to_string()
    } else if amount < 0.001 {
        format!("${:.6}", amount)
    } else {
        format!("${:.3}", amount)
    }
}

fn format_num(n: i64) -> String {
    // simple thousands separator
    let s = n.to_string();
    let mut result = String::new();
    for (i, c) in s.chars().rev().enumerate() {
        if i > 0 && i % 3 == 0 {
            result.push(',');
        }
        result.push(c);
    }
    result.chars().rev().collect()
}

fn format_ago(timestamp: i64) -> String {
    let now = Utc::now().timestamp();
    let diff = now - timestamp;

    match diff {
        0..=59 => format!("{}s ago", diff),
        60..=3599 => format!("{}m ago", diff / 60),
        3600..=86399 => format!("{}h ago", diff / 3600),
        _ => format!("{}d ago", diff / 86400),
    }
}