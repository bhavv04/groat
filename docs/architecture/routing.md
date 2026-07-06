# Routing architecture

## Phase 1 — rule based (current)

Simple keyword and pattern matching on prompt content.
Handles ~80% of obvious cases. Ships in v0.1.

## Phase 2 — embedding arithmetic (v0.2)

Instead of a classifier, find the direction vector between
"simple" and "complex" request clusters in embedding space.
Dot product against incoming request embedding = complexity score.

Faster than a classifier, more principled than regex, and
explainable: "complexity score 0.73 → powerful tier."

Requires: labeled examples from logged traffic.

## Phase 3 — structured output detection (v0.2)

Requests asking for JSON output with a defined schema are
extraction tasks, not generation tasks. Route to cheap model
with high confidence regardless of other signals.

Signal: system prompt contains "respond in JSON", "output format",
or response_format field is set in the request.