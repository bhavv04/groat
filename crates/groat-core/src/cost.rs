/// Price per million tokens in USD.
/// Sources: OpenAI pricing page, Anthropic pricing page — last updated 2026-07.
/// Update these when providers change their pricing.
#[derive(Debug, Clone)]
pub struct ModelPrice {
    pub input_per_million: f64,
    pub output_per_million: f64,
}

impl ModelPrice {
    const fn new(input: f64, output: f64) -> Self {
        Self {
            input_per_million: input,
            output_per_million: output,
        }
    }
}

/// Look up the price for a given model name.
/// Returns None if the model is unknown (e.g. local Ollama models — they're free).
pub fn model_price(model: &str) -> Option<ModelPrice> {
    // normalise — strip version suffixes like -2024-11-20
    let model = model.split('-').take(3).collect::<Vec<_>>().join("-");

    match model.as_str() {
        // ── OpenAI ──────────────────────────────────────────────
        "gpt-4o" => Some(ModelPrice::new(2.50, 10.00)),
        "gpt-4o-mini" => Some(ModelPrice::new(0.15, 0.60)),
        "gpt-4-turbo" => Some(ModelPrice::new(10.00, 30.00)),
        "gpt-3.5-turbo" => Some(ModelPrice::new(0.50, 1.50)),
        "o1" => Some(ModelPrice::new(15.00, 60.00)),
        "o1-mini" => Some(ModelPrice::new(3.00, 12.00)),
        "o3-mini" => Some(ModelPrice::new(1.10, 4.40)),

        // ── Anthropic ───────────────────────────────────────────
        "claude-opus" => Some(ModelPrice::new(15.00, 75.00)),
        "claude-sonnet" => Some(ModelPrice::new(3.00, 15.00)),
        "claude-haiku" => Some(ModelPrice::new(0.80, 4.00)),

        // ── Groq (hosted open source) ───────────────────────────
        "llama3-70b-8192" => Some(ModelPrice::new(0.59, 0.79)),
        "llama3-8b-8192" => Some(ModelPrice::new(0.05, 0.10)),
        "mixtral-8x7b" => Some(ModelPrice::new(0.24, 0.24)),

        // ── Together AI ─────────────────────────────────────────
        "mistral-7b" => Some(ModelPrice::new(0.20, 0.20)),
        "mixtral-8x22b" => Some(ModelPrice::new(1.20, 1.20)),

        // ── Local / Ollama — always free ────────────────────────
        _ => None,
    }
}

/// Calculate the cost in USD for a single request.
/// Returns 0.0 for unknown/local models.
pub fn calculate_cost(model: &str, prompt_tokens: u32, completion_tokens: u32) -> f64 {
    match model_price(model) {
        None => 0.0,
        Some(price) => {
            let input_cost = (prompt_tokens as f64 / 1_000_000.0) * price.input_per_million;
            let output_cost = (completion_tokens as f64 / 1_000_000.0) * price.output_per_million;
            input_cost + output_cost
        }
    }
}

/// Calculate the savings when a request was routed from one model to another.
/// Returns 0.0 if either model is unknown or there are no savings.
pub fn calculate_routing_saving(
    requested_model: &str,
    routed_model: &str,
    prompt_tokens: u32,
    completion_tokens: u32,
) -> f64 {
    let original_cost = calculate_cost(requested_model, prompt_tokens, completion_tokens);
    let actual_cost = calculate_cost(routed_model, prompt_tokens, completion_tokens);
    (original_cost - actual_cost).max(0.0)
}

/// Calculate the saving from a semantic cache hit.
/// The saving is the full cost of what the request would have cost.
pub fn calculate_cache_saving(
    model: &str,
    prompt_tokens: u32,
    completion_tokens: u32,
) -> f64 {
    calculate_cost(model, prompt_tokens, completion_tokens)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_gpt4o_cost() {
        // 1000 input tokens + 500 output tokens on gpt-4o
        let cost = calculate_cost("gpt-4o", 1000, 500);
        // input: 1000/1_000_000 * 2.50 = 0.0025
        // output: 500/1_000_000 * 10.00 = 0.005
        assert!((cost - 0.0075).abs() < 0.0001);
    }

    #[test]
    fn test_ollama_is_free() {
        let cost = calculate_cost("llama3", 10000, 5000);
        assert_eq!(cost, 0.0);
    }

    #[test]
    fn test_routing_saving() {
        // routed from gpt-4o to gpt-4o-mini
        let saving = calculate_routing_saving("gpt-4o", "gpt-4o-mini", 1000, 500);
        assert!(saving > 0.0);
    }

    #[test]
    fn test_no_negative_saving() {
        // routing to a more expensive model should return 0 not negative
        let saving = calculate_routing_saving("gpt-4o-mini", "gpt-4o", 1000, 500);
        assert_eq!(saving, 0.0);
    }
}