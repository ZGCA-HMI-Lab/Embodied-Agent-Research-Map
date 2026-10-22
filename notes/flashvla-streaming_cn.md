# FlashVLA (streaming)

[返回比较总览](latency-review_cn.md) · [论文](https://arxiv.org/abs/2608.27384v1)

版本：arXiv v1 · 更新：2026-10-22

## 方法

用错开噪声等级的动作缓冲与块级因果注意力，使预热后的流每次前向输出一个可执行动作块。

## 实验与适用范围

π0.5、SmolVLA、LingBot-VLA；LIBERO/RoboTwin 2.0 与 Franka。每个块仍经历多级去噪，需要微调并考虑冷启动。

每次前向产出一块是预热后的稳态性质；单块仍经历多次去噪。

## 待研究问题

计入冷启动、缓冲深度、动作块大小与观测年龄，避免将吞吐当成单块从噪声到输出的延迟。

## 参考

- [论文版本](https://arxiv.org/abs/2608.27384v1)
- [论文正文](https://arxiv.org/html/2608.27384v1)
