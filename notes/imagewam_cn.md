# ImageWAM

[返回比较总览](latency-review_cn.md) · [论文](https://arxiv.org/abs/2606.19531v1)

版本：arXiv v1 · 更新：2026-10-22

## 方法

以图像编辑去噪的 KV 上下文驱动动作 Flow 专家，替代稠密未来视频，推理无需解码目标 RGB。

## 实验与适用范围

仿真与真机对比。推理保留图像编辑潜变量计算，无需解码未来 RGB；详细计时配置待补。

不解码未来 RGB 不代表完全没有视觉世界模型计算。

## 待研究问题

单独 profile 编辑上下文构建、KV 复用与动作生成；先定位实际瓶颈。

## 参考

- [论文版本](https://arxiv.org/abs/2606.19531v1)
- [官方资源](https://github.com/yuyangalin/ImageWAM)
