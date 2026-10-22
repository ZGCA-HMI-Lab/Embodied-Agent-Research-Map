# Scope and Category Boundaries

[Home](../README.md) · [Chinese research comparison](../notes/latency-review_cn.md)

This collection covers one direction: VLA/WAM real-robot latency optimization. Questions include when to refresh perception, how much action-generation computation is needed, when predictions are executed, and how these choices affect closed-loop success.

Categories follow the main bottleneck: perception/VLM reuse; one-step generation/distillation; history sources/warm starts; adaptive sampling budgets; asynchronous execution/delay compensation; execution timing/granularity; and WAM/policy foundations. Each paper has one primary leaf category, with cross-links and platform/method tags. History used as a generation source differs from history used only as conditioning. Multimodality is not synonymous with observation staleness. Task completion acceleration differs from model inference acceleration.

Foundation papers explain architecture and are not automatically counted as dedicated acceleration methods. A result on one backbone is not evidence of universal drop-in compatibility.

Records verify metadata, abstracts and selected sections, not exhaustive full-paper reading. Details not extracted in this pass are marked as such; this does not mean the paper omitted them. Author-reported experiments are not local reproductions. All initial reading states are indexed.

Version-pinned sources and verification dates are recorded. FLOPs, model-forward time, complete local policy-call time, sensor-to-actuation age and task completion time remain separate. Cross-hardware numbers are not a speed leaderboard. See [CONTRIBUTING](../CONTRIBUTING.md).
