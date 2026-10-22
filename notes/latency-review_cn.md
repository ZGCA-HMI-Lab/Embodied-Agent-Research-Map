# VLA / WAM 真机延迟优化：论文比较与阅读路线

[首页](../README_cn.md) · [全部分类](../catalog/README_cn.md) · [核验记录](../docs/source-audit_cn.md)

更新：2026-10-22。本文比较各方法的训练成本、推理路径与控制时序，表中性能均引用论文结果。

## 先按瓶颈阅读

| 主线 | 论文 |
|---|---|
| 感知与 VLM 复用 | [ElegantVLA](elegantvla_cn.md)、[FlashVLA (reuse, 2025)](flashvla-reuse_cn.md) |
| 一步生成与蒸馏 | [Let It Be Simple](let-it-be-simple_cn.md)、[SnapFlow](snapflow_cn.md) |
| 历史先验与热启动 | [A2A](a2a_cn.md)、[STEP](step_cn.md)、[Δ-Flow](delta-flow_cn.md) |
| 自适应采样预算 | [MARS Policy](mars-policy_cn.md) |
| 异步执行与延迟补偿 | [RTC](rtc_cn.md)、[FutureRTC](futurertc_cn.md)、[FlashVLA (streaming)](flashvla-streaming_cn.md)、[AR-VLA](ar-vla_cn.md) |
| 执行时序与动作粒度 | [PaceVLA](pacevla_cn.md) |
| WAM 与策略基座 | [Fast-WAM](fast-wam_cn.md)、[ImageWAM](imagewam_cn.md)、[π0.5](pi05_cn.md) |

共整理 16 篇。Fast-WAM 和 ImageWAM 放在基座分类，便于比较视觉分支的计算路径；π0.5 用于说明策略架构。

## 训练、结构与推理改动

| 工作 | 训练/适配成本 | 结构或推理改动 | 历史、自适应与当前方向的关系 |
|---|---|---|---|
| [Let It Be Simple](let-it-be-simple_cn.md) | 高噪声训练；另有现成模型直接一步的实验 | 标准 FM 单步解码 | 先诊断单帧条件下的一步能力 |
| [SnapFlow](snapflow_cn.md) | 自蒸馏微调 | 增加目标时间投影与捷径监督 | 比较额外训练是否优于简单减少步数 |
| [A2A](a2a_cn.md) | 训练历史潜变量策略 | 历史动作作为源 | 历史起点路线，不能直接假定适配现有 VLA |
| [STEP](step_cn.md) | 学习热启动机制 | 初始动作预测后少步修正 | 需计入额外预测成本 |
| [Δ-Flow](delta-flow_cn.md) | 主方法训练/微调；另测 frozen WAM 适配 | 历史源残差迁移 | 动作历史与视觉分支分别分析 |
| [MARS](mars-policy_cn.md) | 学习混合权重与策略 | 动态随机性和步数 | 多模态程度不是观测年龄 |
| [ElegantVLA](elegantvla_cn.md) | 两阶段 RL 调度；基座冻结 | VLM/视觉复用与 AE 模式联合调度 | 是阶段自适应计算的直接相关工作 |
| [FlashVLA 2025](flashvla-reuse_cn.md) | 免训练 | token 选择与动作复用 | 外部环境变化可能要求刷新 |
| [RTC](rtc_cn.md) | 无策略重训 | 冻结前缀、引导补全、异步执行 | 主要解决执行错位 |
| [FutureRTC](futurertc_cn.md) | 学习预测/校正模块，底层策略保持不变 | 预测执行时刻视觉与本体输入 | 与观测时效性主线直接相关 |
| [FlashVLA 2026](flashvla-streaming_cn.md) | 多缓冲微调 | 错噪声缓冲、块级因果注意力 | 联合摊销去噪与保证异步衔接 |
| [AR-VLA](ar-vla_cn.md) | 独立动作专家训练路线 | 持续自回归记忆与重锚定 | 处理慢感知、快控制频率差 |
| [PaceVLA](pacevla_cn.md) | 多模式动作监督与选择模块 | 动作时间粒度及 horizon 路由 | 属于执行效率，单次推理没有提速 |
| [Fast-WAM](fast-wam_cn.md) | 视频联合训练 | 测试期跳过未来生成 | 分开研究训练表征与推理代价 |
| [ImageWAM](imagewam_cn.md) | 图像编辑基座与动作学习 | 编辑去噪 KV 驱动动作专家 | 区分视觉潜变量计算与 RGB 解码 |
| [π0.5](pi05_cn.md) | 通用策略联合训练 | 当前方向的参考基座 | 不作为专门加速方法计数 |

