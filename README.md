# VLA / WAM Latency Research Map

[简体中文](README_cn.md) · [Scope](docs/scope.md) · [Contributing](CONTRIBUTING.md)

Papers on VLA/WAM inference acceleration and real-time control, organized around perception cost, action generation, observation freshness and continuous execution.

## Start here

1. Read the [Chinese comparison and reading guide](notes/latency-review_cn.md).
2. Browse the bilingual categories below and follow each record's paper link.
3. Consult the [source/version audit](docs/source-audit_cn.md) for verification limits and missing details.

The collection contains **16 papers**, including acceleration methods and related foundations. π0.5 provides policy context; Fast-WAM and ImageWAM support comparisons of world-model inference paths. Detailed notes are in Chinese.

[![Research map](mindmap.svg)](mindmap.svg)

## Categories

<!-- BEGIN GENERATED:CATALOG -->

| Category | Code | Records | Index |
|---|---|---:|---|
| Perception and VLM reuse | `LAT.VLM` | 2 | [Open](catalog/perception/vlm-reuse.md) |
| One-step generation and distillation | `LAT.GEN.STEP` | 2 | [Open](catalog/generation/one-step.md) |
| History sources and warm starts | `LAT.GEN.HIST` | 3 | [Open](catalog/generation/history.md) |
| Adaptive sampling budgets | `LAT.GEN.ADAPT` | 1 | [Open](catalog/generation/adaptive.md) |
| Asynchronous execution and delay compensation | `LAT.ASYNC` | 4 | [Open](catalog/execution/asynchronous.md) |
| Execution timing and granularity | `LAT.EXEC` | 1 | [Open](catalog/execution/temporal-granularity.md) |
| WAM and policy foundations | `LAT.BASE` | 3 | [Open](catalog/foundations/models.md) |

<!-- END GENERATED:CATALOG -->

## Maintain the collection

Edit one canonical JSON per paper in `data/papers/`, optional notes in `notes/`, and categories in `taxonomy.json`. Use the model/benchmark templates, replace all example values, and allocate a unique non-retired ID. A paper has one primary leaf category and optional related categories.

`show_on_map` selects overview representatives; all records appear in category indexes. Check primary sources and record the actual verification date. Keep model latency, full local policy-call latency, sensor-to-actuation age and task completion time distinct. Generated indexes/maps must not be patched manually.

```powershell
python -X utf8 scripts/build_catalog.py
python -X utf8 scripts/build_catalog.py --check
python -X utf8 -m unittest discover -s tests -v
git diff --check
```

Based on [Embodied-Agent-Research-Map](https://github.com/ZGCA-HMI-Lab/Embodied-Agent-Research-Map); map organization acknowledges [Hand3DResearch](https://github.com/SeanChenxy/Hand3DResearch).
