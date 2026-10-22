# STEP

[返回比较总览](latency-review_cn.md) · [论文](https://proceedings.mlr.press/v306/li26aa.html)

版本：ICML 2026 / PMLR 306 · 更新：2026-10-22

## 方法

学习具有时空一致性的热启动动作，再用少量扩散步骤修正，并通过扰动机制缓解执行停滞。

## 实验与适用范围

9 个仿真基准与 2 项真机任务，报告两步采样；硬件与逐基准 horizon 待补。

正式版本发表于 ICML 2026，PMLR 306。

## 待研究问题

比较热启动预测器的额外耗时与减少扩散步数的收益，单独记录停滞问题。

## 参考

- [官方资源](https://proceedings.mlr.press/v306/li26aa.html)
