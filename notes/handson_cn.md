# HandsOn｜灵巧操作泛化基准

条目编号：`AM.MAN.DEX.BENCH.2`。初读记录，核验日期：2026-10-20；未复现实验。

[返回分类索引](../catalog/manipulation/dexterous/benchmarks_cn.md)

*HandsOn: A Large-Scale Simulation Benchmark for Generalizable Dexterous Manipulation* — Tianwei Luo 等。

- **测什么：** 66 个任务、18,000 条示范；Core-50 用于学习与执行评测，Transfer-16 保留用于新资产关系、技能组合和可变形物体交互的迁移评测。
- **手型与复用：** 摘要称支持 6 手，但[当前公开资产说明](https://github.com/TsinghuaC3I/HandsOn/blob/main/docs/robot-assets.md)列出的手型为 Wuji 1、Wuji 2 beta1、Sharpa Wave、Allegro V3；完整六手口径尚未核实。该说明明确当前 66 任务执行器使用 ROKAE＋Wuji 1，其他手型还需装配、控制／重定向、碰撞与任务成功条件适配；不能据资产存在就认为同任务跨手已跑通。
- **开放状态：** [基准代码](https://github.com/TsinghuaC3I/HandsOn)和 [PhysX 示范数据](https://huggingface.co/datasets/Cyan666/HandsOn-Datasets)已公开；Newton 数据标为待发布。实机展示仍为定性结果。

来源：[摘要](https://arxiv.org/abs/2610.26765v1)、[原文第 3–5 节](https://arxiv.org/html/2610.26765v1)。
