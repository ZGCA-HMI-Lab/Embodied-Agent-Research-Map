# 来源核验、消歧与待补信息

[首页](../README_cn.md) · [比较笔记](../notes/latency-review_cn.md)

核验日期：2026-10-22。以下链接用于核对元信息、摘要与选定方法/实验章节，不代表已逐页精读或复现实验。JSON 内 sources 保存相同的原始证据入口。

## 当前收录与版本

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

## 旧会话线索处理

旧会话最后一条“论文汇总”回答只返回引用占位符；其余可读讨论用于候选发现，不将聊天内容作为论文实验的证据。12 个候选名称均已找到原始来源，但不能据此保证旧会话完整名单已全部取回。

- **FlashVLA 消歧：** 2505.21200 是动作复用/token 压缩；2608.27384 是流式异步解码。两者作者、年份和方法不同，分成两个 slug。
- **版本更新：** Let It Be Simple 使用 v3，SnapFlow、PaceVLA、A2A、AR-VLA、RTC、Fast-WAM 使用页面当前列明的 v2；其余 arXiv 条目固定到 v1，STEP 使用 ICML/PMLR 正式页。版本与日期仅代表本次核验时的状态。
- **训练边界：** ElegantVLA 的基座冻结不等于调度器免训练；FutureRTC 的策略保持不变不等于预测模块免训练；Δ-Flow 的完整方法与动作源免训练替换实验分开记录。
- **WAM 背景：** ImageWAM、Fast-WAM、π0.5 来自会话中的基座线索。前两者也有自身效率贡献，未把它们简单算成三篇新增 VLA 加速器。
- **模板清理：** 移除原示例中无关的 5 篇记录与 6 份单篇笔记；旧编号退役。PaceVLA 清除旧内容后依新方向重新整理，保持原 slug/id。旧生成分类页删除后重建。

## 代码与资源状态

只有确认的作者资源才写入 links.code；没有 code 字段表示本次没有核实可用的官方实现，不表示一定不存在。没有下载权重或执行代码。

- [Let It Be Simple](https://github.com/bondtesty/let-it-be-simple)、[STEP](https://github.com/Kimho666/STEP)、[FlashVLA streaming](https://github.com/z-lab/flashvla)、[ImageWAM](https://github.com/yuyangalin/ImageWAM)、[Fast-WAM](https://github.com/yuantianyuan01/FastWAM)有作者论文/项目指向的实现入口。
- [FutureRTC 项目页](https://jianghaiscu.github.io/FutureRTC_proj/)当前明确写 code will be released，故不把页面上的 Code 按钮当成已发布实现。
- 其他条目的项目入口可供继续跟进；本次未核实的代码、checkpoint 和数据开放状态不补猜。

## 待补清单

当前没有因论文身份无法确认而排除的初始候选，但仍有下面的精读工作：

1. A2A、STEP、MARS、FlashVLA 2025、AR-VLA、ImageWAM：逐实验提取计时硬件、batch、预测 horizon、执行 horizon、控制频率和预热/同步方式。
2. FutureRTC：分开记录推理设备与训练设备，提取预测模块额外耗时；关注官方代码发布状态。
3. 各方法：逐项确认 checkpoint、动作表示、训练数据和平台适配条件，不能直接将作者的最优结果作为本地 π0.5 预期结果。
4. 动态外部目标、观测年龄调度、历史视觉消歧：目前作为研究问题，尚未完成系统性文献覆盖或 novelty 检索，不能声称无人做过。
5. 若后续取得旧会话最后汇总的完整内容，再按标题/作者/论文标识去重增补；不从引用占位符编造缺失论文。
