# Embodied Action Model Research Map

Learned models for robot action generation and control, datasets, evaluation benchmarks, and reading notes.

[简体中文](README_cn.md) · [Scope and rationale](docs/scope.md) · [Contribution guide](CONTRIBUTING.md)

## Start Here

1. Use the map to understand the research structure; it shows selected representative works.
2. Open a category to read every indexed work and its concise summary.
3. Follow a record's Notes link for detailed reading or reproduction notes when available.

The current focus is **manipulation action models**; navigation and body motion / whole-body control remain research entry points. Manipulation is organized into grippers, multi-fingered dexterous hands and common methods across platforms. Dexterous-hand work has four primary branches: **Datasets and Benchmarks; Robot Demonstration Data Generation; Robot Manipulation Policies and Control; Human Hand Motion and Manipulation Video Modeling**. Policies and control splits into policy learning and execution feedback/action correction.

Paper names show topics and methods directly, for example **No Eyes, No Problem｜In-hand manipulation · RL · Tactile**. Browse by topic below to find VLA, reinforcement learning, touch/contact feedback and in-hand manipulation across categories; each paper retains one canonical record.

[![Embodied action model research map](mindmap.svg)](mindmap.svg)

## Category Navigation

<!-- BEGIN GENERATED:CATALOG -->

**Browse by topic：** [VLA (4)](catalog/topics/vla.md) · [Reinforcement learning (2)](catalog/topics/reinforcement-learning.md) · [Touch and contact feedback (5)](catalog/topics/tactile.md) · [In-hand manipulation (1)](catalog/topics/in-hand-manipulation.md)

| Category path | Records | Index | Selected works / topics and methods |
|---|---:|---|---|
| Manipulation Action Models → Gripper Manipulation Models → Datasets | 1 | [Open](catalog/manipulation/grippers/datasets.md) | [TacClaw-Infinity｜Gripper demonstrations · Tactile dataset](catalog/manipulation/grippers/datasets.md#am-man-grip-1) |
| Manipulation Action Models → Gripper Manipulation Models → Agent Architectures → Agent + WAM | 1 | [Open](catalog/manipulation/grippers/agent-architectures/agent-wam.md) | [AR-WAM｜Agent + WAM · Event feedback · Failure recovery](catalog/manipulation/grippers/agent-architectures/agent-wam.md#am-man-grip-agent-wam-1) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Datasets and Benchmarks | 3 | [Open](catalog/manipulation/dexterous/benchmarks.md) | [BiDex-100｜Bimanual manipulation · Benchmark](catalog/manipulation/dexterous/benchmarks.md#am-man-dex-bench-1)<br>[HandsOn｜Bimanual manipulation · Simulation benchmark](catalog/manipulation/dexterous/benchmarks.md#am-man-dex-bench-2)<br>[Evo-DexBench｜Dexterous hands / grippers · Simulation benchmark](catalog/manipulation/dexterous/benchmarks.md#am-man-dex-bench-3) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Robot Demonstration Data Generation | 2 | [Open](catalog/manipulation/dexterous/demonstrations/generation.md) | [Gen2Dex｜Video demonstrations · Retargeting · RL trajectory optimization](catalog/manipulation/dexterous/demonstrations/generation.md#am-man-dex-demo-v2r-1)<br>[DexAgent｜Video demonstrations · Agent-built simulation · Data augmentation](catalog/manipulation/dexterous/demonstrations/generation.md#am-man-dex-demo-v2r-2) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Robot Manipulation Policies and Control → Action Policy Learning | 2 | [Open](catalog/manipulation/dexterous/policies/policy-learning.md) | [No Eyes, No Problem｜In-hand manipulation · RL · Tactile](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-inhand-rl-1)<br>[TTP｜VLA · Tactile fusion · Joint action/touch prediction](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-vla-tactile-1) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Robot Manipulation Policies and Control → Execution Feedback and Action Correction | 1 | [Open](catalog/manipulation/dexterous/policies/execution-feedback.md) | [AgenticTactileVLA｜VLA · Contact feedback · Online action correction](catalog/manipulation/dexterous/policies/execution-feedback.md#am-man-dex-vla-feedback-1) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Human Hand Motion and Manipulation Video Modeling | 1 | [Open](catalog/manipulation/dexterous/human-hand-modeling.md) | [P³-WAM｜Unified perception, prediction and planning](catalog/manipulation/dexterous/human-hand-modeling.md#am-man-dex-human-unified-1) |
| Manipulation Action Models → Common Methods → Execution Efficiency and Temporal Control | 1 | [Open](catalog/manipulation/common-methods/execution-efficiency.md) | [PaceVLA｜VLA · Execution speedup · Temporal action granularity](catalog/manipulation/common-methods/execution-efficiency.md#am-man-method-eff-1) |
| Navigation Action Models | 0 | [Open](catalog/navigation.md) | — |
| Body Motion and Whole-Body Control Models | 0 | [Open](catalog/whole-body-control.md) | — |

<!-- END GENERATED:CATALOG -->

[Browse all categories](catalog/README.md)

## Where Content Lives

| Location | Purpose |
|---|---|
| [data/papers/](data/papers/) | One JSON per work: stable ID, category, bilingual summary, links, and verification details |
| [catalog/](catalog/README.md) | Generated bilingual indexes containing the complete collection |
| [notes/](notes/README.md) | Optional detailed reading, comparison, and reproduction notes |
| [taxonomy.json](taxonomy.json) | Category hierarchy, bilingual names, and index routes |
| [data/topics.json](data/topics.json) | Topic names and matching tags for VLA, RL and other cross-category views |
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
