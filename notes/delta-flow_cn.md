# Δ-Flow

[返回比较总览](latency-review_cn.md) · [论文](https://arxiv.org/abs/2610.15794v1)

版本：arXiv v1 · 更新：2026-10-22

## 方法

从近期动作或视觉历史构造带轻噪声的起点，学习残差迁移，实现 VLA/WAM 单步生成。

## 实验与适用范围

π0.5、ImageWAM、Fast-WAM 的 LIBERO/Plus 实验；A100-80GB 本地策略调用计时。WAM 动作起点的免训练适配是另一个实验设置。

完整训练方案与 frozen WAM 的动作起点替换不是同一个实验。

## 待研究问题

核对动作表示、历史对齐以及外部动态变化时历史先验是否过时。

## 参考

- [论文版本](https://arxiv.org/abs/2610.15794v1)
- [论文正文](https://arxiv.org/html/2610.15794v1)
