# Conversation graph routing

## The insight

Most LLM proxies treat every request as independent.
They aren't — they're nodes in a conversation graph.

    root question        → expensive (sets context, needs quality)
    ├── clarification    → cheap (context established)
    ├── follow-up        → cheap (context established)  
    │   └── deep dive    → expensive (new territory)
    └── summary request  → cheap (just compression)

Graph position is a routing signal. Continuation of an established
context deserves a cheaper model than a new root question.

## OS scheduling analogy

Similar to how a process scheduler treats a new process differently
from a continuation — new context is expensive to establish,
continuation is cheap to maintain.

## Implementation requirements

- Log conversation_id and parent_message_id on every request
- Build conversation graph in SQLite
- Measure response quality delta between model tiers per graph depth
- Route based on: depth + branching factor + context_tokens

## Prerequisites

Need ~10k logged requests with conversation tracking before this
is worth implementing. Schema must capture graph structure from day 1.

## Schema addition needed in groat-storage

    conversation_id     TEXT  -- groups related requests
    parent_request_id   TEXT  -- NULL for root, request_id for continuations
    graph_depth         INT   -- 0 for root, +1 per hop