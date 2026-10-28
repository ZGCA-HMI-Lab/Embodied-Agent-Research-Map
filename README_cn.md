# 具身动作模型研究地图

面向机器人动作生成与控制的学习式模型、数据集、评测基准和阅读记录。

[English](README.md) · [研究范围与分类依据](docs/scope_cn.md) · [维护规范](CONTRIBUTING.md)

**[Interactive Map · 在线交互地图](https://zgca-hmi-lab.github.io/Embodied-Agent-Research-Map/)**：按分类与时间浏览，搜索论文、组合筛选主题；点击论文名打开原文，点击“简介与资源”查看总结。网站随 main 分支通过校验的更新自动发布；[本地预览与维护说明](docs/interactive-map.md)。

## 从这里开始

1. 看下方导图了解研究结构；总图仅展示选定代表工作。
2. 点击分类入口，阅读该方向的全部短条目与 TL;DR。
3. 需要深入时，点击条目中的“笔记”查看单篇阅读记录。

当前重点是**操作动作模型**；导航、身体运动与全身控制保留研究入口。操作按夹爪、多指灵巧手及跨平台共性方法组织。灵巧手下按主要贡献分为**数据集与评测基准、机器人示范数据生成、机器人操作策略与控制、人手动作与操作视频建模**；策略与控制再分为动作策略学习、执行反馈与动作修正。

论文名称旁直接显示主题与方法，例如 **No Eyes, No Problem｜手内操作 · RL · 触觉**。下方“按主题浏览”可以跨分类查找 VLA、强化学习、触觉与接触反馈、手内操作；每篇论文只有一份正式记录。

[![具身动作模型研究地图](mindmap_cn.svg)](mindmap_cn.svg)

## 分类入口

<!-- BEGIN GENERATED:CATALOG -->

**按主题浏览：** [VLA (14)](catalog/topics/vla_cn.md) · [强化学习 (21)](catalog/topics/reinforcement-learning_cn.md) · [触觉与接触反馈 (13)](catalog/topics/tactile_cn.md) · [手内操作 (5)](catalog/topics/in-hand-manipulation_cn.md)

| 分类路径 | 条目数 | 阅读入口 | 代表工作／主题与方法 |
|---|---:|---|---|
| 操作动作模型 → 夹爪操作模型 → 数据集 | 1 | [查看](catalog/manipulation/grippers/datasets_cn.md) | [TacClaw-Infinity｜夹爪示范 · 触觉数据集](catalog/manipulation/grippers/datasets_cn.md#am-man-grip-1) |
| 操作动作模型 → 夹爪操作模型 → Agent 架构 → Agent＋代码与工具 | 2 | [查看](catalog/manipulation/grippers/agent-architectures/in-context-tool-control_cn.md) | [GPT-Policy｜工具调用 · 上下文学习 · 视觉反馈](catalog/manipulation/grippers/agent-architectures/in-context-tool-control_cn.md#am-man-grip-agent-icl-1)<br>[AGP｜运行时编程 · 反馈纠错 · 经验复用](catalog/manipulation/grippers/agent-architectures/in-context-tool-control_cn.md#am-man-grip-agent-icl-2) |
| 操作动作模型 → 夹爪操作模型 → Agent 架构 → Agent＋学习式策略 | 2 | [查看](catalog/manipulation/grippers/agent-architectures/agent-wam_cn.md) | [AR-WAM｜WAM执行 · 事件反馈 · 失败恢复](catalog/manipulation/grippers/agent-architectures/agent-wam_cn.md#am-man-grip-agent-wam-1)<br>[AW-0｜**Agent＋WAM** · 代码—视频—动作联合生成 · 混合执行](catalog/manipulation/grippers/agent-architectures/agent-wam_cn.md#am-man-grip-agent-wam-2) |
| 操作动作模型 → 多指灵巧手操作研究 → 数据集与评测基准 | 5 | [查看](catalog/manipulation/dexterous/benchmarks_cn.md) | [BiDex-100｜双手操作 · 评测基准](catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-1)<br>[HandsOn｜双手操作 · 仿真评测](catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-2)<br>[Evo-DexBench｜灵巧手操作 · 仿真评测](catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-3)<br>[DexBioLab｜实验室操作基准 · 动态实验视觉 · 并行写实仿真](catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-4)<br>[DexHoldem｜**Agent闭环评测** · 场景保持 · 真机灵巧操作](catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-5) |
| 操作动作模型 → 多指灵巧手操作研究 → 机器人示范数据生成 | 10 | [查看](catalog/manipulation/dexterous/demonstrations/generation_cn.md) | [DexNinja｜Real2Sim2Real扩增 · 可变形切割仿真 · 视触觉模仿学习](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-1)<br>[Human2Dex｜腕视角示范 · 跨手数据复用 · 抓取相对表示](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-2)<br>[GNR｜生成式重定向 · 流匹配 · 推理时采样扩展](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-3)<br>[Gen2Dex｜视频示范 · 重定向 · RL轨迹优化](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-v2r-1)<br>[DexAgent｜**Agent构建仿真** · 视频示范 · 数据扩增](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-v2r-2)<br>[EgoMatrix｜接触一致重建 · RL操作迁移 · 动作—视频配对生成](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-v2r-3)<br>[EgoCPT｜人类视频迁移 · 接触—受力联合优化 · 残差RL](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-v2r-4)<br>[Hand2Robot｜人类视频迁移 · 物体中心4D重建 · VLA后训练](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-v2r-5)<br>[GenDexHand｜**Agent生成式仿真** · VLM场景修正 · 规划＋RL](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-4)<br>[HumanoidGen｜**Agent约束规划** · MCTS搜索修复 · 双手示范生成](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-5) |
| 操作动作模型 → 多指灵巧手操作研究 → 机器人操作策略与控制 → 动作策略学习 | 17 | [查看](catalog/manipulation/dexterous/policies/policy-learning_cn.md) | [No Eyes, No Problem｜手内操作 · RL · 触觉](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-inhand-rl-1)<br>[EgoJEPA｜人类视频预训练 · 潜在动作迁移 · WAM](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-1)<br>[Coordi-π｜VLA · AE动作表示 · 双手协同](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-2)<br>[HiFun｜分层RL · 臂手协调 · 人在环学习](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-3)<br>[FACT｜WAM · 力—动作联合预测 · 触觉闭环修正](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-4)<br>[DexMimic｜RL轨迹跟踪 · 价值引导重置 · 多轨迹联合训练](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-5)<br>[XL-VLA｜跨手迁移 · 统一潜在动作空间 · VLA](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-6)<br>[DexCast｜HOI几何迁移 · 骨架时序运动编码 · 3D扩散策略](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-7)<br>[AFCE｜VLA · 动作—结果联合表征 · 双手协同](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-8)<br>[DextER｜接触推理 · 语言条件抓姿生成 · 自回归VLA](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-10)<br>[CHORD｜接触力旋量引导 · 人类示范迁移 · 残差RL](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-12)<br>[LiMA｜异步双系统WAM · 潜空间扩散桥 · 实时观测动作细化](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-13)<br>[DexTacWAM｜视触觉WAM · 多指触觉压缩 · 接触演化预测](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-14)<br>[High-DoF VLA Post-Training｜**VLA后训练** · 低维手部动作编码 · 潜空间残差RL](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-15)<br>[TTP｜VLA · 触觉融合 · 动作与触觉联合预测](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-vla-tactile-1)<br>[DexMachina｜辅助力课程学习 · 功能重定向 · 双手RL](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-9)<br>[Text2Touch｜**Agent奖励设计** · 触觉手内操作 · RL与策略蒸馏](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-policy-learning-11) |
| 操作动作模型 → 多指灵巧手操作研究 → 机器人操作策略与控制 → 技能学习与组合 | 2 | [查看](catalog/manipulation/dexterous/policies/skill-composition_cn.md) | [DexStitch｜人类视频迁移 · 接触感知转换 · 技能衔接与组合](catalog/manipulation/dexterous/policies/skill-composition_cn.md#am-man-dex-policy-skill-1)<br>[DexCompose｜技能组合 · 手指控制权分配 · 残差RL](catalog/manipulation/dexterous/policies/skill-composition_cn.md#am-man-dex-policy-skill-2) |
| 操作动作模型 → 多指灵巧手操作研究 → 机器人操作策略与控制 → 世界模型与规划控制 | 2 | [查看](catalog/manipulation/dexterous/policies/world-model-planning_cn.md) | [DSP｜手内操作 · 自主交互采集 · 世界模型＋MPC](catalog/manipulation/dexterous/policies/world-model-planning_cn.md#am-man-dex-policy-planning-1)<br>[DexHandDiff｜新目标适配 · 扩散规划 · 交互感知引导](catalog/manipulation/dexterous/policies/world-model-planning_cn.md#am-man-dex-policy-planning-2) |
| 操作动作模型 → 多指灵巧手操作研究 → 机器人操作策略与控制 → 执行反馈与动作修正 | 4 | [查看](catalog/manipulation/dexterous/policies/execution-feedback_cn.md) | [FOMO-Dex｜力反馈柔顺控制 · 任务方向选择 · 修正动作模仿学习](catalog/manipulation/dexterous/policies/execution-feedback_cn.md#am-man-dex-policy-feedback-1)<br>[TouchWorld｜**Agent＋VLA** · 触觉世界模型 · 触觉残差修正](catalog/manipulation/dexterous/policies/execution-feedback_cn.md#am-man-dex-policy-feedback-2)<br>[DEWO｜WAM部署后学习 · 成败视觉经验监督 · 进度触发动作引导](catalog/manipulation/dexterous/policies/execution-feedback_cn.md#am-man-dex-policy-feedback-3)<br>[AgenticTactileVLA｜VLA · 接触反馈 · 在线动作修正](catalog/manipulation/dexterous/policies/execution-feedback_cn.md#am-man-dex-vla-feedback-1) |
| 操作动作模型 → 多指灵巧手操作研究 → Agent 架构 | 10 | [查看](catalog/manipulation/dexterous/agent-architectures_cn.md) | [AdaClearGrasp｜自适应清障 · RL灵巧抓取 · 失败重规划](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-2)<br>[GOTT｜跨手接触原语 · 物体轨迹接口 · 分阶段执行](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-4)<br>[ZeroDex｜多视角3D定位 · 工具轨迹迁移 · 闭环重规划](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-5)<br>[LUCID｜闭环意图预测 · 人类视频学习 · 通用臂手控制](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-7)<br>[BLaDA｜**Agent语义约束规划** · 3DGS功能定位 · 三点几何动作映射](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-9)<br>[AdaRoboVLG｜**Agent可组合先验** · 跨手抓姿生成 · 接触几何稳定性评估](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-10)<br>[RoboDexVLM｜VLM Agent · 任务规划 · 失败重规划](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-1)<br>[DexGraspVLA｜分层VLA · 域不变视觉表示 · 扩散模仿学习](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-3)<br>[VLM Scaffolding｜关键点轨迹规划 · 残差RL · 仿真到现实](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-6)<br>[OmniDexVLG｜**多Agent语义理解与标注** · VLG抓姿生成 · 细粒度抓取控制](catalog/manipulation/dexterous/agent-architectures_cn.md#am-man-dex-agent-8) |
| 操作动作模型 → 多指灵巧手操作研究 → 人手动作与操作视频建模 | 1 | [查看](catalog/manipulation/dexterous/human-hand-modeling_cn.md) | [P³-WAM｜统一感知、预测与规划](catalog/manipulation/dexterous/human-hand-modeling_cn.md#am-man-dex-human-unified-1) |
| 操作动作模型 → 共性方法 → 执行效率与时序控制 | 1 | [查看](catalog/manipulation/common-methods/execution-efficiency_cn.md) | [PaceVLA｜VLA · 执行加速 · 动作时间粒度](catalog/manipulation/common-methods/execution-efficiency_cn.md#am-man-method-eff-1) |
| 操作动作模型 → 共性方法 → 强化学习训练与探索 | 2 | [查看](catalog/manipulation/common-methods/rl-training-exploration_cn.md) | [SGS｜RL · 成功率引导采样 · 训练起点调度](catalog/manipulation/common-methods/rl-training-exploration_cn.md#am-man-method-rl-1)<br>[HARBOR｜**Agent自动化RL训练** · 分阶段检查与修复 · 并行调参与经验复用](catalog/manipulation/common-methods/rl-training-exploration_cn.md#am-man-method-rl-2) |
| 操作动作模型 → 共性方法 → 跨平台评测基准 | 1 | [查看](catalog/manipulation/common-methods/cross-platform-benchmarks_cn.md) | [EmbodiedSWE｜**Coding Agent评测** · 长时序操作 · 示范生成](catalog/manipulation/common-methods/cross-platform-benchmarks_cn.md#am-man-method-bench-1) |
| 导航动作模型 | 0 | [查看](catalog/navigation_cn.md) | — |
| 身体运动与全身控制模型 → 双臂与躯干协同操作 | 1 | [查看](catalog/whole-body-control/arm-torso-manipulation_cn.md) | [WBD｜RL专家蒸馏 · 扩散策略 · 指令细化](catalog/whole-body-control/arm-torso-manipulation_cn.md#am-wbc-arm-torso-1) |
| 身体运动与全身控制模型 → Agent 架构 | 1 | [查看](catalog/whole-body-control/agent-architectures_cn.md) | [Being-0｜**Agent全身任务规划** · Connector技能落地 · 导航—操作协同](catalog/whole-body-control/agent-architectures_cn.md#am-wbc-agent-1) |

<!-- END GENERATED:CATALOG -->

[查看全部分类](catalog/README_cn.md)

## 内容放在哪里

| 位置 | 用途 |
|---|---|
| [data/papers/](data/papers/) | 每篇一个 JSON，统一维护编号、分类、双语摘要、链接和核验信息 |
| [catalog/](catalog/README_cn.md) | 自动生成的双语分类索引，收录全部工作 |
| [notes/](notes/README.md) | 可选的单篇阅读笔记、方法比较与复现记录 |
| [taxonomy.json](taxonomy.json) | 分类层级、双语名称及索引路径 |
| [data/topics.json](data/topics.json) | VLA、强化学习等主题的名称和标签匹配规则 |
| [site/index.html](site/index.html) | 自动生成的交互地图，与目录和静态导图共用论文数据 |
| [docs/scope_cn.md](docs/scope_cn.md) | 研究范围、分类边界和参考综述 |

## 后续如何积累

每篇至少有一条带来源的短记录；基准摘要须说明手型、任务数、同任务跨手复用、开放状态和核心特点。详细笔记按需建立。论文声明、公开资产、实际评测配置和自己复现的结果分别记录，未知信息明确保留。

新增或修改数据后运行：

```bash
python3 scripts/build_catalog.py
python3 scripts/build_catalog.py --check
python3 -m unittest discover -s tests -v
node --test tests/test_map_core.cjs
```

具体步骤、字段说明和模板见 [CONTRIBUTING.md](CONTRIBUTING.md)。首页、分类页、导图无需逐篇重复录入。

## 致谢

思维导图展示与分类编号组织方式参考 [Hand3DResearch](https://github.com/SeanChenxy/Hand3DResearch)。本仓库独立维护具身动作模型的范围与分类。
