# HandsOn: Dexterous Generalization Benchmark

Record: `AM.MAN.DEX.BENCH.2`. Initial reading; verified 2026-10-20; experiments not reproduced.

[Back to category index](../catalog/manipulation/dexterous/benchmarks.md)

*HandsOn: A Large-Scale Simulation Benchmark for Generalizable Dexterous Manipulation* — Tianwei Luo et al.

- **Measures:** 66 tasks and 18,000 demonstrations; Core-50 supports learning and execution evaluation, while Transfer-16 holds out asset relations, skill compositions, and deformable interactions.
- **Hands and reuse:** The abstract claims six hands, while the [current asset manifest](https://github.com/TsinghuaC3I/HandsOn/blob/main/docs/robot-assets.md) names Wuji 1, Wuji 2 beta1, Sharpa Wave, and Allegro V3; the full six-hand accounting remains unverified. The manifest states that the 66-task evaluator uses ROKAE + Wuji 1. Other hands need mounting, control or retargeting, collision checks, and task-success qualification; asset availability does not demonstrate same-task cross-hand execution.
- **Release:** [Benchmark code](https://github.com/TsinghuaC3I/HandsOn) and [PhysX demonstration data](https://huggingface.co/datasets/Cyan666/HandsOn-Datasets) are public; Newton data is pending. Physical rollouts remain qualitative.

Sources: [Abstract](https://arxiv.org/abs/2610.26765v1), [Sections 3–5](https://arxiv.org/html/2610.26765v1).