## 延迟与计时设置

下表列出论文中的计时设置。各实验的硬件、权重、编译方式和计时范围不同，数值用于理解各自方法的收益。

| 工作与版本 | 硬件/设置 | 计时结果与对应基线 | 口径与限制 |
|---|---|---|---|
| [Let It Be Simple v3，附录 G.1](https://arxiv.org/html/2606.05737v3) | RTX 5090，batch=1，50 次预热后调用均值 | 多种架构单步相对多步前向约 1.5–3.4× | 模型前向；不含 I/O 变换、网络、仿真；并非统一 π0.5 加速比 |
| [SnapFlow v2，附录 G](https://arxiv.org/html/2604.05656v2) | A800-80G，归档 π0.5，batch=1，同步计时 | 原始 10-NFE 274 ms → 自蒸馏 1-NFE 83 ms；原始直接 1-NFE 为 81 ms | 模型路径；质量比较要同时保留原始一步基线 |
| [Δ-Flow v1，§5.4 / 附录 B](https://arxiv.org/html/2610.15794v1) | A100-80GB，本地策略调用 | π0.5 82.91 → 53.99 ms；ImageWAM 296.31 → 118.87 ms；Fast-WAM 稀疏联合基线 857.54 → 192.62 ms | 包含在线文本、源构造等；不含通信、仿真、未来 RGB 解码；Fast-WAM 比较对象不是原论文 action-only 路径 |
| [ElegantVLA v1，Table 4 / 附录 A](https://arxiv.org/html/2605.29438v1) | RTX 4090；SimplerEnv/Franka | 在对应 GR00T 设置报告更高频率与更低每步延迟 | 分别报告 FLOPs 与实际延迟 |
| [FlashVLA 2026 v1，§4–5 / 附录 A](https://arxiv.org/html/2608.27384v1) | 仿真 RTX 4090；Franka 真机 RTX A4000 | 论文报告最高 2.43× 每动作端到端加速与单卡 ≥30 Hz | 需区分每动作/每块、冷启动/稳态；不同 chunk/buffer 配置不能当相同任务接口 |
| [PaceVLA v2，Table 6](https://arxiv.org/html/2610.25961v2) | RTX 5090，RoboCasa-Kitchen，100 次均值 | GR00T N1.5 40.07 ms → PaceVLA 42.15 ms | 单次推理略慢；收益是执行效率而非计算延迟 |

其他论文的硬件、horizon、执行步数和计时范围待补，见[核验清单](../docs/source-audit_cn.md)。

## 当前方向的研究问题

1. **AE 的计算是否是实际瓶颈？** 用同一 checkpoint 拆分感知/VLM、AE 单步/全采样及完整策略调用。不同系统的 AE 占比不能直接套用。
2. **历史信息改善的是条件还是起点？** 分别比较历史视觉作为条件、历史动作作为条件、历史动作作为生成源。A2A/Δ-Flow 不能自动证明“视觉历史降低条件歧义”这一假设成立。
3. **生成变快能否改善闭环？** 同时扫 Flow 步数和重规划执行步数，记录动作连续性与成功率；更频繁调用策略不一定更好。
4. **调度依据是否应包含环境动态和观测年龄？** 与 ElegantVLA 的阶段调度、MARS 的多模态权重、FutureRTC 的未来条件分别比较。重点比较相同预算下的闭环收益。
5. **WAM 是否需要测试期未来建模？** 将 Fast-WAM、ImageWAM 与 Δ-Flow 放在同一实现和任务设置中分析，避免只比较不同作者的延迟数字。

## 建议阅读顺序与实验记录

先读 Let It Be Simple → SnapFlow → A2A/Δ-Flow，建立“一步输出、训练目标、历史源”的区别；再读 RTC → FutureRTC → FlashVLA 2026/AR-VLA，理解时间对齐；最后看 ElegantVLA/MARS/PaceVLA 如何选择计算与执行预算。Fast-WAM/ImageWAM 用于补齐视觉分支背景。

后续实验表至少记录 checkpoint/commit、设备、相机、精度/编译、预热、采样步数、预测 horizon、执行步数、延迟注入、成功率、均值/P95 延迟、观测年龄、任务完成时间和 jerk。
