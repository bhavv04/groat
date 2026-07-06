# Speculative prefetching

## The insight

OS memory systems prefetch pages predicted to be needed soon.
Groat can do the same for LLM requests.

If request pattern A is consistently followed by request B
within a short window, speculatively fire B to the cheap model
as soon as A arrives. Response is ready before the user asks.

## When it applies

- Chatbot flows with predictable conversation arcs
- Multi-step workflows (summarize → translate → format)
- Onboarding sequences where step N always follows step N-1

## Risks

- Wasted compute on wrong predictions
- Added complexity in the request pipeline
- Latency if prefetch blocks the main request path
  (must be fully async, never on the critical path)

## Prerequisites

- Conversation graph logging (see graph-routing.md)
- Pattern detection on logged sequences (~10k requests minimum)
- Confidence threshold before prefetch fires (suggest >0.85)

## Status

Research only. Revisit after conversation graph routing is validated.