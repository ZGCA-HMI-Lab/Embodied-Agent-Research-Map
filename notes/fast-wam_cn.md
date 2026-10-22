# Fast-WAM

[返回比较总览](latency-review_cn.md) · [论文](https://arxiv.org/abs/2603.16666v2)

版本：arXiv v2 · 更新：2026-10-22

## 方法

保留视频联合训练，在推理时移除显式未来生成，区分训练表征收益与部署成本。

## 实验与适用范围

LIBERO、RoboTwin 与真机；论文在其评测设置下报告 190 ms。

训练期视频建模与测试期未来生成分开讨论。

## 待研究问题

在动态任务和分布变化下，去掉测试期未来分支是否仍划算？属于待验证问题。

## 参考

- [论文版本](https://arxiv.org/abs/2603.16666v2)
- [官方资源](https://huggingface.co/yuanty/fastwam)
