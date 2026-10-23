# Embodied Action Model Research Map

Learned models for robot action generation and control, datasets, evaluation benchmarks, and reading notes.

[简体中文](README_cn.md) · [Scope and rationale](docs/scope.md) · [Contribution guide](CONTRIBUTING.md)

## Start Here

1. Use the map to understand the research structure; it shows selected representative works.
2. Open a category to read every indexed work and its concise summary.
3. Follow a record's Notes link for detailed reading or reproduction notes when available.

The current focus is **manipulation action models**. Navigation and body motion / whole-body control remain research entry points. Manipulation is organized into grippers, multi-fingered dexterous hands and common methods across platforms. Gripper work currently includes a [datasets](catalog/manipulation/grippers/datasets.md) branch. Dexterous-hand work covers benchmarks, demonstration acquisition and action conversion, in-hand manipulation, and VLA. The VLA branch currently covers execution feedback and correction. In-hand work is grouped by method, with reinforcement learning currently indexed.

[![Embodied action model research map](mindmap.svg)](mindmap.svg)

## Category Navigation

<!-- BEGIN GENERATED:CATALOG -->

| Category path | Code | Records | Index |
|---|---|---:|---|
| Manipulation Action Models → Gripper Manipulation Models → Datasets | `AM.MAN.GRIP.DATASET` | 1 | [Open](catalog/manipulation/grippers/datasets.md) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Models → Benchmarks | `AM.MAN.DEX.BENCH` | 3 | [Open](catalog/manipulation/dexterous/benchmarks.md) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Models → Demonstration Acquisition and Action Conversion → Video Demonstrations to Robot Actions | `AM.MAN.DEX.DEMO.V2R` | 2 | [Open](catalog/manipulation/dexterous/demonstrations/video-to-robot.md) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Models → In-Hand Manipulation → Reinforcement Learning | `AM.MAN.DEX.INHAND.RL` | 1 | [Open](catalog/manipulation/dexterous/in-hand/reinforcement-learning.md) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Models → VLA → Execution Feedback and Correction | `AM.MAN.DEX.VLA.FEEDBACK` | 1 | [Open](catalog/manipulation/dexterous/vla/execution-feedback.md) |
| Manipulation Action Models → Common Methods → Execution Efficiency and Temporal Control | `AM.MAN.METHOD.EFF` | 1 | [Open](catalog/manipulation/common-methods/execution-efficiency.md) |
| Navigation Action Models | `AM.NAV` | 0 | [Open](catalog/navigation.md) |
| Body Motion and Whole-Body Control Models | `AM.WBC` | 0 | [Open](catalog/whole-body-control.md) |

<!-- END GENERATED:CATALOG -->

[Browse all categories](catalog/README.md)

## Where Content Lives

| Location | Purpose |
|---|---|
| [data/papers/](data/papers/) | One JSON per work: stable ID, category, bilingual summary, links, and verification details |
| [catalog/](catalog/README.md) | Generated bilingual indexes containing the complete collection |
| [notes/](notes/README.md) | Optional detailed reading, comparison, and reproduction notes |
| [taxonomy.json](taxonomy.json) | Category hierarchy, bilingual names, and index routes |
| [docs/scope.md](docs/scope.md) | Scope, classification boundaries, and supporting surveys |

## Growing the Collection

Every work needs a concise source-backed record. Benchmark summaries specify hand types, task counts, same-task cross-hand reuse, release status, and the key distinction. Detailed notes are optional. Keep paper claims, published assets, evaluated configurations, and reproduced results distinct; retain explicit unknowns.

After editing source data, run:

```bash
python3 scripts/build_catalog.py
python3 scripts/build_catalog.py --check
python3 -m unittest discover -s tests -v
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for fields, templates, and workflow. Homepages, category pages, and maps are generated from the same records.

## Acknowledgments

Map presentation and category-based indexing were inspired by [Hand3DResearch](https://github.com/SeanChenxy/Hand3DResearch). This repository independently maintains its embodied-action scope and categories.
