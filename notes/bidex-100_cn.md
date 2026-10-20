# BiDex-100｜双手灵巧操作能力基准

条目编号：`AM.MAN.DEX.BENCH.1`。初读记录，核验日期：2026-10-20；未复现实验。

[返回分类索引](../catalog/manipulation/dexterous/benchmarks_cn.md)

*BiDex-100: A Comprehensive Benchmark for Bimanual Dexterous Manipulation Across 100+ Simulation Tasks* — Yong Wang 等。

- **测什么：** MuJoCo 中的 106 个任务、8,080 条示范，围绕泛化、指令遵循、少量示范、长时序与记忆五个轴评测。
- **手型与复用：** 两个平台都使用 Sharpa Wave（22 DoF），统一 58 维关节动作；任务指定平台分别为 96／10 个，未提供同一任务换不同手型的对照。
- **开放状态：** [官方代码](https://github.com/robbyant-research/BiDex-100)包含环境与评测协议；[官方数据仓库](https://huggingface.co/datasets/Robbyant-Research/BiDex-100)公开示范与资产，LeRobot v2.1／v3.0 是同一批数据的两种格式。

来源：[摘要](https://arxiv.org/abs/2610.25459v1)、[原文第 III–V 节](https://arxiv.org/html/2610.25459v1)。
