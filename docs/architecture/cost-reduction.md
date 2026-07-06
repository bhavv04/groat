# Groat cost reduction architecture

Three levers, implemented in order of reliability.

## Lever 1 — semantic caching (ship first)

Every request is embedded using bge-small-en-v1.5 running locally via candle.
On each incoming request:

1. Embed the semantic core of the prompt (strip system prompt template, 
   dynamic fields, timestamps)
2. Query lancedb for top-k similar cached requests
3. If similarity > threshold (default 0.95), return cached response
4. Otherwise forward to provider, cache the response with TTL

Savings: deterministic. 30-60% hit rate realistic in dev/staging environments.
Quality risk: near zero at 0.95 threshold.

## Lever 2 — prompt cache injection (ship second)

Anthropic and OpenAI both discount repeated prompt prefixes (50-90% cheaper).
Groat detects stable system prompts across requests and automatically injects
cache_control breakpoints so the provider charges the cached rate.

No model routing, no quality tradeoff. Pure structured savings.

Savings: 10-30% on top of lever 1 for apps with consistent system prompts.
Quality risk: zero.

## Lever 3 — user-defined routing rules (ship third)

Users pin specific use cases to specific models in groat.toml:

    [[route]]
    match = { system_prompt_contains = "customer support" }
    model = "llama3"

    [[route]]
    match = { output_format = "json" }
    model = "gpt-4o-mini"

No magic classifier. User knows their workload, Groat enforces the rules
and shows savings per route in the dashboard.

Savings: variable, user controlled.
Quality risk: user accepts responsibility per route.

## Lever 4 — retroactive routing suggestions (ship after 10k requests)

After logging sufficient traffic, Groat analyzes patterns and surfaces:

    "These 340 requests went to GPT-4o. Based on response structure they
    look like extraction tasks. Routing to GPT-4o-mini would have saved
    $12.40. Create a rule?"

User opts in. Groat never makes autonomous quality decisions without
explicit user approval.

This is the moat. Not a classifier that might be wrong — an advisor
that shows its work and asks for permission.