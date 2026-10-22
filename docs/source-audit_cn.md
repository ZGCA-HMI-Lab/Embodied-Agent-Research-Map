# 文献版本与资源

[首页](../README_cn.md) · [比较笔记](../notes/latency-review_cn.md)

更新：2026-10-22。论文版本固定在下表；后续修订在原条目更新。

## 论文版本

| 名称 | 核验版本 | 原始来源 |
|---|---|---|
| ElegantVLA | arXiv v1 | [原始页面](https://arxiv.org/abs/2605.29438v1) |
| FlashVLA (reuse, 2025) | arXiv v1 | [原始页面](https://arxiv.org/abs/2505.21200v1) |
| Let It Be Simple | arXiv v3 | [原始页面](https://arxiv.org/abs/2606.05737v3) |
| SnapFlow | arXiv v2 | [原始页面](https://arxiv.org/abs/2604.05656v2) |
| A2A | RSS 2026; arXiv v2 | [原始页面](https://arxiv.org/abs/2602.07322v2) |
| STEP | ICML 2026 / PMLR 306 | [原始页面](https://proceedings.mlr.press/v306/li26aa.html) |
| Δ-Flow | arXiv v1 | [原始页面](https://arxiv.org/abs/2610.15794v1) |
| MARS Policy | arXiv v1 | [原始页面](https://arxiv.org/abs/2605.29766v1) |
| RTC | NeurIPS 2025; arXiv v2 | [原始页面](https://arxiv.org/abs/2506.07339v2) |
| FutureRTC | arXiv v1 | [原始页面](https://arxiv.org/abs/2607.24008v1) |
| FlashVLA (streaming) | arXiv v1 | [原始页面](https://arxiv.org/abs/2608.27384v1) |
| AR-VLA | RSS 2026; arXiv v2 | [原始页面](https://arxiv.org/abs/2603.10126v2) |
| PaceVLA | arXiv v2 | [原始页面](https://arxiv.org/abs/2610.25961v2) |
| Fast-WAM | arXiv v2 | [原始页面](https://arxiv.org/abs/2603.16666v2) |
| ImageWAM | arXiv v1 | [原始页面](https://arxiv.org/abs/2606.19531v1) |
| π0.5 | arXiv v1 | [原始页面](https://arxiv.org/abs/2504.16054v1) |

## 名称与方法区别

- FlashVLA：2505.21200 研究动作复用与 token 压缩；2608.27384 研究流式异步解码。两篇论文分别收录。
- ElegantVLA 冻结基座、训练调度器；FutureRTC 保持底层策略不变、学习预测与校正模块。
- Δ-Flow 的完整训练方案与冻结 WAM 的动作源替换实验分别记录。
- Fast-WAM、ImageWAM 同时涉及架构与效率；π0.5 为策略背景文献。

## 官方实现

- [Let It Be Simple](https://github.com/bondtesty/let-it-be-simple)
- [STEP](https://github.com/Kimho666/STEP)
- [FlashVLA streaming](https://github.com/z-lab/flashvla)
- [ImageWAM](https://github.com/yuyangalin/ImageWAM)
- [Fast-WAM](https://github.com/yuantianyuan01/FastWAM)

[FutureRTC 项目页](https://jianghaiscu.github.io/FutureRTC_proj/)标注代码待发布。其余条目的代码、权重和数据开放情况仍待核对。

## 待补资料

1. A2A、STEP、MARS、FlashVLA 2025、AR-VLA、ImageWAM：逐实验摘录硬件、batch、预测/执行 horizon、控制频率和预热/同步方式。
2. FutureRTC：预测模块额外耗时、推理硬件及代码发布情况。
3. 各方法：checkpoint、动作表示、训练数据和平台适配条件。
4. 历史视觉、观测年龄调度与动态目标控制的对照实验和相关文献。
