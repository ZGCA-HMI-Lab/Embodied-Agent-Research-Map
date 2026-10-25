# Embodied Action Model Research Map

Learned models for robot action generation and control, datasets, evaluation benchmarks, and reading notes.

[简体中文](README_cn.md) · [Scope and rationale](docs/scope.md) · [Contribution guide](CONTRIBUTING.md)

**[Interactive Map · Live website](https://zgca-hmi-lab.github.io/Embodied-Agent-Research-Map/)**: explore categories over time, search papers and combine topic filters. Click a paper name for the original paper or “Summary & resources” for details. Validated main-branch updates deploy automatically; see [preview and maintenance instructions](docs/interactive-map.md).

## Start Here

1. Use the map to understand the research structure; it shows selected representative works.
2. Open a category to read every indexed work and its concise summary.
3. Follow a record's Notes link for detailed reading or reproduction notes when available.

The current focus is **manipulation action models**; navigation and body motion / whole-body control remain research entry points. Manipulation is organized into grippers, multi-fingered dexterous hands and common methods across platforms. Dexterous-hand work has four primary branches: **Datasets and Benchmarks; Robot Demonstration Data Generation; Robot Manipulation Policies and Control; Human Hand Motion and Manipulation Video Modeling**. Policies and control splits into policy learning and execution feedback/action correction.

Paper names show topics and methods directly, for example **No Eyes, No Problem｜In-hand manipulation · RL · Tactile**. Browse by topic below to find VLA, reinforcement learning, touch/contact feedback and in-hand manipulation across categories; each paper retains one canonical record.

[![Embodied action model research map](mindmap.svg)](mindmap.svg)

## Category Navigation

<!-- BEGIN GENERATED:CATALOG -->

**Browse by topic：** [VLA (8)](catalog/topics/vla.md) · [Reinforcement learning (10)](catalog/topics/reinforcement-learning.md) · [Touch and contact feedback (10)](catalog/topics/tactile.md) · [In-hand manipulation (2)](catalog/topics/in-hand-manipulation.md)

| Category path | Records | Index | Selected works / topics and methods |
|---|---:|---|---|
| Manipulation Action Models → Gripper Manipulation Models → Datasets | 1 | [Open](catalog/manipulation/grippers/datasets.md) | [TacClaw-Infinity｜Gripper demonstrations · Tactile dataset](catalog/manipulation/grippers/datasets.md#am-man-grip-1) |
| Manipulation Action Models → Gripper Manipulation Models → Agent Architectures → Agent + WAM | 1 | [Open](catalog/manipulation/grippers/agent-architectures/agent-wam.md) | [AR-WAM｜Agent + WAM · Event feedback · Failure recovery](catalog/manipulation/grippers/agent-architectures/agent-wam.md#am-man-grip-agent-wam-1) |
| Manipulation Action Models → Gripper Manipulation Models → Agent Architectures → In-Context Learning and Tool-Based Control | 1 | [Open](catalog/manipulation/grippers/agent-architectures/in-context-tool-control.md) | [GPT-Policy｜VLM Agent · In-context learning · Closed-loop tool control](catalog/manipulation/grippers/agent-architectures/in-context-tool-control.md#am-man-grip-agent-icl-1) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Datasets and Benchmarks | 4 | [Open](catalog/manipulation/dexterous/benchmarks.md) | [BiDex-100｜Bimanual manipulation · Benchmark](catalog/manipulation/dexterous/benchmarks.md#am-man-dex-bench-1)<br>[HandsOn｜Bimanual manipulation · Simulation benchmark](catalog/manipulation/dexterous/benchmarks.md#am-man-dex-bench-2)<br>[Evo-DexBench｜Dexterous manipulation · Simulation benchmark](catalog/manipulation/dexterous/benchmarks.md#am-man-dex-bench-3)<br>[DexBioLab｜Laboratory manipulation benchmark · Dynamic experiment visuals · Parallel realistic simulation](catalog/manipulation/dexterous/benchmarks.md#am-man-dex-bench-4) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Robot Demonstration Data Generation | 6 | [Open](catalog/manipulation/dexterous/demonstrations/generation.md) | [DexNinja｜Real2Sim2Real augmentation · Deformable cutting simulation · Visuotactile imitation learning](catalog/manipulation/dexterous/demonstrations/generation.md#am-man-dex-demo-1)<br>[Gen2Dex｜Video demonstrations · Retargeting · RL trajectory optimization](catalog/manipulation/dexterous/demonstrations/generation.md#am-man-dex-demo-v2r-1)<br>[DexAgent｜Video demonstrations · Agent-built simulation · Data augmentation](catalog/manipulation/dexterous/demonstrations/generation.md#am-man-dex-demo-v2r-2)<br>[EgoMatrix｜Contact-consistent reconstruction · RL manipulation transfer · Paired action–video generation](catalog/manipulation/dexterous/demonstrations/generation.md#am-man-dex-demo-v2r-3)<br>[EgoCPT｜Human-video transfer · Joint contact–force optimization · Residual RL](catalog/manipulation/dexterous/demonstrations/generation.md#am-man-dex-demo-v2r-4)<br>[Hand2Robot｜Human-video transfer · Object-centric 4D reconstruction · VLA post-training](catalog/manipulation/dexterous/demonstrations/generation.md#am-man-dex-demo-v2r-5) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Robot Manipulation Policies and Control → Action Policy Learning | 9 | [Open](catalog/manipulation/dexterous/policies/policy-learning.md) | [No Eyes, No Problem｜In-hand manipulation · RL · Tactile](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-inhand-rl-1)<br>[EgoJEPA｜Human-video pretraining · Latent-action transfer · WAM](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-policy-learning-1)<br>[Coordi-π｜VLA · AE action representation · Bimanual coordination](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-policy-learning-2)<br>[HiFun｜Hierarchical RL · Arm–hand coordination · Human-in-the-loop learning](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-policy-learning-3)<br>[FACT｜WAM · Joint force–action prediction · Tactile closed-loop refinement](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-policy-learning-4)<br>[DexMimic｜RL trajectory tracking · Value-guided resets · Multi-trajectory training](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-policy-learning-5)<br>[XL-VLA｜Cross-hand transfer · Unified latent action space · VLA](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-policy-learning-6)<br>[DexCast｜HOI geometry transfer · Skeletal-temporal motion encoding · 3D diffusion policy](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-policy-learning-7)<br>[TTP｜VLA · Tactile fusion · Joint action/touch prediction](catalog/manipulation/dexterous/policies/policy-learning.md#am-man-dex-vla-tactile-1) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Robot Manipulation Policies and Control → Skill Learning and Composition | 1 | [Open](catalog/manipulation/dexterous/policies/skill-composition.md) | [DexStitch｜Human-video transfer · Contact-aware conversion · Skill transitions and composition](catalog/manipulation/dexterous/policies/skill-composition.md#am-man-dex-policy-skill-1) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Robot Manipulation Policies and Control → World Models and Planning-Based Control | 1 | [Open](catalog/manipulation/dexterous/policies/world-model-planning.md) | [DSP｜In-hand manipulation · Autonomous interaction collection · World model + MPC](catalog/manipulation/dexterous/policies/world-model-planning.md#am-man-dex-policy-planning-1) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Robot Manipulation Policies and Control → Execution Feedback and Action Correction | 2 | [Open](catalog/manipulation/dexterous/policies/execution-feedback.md) | [FOMO-Dex｜Force-feedback compliance · Task-direction selection · Corrected-action imitation learning](catalog/manipulation/dexterous/policies/execution-feedback.md#am-man-dex-policy-feedback-1)<br>[AgenticTactileVLA｜VLA · Contact feedback · Online action correction](catalog/manipulation/dexterous/policies/execution-feedback.md#am-man-dex-vla-feedback-1) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Agent Architectures | 4 | [Open](catalog/manipulation/dexterous/agent-architectures.md) | [AdaClearGrasp｜Adaptive clearing · RL dexterous grasping · Failure replanning](catalog/manipulation/dexterous/agent-architectures.md#am-man-dex-agent-2)<br>[GOTT｜Cross-hand contact primitive · Object-trajectory interface · Staged execution](catalog/manipulation/dexterous/agent-architectures.md#am-man-dex-agent-4)<br>[RoboDexVLM｜VLM Agent · Task planning · Failure replanning](catalog/manipulation/dexterous/agent-architectures.md#am-man-dex-agent-1)<br>[DexGraspVLA｜Hierarchical VLA · Domain-invariant visual representations · Diffusion imitation learning](catalog/manipulation/dexterous/agent-architectures.md#am-man-dex-agent-3) |
| Manipulation Action Models → Multi-Fingered Dexterous Hand Manipulation Research → Human Hand Motion and Manipulation Video Modeling | 1 | [Open](catalog/manipulation/dexterous/human-hand-modeling.md) | [P³-WAM｜Unified perception, prediction and planning](catalog/manipulation/dexterous/human-hand-modeling.md#am-man-dex-human-unified-1) |
| Manipulation Action Models → Common Methods → Execution Efficiency and Temporal Control | 1 | [Open](catalog/manipulation/common-methods/execution-efficiency.md) | [PaceVLA｜VLA · Execution speedup · Temporal action granularity](catalog/manipulation/common-methods/execution-efficiency.md#am-man-method-eff-1) |
| Navigation Action Models | 0 | [Open](catalog/navigation.md) | — |
| Body Motion and Whole-Body Control Models → Bimanual and Torso-Assisted Manipulation | 1 | [Open](catalog/whole-body-control/arm-torso-manipulation.md) | [WBD｜RL expert distillation · Diffusion policy · Command refinement](catalog/whole-body-control/arm-torso-manipulation.md#am-wbc-arm-torso-1) |

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
| [site/index.html](site/index.html) | Generated interactive map sharing canonical data with the catalog and static map |
| [docs/scope.md](docs/scope.md) | Scope, classification boundaries, and supporting surveys |

## Growing the Collection

Every work needs a concise source-backed record. Benchmark summaries specify hand types, task counts, same-task cross-hand reuse, release status, and the key distinction. Detailed notes are optional. Keep paper claims, published assets, evaluated configurations, and reproduced results distinct; retain explicit unknowns.

After editing source data, run:

```bash
python3 scripts/build_catalog.py
python3 scripts/build_catalog.py --check
python3 -m unittest discover -s tests -v
node --test tests/test_map_core.cjs
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for fields, templates, and workflow. Homepages, category pages, and maps are generated from the same records.

## Acknowledgments

Map presentation and category-based indexing were inspired by [Hand3DResearch](https://github.com/SeanChenxy/Hand3DResearch). This repository independently maintains its embodied-action scope and categories.
