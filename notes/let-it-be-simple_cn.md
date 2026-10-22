# Let It Be Simple

[返回比较总览](latency-review_cn.md) · [论文](https://arxiv.org/abs/2606.05737v3)

核验：2026-10-22；版本：arXiv v3。状态：资料索引，未进行本地复现，也不表示用户已精读。

## 定位

将标准 Flow Matching 的训练时间采样向噪声端偏移，获得无需蒸馏的一步策略。

## 验证范围与边界

LIBERO 系列、多种 VLA 架构与真机；RTX 5090 的模型前向计时不含 I/O 和网络。结果依赖训练配置与重规划设置。

核验 v3（2026-10-21），不照搬旧聊天中的表号。

## 面向当前方向的阅读问题

先比较相同 checkpoint 的 Flow 1/2/5/10 × Execute 5/10，再讨论是否需要高噪声训练；这是研究建议，尚无本地结果。

以上问题是本仓库的研究判断，不能当作作者已证实的结论。

## 原始证据

- [论文版本](https://arxiv.org/abs/2606.05737v3)
- [论文正文](https://arxiv.org/html/2606.05737v3)
- [官方资源](https://github.com/bondtesty/let-it-be-simple)
