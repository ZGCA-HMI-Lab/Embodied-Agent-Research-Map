# Let It Be Simple

[返回比较总览](latency-review_cn.md) · [论文](https://arxiv.org/abs/2606.05737v3)

版本：arXiv v3 · 更新：2026-10-22

## 方法

将标准 Flow Matching 的训练时间采样向噪声端偏移，获得无需蒸馏的一步策略。

## 实验与适用范围

LIBERO 系列、多种 VLA 架构与真机；RTX 5090 的模型前向计时不含 I/O 和网络。结果依赖训练配置与重规划设置。

v3（2026-10-21）增加了生成映射的几何分析和更多模型对照。

## 待研究问题

固定 checkpoint，比较 Flow 步数 1/2/5/10 与执行步数 5/10 的组合，观察成功率和动作连续性，再评估高噪声训练的收益。

## 参考

- [论文版本](https://arxiv.org/abs/2606.05737v3)
- [论文正文](https://arxiv.org/html/2606.05737v3)
- [官方资源](https://github.com/bondtesty/let-it-be-simple)
