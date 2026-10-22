# MARS Policy

[返回比较总览](latency-review_cn.md) · [论文](https://arxiv.org/abs/2605.29766v1)

版本：arXiv v1 · 更新：2026-10-22

## 方法

学习历史先验与随机性的混合程度，并按学得的多模态权重分配求解步数。

## 实验与适用范围

8 项仿真与 4 项真机任务，包括 Franka Research3 和 Galaxea R1 Lite；π0.5 适配情况待核对。

多模态权重参与训练，并用于推理阶段的步数分配。

## 待研究问题

多模态权重与动态场景的观测过时不等价，二者需要分别测量。

## 参考

- [论文版本](https://arxiv.org/abs/2605.29766v1)
- [论文正文](https://arxiv.org/html/2605.29766v1)
