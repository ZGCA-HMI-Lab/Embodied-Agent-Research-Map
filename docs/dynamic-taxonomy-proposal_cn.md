# 动态任务文献扩展：分类分析与迁移建议

日期：2026-10-22。状态：暂缓，尚未实施。

本提案讨论动态感知、实时重规划与反馈控制相关论文的分类方式。下表列出 15 篇方法论文，另附 DOMINO/PUMA 与 DynamicVLA/DOM 两篇方法和基准文献。

## 结论

需要扩展分类，但不建议把全部新论文塞进“动态任务”单一分支，也不另建一套平行论文库。主分类继续回答“主要解决什么瓶颈、采用什么机制”；动态任务作为可横向检索的评测维度。

建议地图名称扩展为“VLA / WAM 实时与动态控制”，保留现有七个末端分类的编码和路径，新增五个分类，合计十二个末端分类。论文 ID/slug 保持稳定；移动分类不重新编号。

## 现有结构的缺口

1. LAT.VLM 只覆盖计算复用，无法自然容纳运动感知、物理时间、策略记忆与未来条件。
2. LAT.ASYNC 混放前缀约束、未来条件、持续生成。新增 REACT/RAVEL 后，同一列表会掩盖关键机制差异。
3. 缺少独立的快反馈与残差修正入口；[DSDyn-VLA](https://arxiv.org/abs/2609.39198)把慢规划与快 RL 修正明确分开。
4. 缺少执行前验证入口；[PACT-VLA](https://arxiv.org/abs/2610.28019)选择完整候选动作，而非持续修改中间生成状态。
5. 缺少动态数据与评测入口；[DOMINO/PUMA](https://arxiv.org/abs/2603.15620v3)和[DynamicVLA/DOM](https://arxiv.org/abs/2601.22153v2)各在同一论文中同时引入方法和基准，必须避免按名称重复编号。

## 建议分类树

```text
VLA / WAM 实时与动态控制
├─ 感知与时序表征
│  ├─ 感知计算与语义复用              LAT.VLM       保留路径，扩展显示名
│  └─ 动态感知、记忆与预测条件         LAT.REPR      新增
├─ 动作与世界生成
│  ├─ 一步/少步生成与蒸馏             LAT.GEN.STEP  保留
│  ├─ 历史先验与热启动                LAT.GEN.HIST  保留
│  └─ 自适应采样预算                  LAT.GEN.ADAPT 保留
├─ 实时闭环与执行
│  ├─ 异步时间对齐与前缀约束           LAT.ASYNC     保留路径，收窄边界
│  ├─ 流式生成与持续重规划             LAT.STREAM    新增
│  ├─ 快速反馈与残差修正               LAT.FEEDBACK  新增
│  ├─ 候选验证与执行前选择             LAT.SELECT    新增
│  └─ 执行时序与动作粒度               LAT.EXEC      保留
├─ 基座与架构背景                     LAT.BASE      保留
└─ 动态数据与评测基准                 LAT.BENCH     新增
```

新增路径拟为 perception/temporal-representations、execution/streaming、execution/feedback、execution/candidate-selection、benchmarks/dynamic。不调整已有 catalog_path，不制造旧页面断链。

暂不把运动、记忆、物理时间、未来条件各拆成独立末端分类：当前用 LAT.REPR 配合标签表达，待条目增多且边界稳定后再分。物理时间输入与时间演化记忆也不是同一机制，分别标记 timestamp-conditioning、physical-time-memory。

## 首批直接链接论文的拟归类

以下为基于原始摘要的初步归类；正式收录前再核验方法和评测范围。序号是候选清单位置，不是论文 ID。

| # | 论文与原始来源 | 建议主分类 | 交叉关系与限制 |
|---|---|---|---|
| 1 | [DSDyn-VLA](https://arxiv.org/abs/2609.39198) | LAT.FEEDBACK | 关联动态表征、时间对齐与 DynBench；不是仅靠减少推理步数 |
| 2 | [EAPN](https://arxiv.org/abs/2610.06090) | LAT.ASYNC | 关联历史源；传播执行对齐的随机轨迹，不能直接等同于 REACT 式持续去噪 |
| 3 | [Adaptive Mean Flow](https://arxiv.org/abs/2610.06089) | LAT.GEN.HIST | 关联一步生成、持续重规划；利用受扰动的前次预测保持连续性 |
| 4 | [FLEX-WAM](https://arxiv.org/abs/2610.05483) | LAT.BASE | 关联流式架构；长时序想象与规划不自动等价于外部运动目标闭环控制 |
| 5 | [RealtimeWAM](https://arxiv.org/abs/2610.06617v2) | LAT.GEN.STEP | 专家间 KV 流水线与机器人执行异步要分别记录 |
| 6 | [REACT](https://arxiv.org/abs/2610.12007) | LAT.STREAM | 新观测下更新持续缓冲中的中间去噪状态 |
| 7 | [RAFC](https://arxiv.org/abs/2610.11956) | LAT.REPR | 未来条件的时间匹配与可靠性；不是简单比较未来生成画质 |
| 8 | [RAVEL](https://arxiv.org/abs/2609.34170) | LAT.STREAM | 关联 VLM 解耦、快速观测路径；不等于外置 residual policy |
| 9 | [Chronos Policy](https://arxiv.org/abs/2610.13929) | LAT.REPR | 关联异步时间对齐；显式观测/执行时间条件 |
| 10 | [BOPI](https://arxiv.org/abs/2610.13087) | LAT.BASE | 人形推车与信念相关的部分反演重规划，作为邻近技术参考，不冒充 VLA 动态抓取基线 |
| 11 | [Temporal Flow Policy](https://arxiv.org/abs/2610.20524) | LAT.REPR | 随测得物理时间演化的记忆；与生成缓冲状态区分 |
| 12 | [Fast-VLA](https://arxiv.org/abs/2610.21389) | LAT.VLM | 固定任务记忆与在线轻量 actor；不是跨周期持续去噪 |
| 13 | [RePlanMem-VLA](https://arxiv.org/abs/2610.22556) | LAT.REPR | 重规划分歧触发视觉记忆写入；记忆保持证据不能直接当动态闭环成功率 |
| 14 | [PACT-VLA](https://arxiv.org/abs/2610.28019) | LAT.SELECT | 用提交前观测评价候选；区别于更新候选生成状态 |
| 15 | [DirectWAM](https://arxiv.org/abs/2610.28122) | LAT.GEN.STEP | 保留未来到动作级联的一步蒸馏；不自动作为动态扰动方法 |

另有 [DOMINO/PUMA](https://arxiv.org/abs/2603.15620v3) 与 [DynamicVLA/DOM](https://arxiv.org/abs/2601.22153v2)，分别交叉进入方法和基准入口。同一论文一个 JSON、一套编号；不为方法名和基准名再造两篇论文。

## 对已有十六篇的影响

- FlashVLA streaming、AR-VLA 从 LAT.ASYNC 移到 LAT.STREAM，保留原 ID、slug 和全部笔记；在异步对齐页保留相关入口。
- RTC、FutureRTC 保留 LAT.ASYNC。PaceVLA 保留 LAT.EXEC，不因为验证了传送带任务就整体搬到“动态任务”。
- Let It Be Simple、SnapFlow、A2A、STEP、Δ-Flow、MARS 保留原归属；必要时补充动态任务证据与关联分类。
- ElegantVLA、FlashVLA reuse、Fast-WAM、ImageWAM、π0.5 保留归属。Fast-WAM/ImageWAM 不因 WAM 名称被推断已验证运动目标响应。
- 旧目录 execution/asynchronous 继续存在；新增分类页由脚本生成。迁移时保留历史 ID，即使 ID 前缀不等于当前 category。

## 横向任务维度：用标签和评测表表达

不要只使用 dynamic 一个模糊标签。建议按证据分别记录：

| 维度 | 示例标签/字段内容 |
|---|---|
| 外部环境变化 | moving-target、conveyor、trajectory-switch、external-disturbance |
| 时间与系统条件 | inference-delay、observation-jitter、asynchronous-sensing |
| 记忆与遮挡 | occlusion、long-horizon-memory；不自动称为动态操作 |
| 任务与平台 | DOMINO/DOM/DynBench/Kinetix 及版本、场景、硬件 |
| 验证方式 | 原生动态任务、静态任务注入延迟、真机扰动、仅机制分析 |

同一篇可有多个标签，但只有论文实际验证的任务才添加实验证据标签。方法具备潜力与实验已证明分别表述。

另建动态评测矩阵，记录外部变化类型、运动轨迹/速度、可预测或突变、观测率/时间戳、推理延迟、执行步数、成功率、反应延迟/观测年龄。动态目标、延迟鲁棒与长时序记忆三种能力分别比较。

## 基准记录与当前 schema

暂不改 JSON schema 或生成脚本。独立 benchmark 类型沿用五项字段：hands 记录机器人/末端配置，tasks 记录动态任务及划分，cross_hand 只记录同任务跨手/跨本体复用的实际证据，release 记录代码/资产/数据，highlight 记录动态机制与指标。对于跨本体未验证或不适用的项目明确注明，不据平台数量推断复用成立。

方法论文顺带提出基准时，如 DSDyn-VLA/DynBench，仍为一个 model 记录，通过 related_categories 关联 LAT.BENCH，详细基准事实放笔记/评测矩阵，不复制相同论文标题以绕过去重校验。

## 后续工作

ForeTime-VLA、UniMPA、GeoAAC、Real-Time EXPO-FT、VLA-Feedback、Reactive Real-Time Flow、Streaming-WAM 等工作的正式来源与分类仍待核对。

实施顺序：迁移已有条目，补充新论文与基准，建立动态评测矩阵，最后更新索引和导图。
