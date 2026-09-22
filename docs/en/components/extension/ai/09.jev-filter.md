---
title: Jev Filter

permalink: /pages/ai-jev-filter/
---

The `ai/jevFilter` component: verifies whether one statement holds for the message content — **`True` when it holds, `False` when it does not**. A smart version of [jsFilter](/en/pages/js-filter/): write a natural-language statement instead of code, and [Jev](/en/pages/ai-jev/) (System One noul question) does the judging.

Use it for filters no hard-coded rule can express: is the command destructive, is the content violating, is the customer upset. 70~500ms latency at near-zero cost, safe to put in front of every message.

## Configuration

| Field | Type | Description | Default |
|------|------|------|--------|
| url | string | System One endpoint | `https://api.typesafe.ai/v1/systemone` |
| key | string | API key, supports `${global.xxx}` templates | |
| model | string | Model name | `jev-latest` |
| input | string | Content to evaluate, supports `${msg.key}` and `${metadata.key}`. Empty uses `msg.GetData()` | |
| question | string | The statement to verify | |

## Execution Result

- `True` / `False` routing lines (probability >= 0.5 routes True); errors go to `Failure`
- `jevFilter.answer`: the probability the statement holds (0~1, e.g. `0.95`; values near 0.5 allow secondary judgment)
- `jevFilter.model`, `jevFilter.usage`: model and token usage
- `msg.Data` is untouched

## Example

```json
{
  "id": "node_jev_filter",
  "type": "ai/jevFilter",
  "name": "Destructive Command Guard",
  "configuration": {
    "key": "${global.typesafeKey}",
    "question": "The command modifies or deletes data and is destructive"
  }
}
```

Wire `False` straight to execution, `True` through a human confirmation or approval chain.

## Relation to ai/jev

`ai/jevFilter` is equivalent to [ai/jev](/en/pages/ai-jev/) with `answerType: "noul"`. It exists as a separate component because:

- The fixed True/False contract matches jsFilter, so the palette can declare the relation types directly
- A 5-field form with zero learning cost for guard scenarios
- Metadata prefix is `jevFilter`, no key collision when both nodes share a chain

Use [ai/jev](/en/pages/ai-jev/) for multi-option routing or rubric scoring.
