# BiDex-100: Bimanual Dexterous Capability Benchmark

Record: `AM.MAN.DEX.BENCH.1`. Initial reading; verified 2026-10-20; experiments not reproduced.

[Back to category index](../catalog/manipulation/dexterous/benchmarks.md)

*BiDex-100: A Comprehensive Benchmark for Bimanual Dexterous Manipulation Across 100+ Simulation Tasks* — Yong Wang et al.

- **Measures:** 106 MuJoCo tasks and 8,080 demonstrations across generalization, instruction following, limited demonstrations, long horizon, and memory.
- **Hands and reuse:** Both platforms use Sharpa Wave (22 DoF), with 58-dimensional joint actions and 96 / 10 assigned tasks. No same-task comparison across different hand types is provided.
- **Release:** [Official code](https://github.com/robbyant-research/BiDex-100) provides the environments and protocol; the [official dataset](https://huggingface.co/datasets/Robbyant-Research/BiDex-100) publishes demonstrations and assets. LeRobot v2.1 / v3.0 are two formats of the same data.

Sources: [Abstract](https://arxiv.org/abs/2610.25459v1), [Sections III–V](https://arxiv.org/html/2610.25459v1).
