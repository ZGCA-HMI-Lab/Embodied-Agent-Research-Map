# TacClaw-Infinity：数据集、采集装置与方法

[返回夹爪数据集索引](../catalog/manipulation/grippers/datasets_cn.md#am-man-grip-1) · [English](tacclaw-infinity.md)

编号：`AM.MAN.GRIP.1`；主类型：`dataset`；版本：arXiv v1；核验日期：2026-10-21。初读及官方发布入口核查，未下载全量数据、训练或复现实验。

## 如何定位

| 层面 | 本文提供什么 |
|---|---|
| 主要成果 | TacClaw-Infinity：用于接触密集操作的视觉、触觉、语言、动作数据集 |
| 采集装置 | TacClaw：手持触觉 UMI 式夹持采集器；不需要目标机器人在采集现场 |
| 配套方法 | 轨迹重建与多模态质控、按目标机器人可达性／可操作度过滤、接触阶段切分、子任务语言及物体空间标注 |
| 数据效用验证 | 用 π0.5、StarVLA 验证采集数据在不同机器人本体上的迁移能力 |

因此按数据集收录，采集方法作为贡献和标签说明。分类路径为 **操作动作模型 → 夹爪操作模型 → 数据集**。TacClaw 的夹持开合与指尖触觉不等于多指关节控制；标题中的 dexterous manipulation 不应直接作为多指灵巧手归类依据。[论文第 III、V 节](https://arxiv.org/html/2610.20320v1)

## 数据与卖点

论文报告总采集规模为 **1 万＋小时、100 万＋段、10 亿＋帧、1000＋任务类型**，来自 50＋地点、20＋组织，覆盖单手与双手操作。数据按 30 Hz 同步；触觉包括形变、剪切和深度。装置传感器的最高采样能力不能直接当作数据集统一记录频率。

特点是把便携、无需目标机器人的触觉采集，与可用于学习的结构化标注结合：以接触事件连接动作阶段、子任务语言和物体区域，再按目标本体的运动学可执行性筛选示范。[论文数据与处理流程](https://arxiv.org/html/2610.20320v1)

## 部署验证的范围

三个机器人本体为 Tianji Marvin M6S Lite、RealMan RM75-b、DM-Sparky One；不是三种多指灵巧手。策略实验只覆盖叠杯、瓶子分类、擦花瓶三个双臂任务，每任务用 1600 条示范训练、50 次评测。论文的 zero-robot 指不采集目标本体专属机器人示范，不表示部署无需标定或适配。[论文第 V-D 节](https://arxiv.org/html/2610.20320v1#S5.SS4)

## 当前发布范围

- [官方数据门户 Daimon-Infinity](https://huggingface.co/datasets/daimonrobotics/Daimon-Infinity) 标注首批 1000 小时，并包含 DM-DataClaw 与少量 DM-DataDex 数据；夹爪采集数据见 [DM-DataClaw 文件目录](https://huggingface.co/datasets/daimonrobotics/Daimon-Infinity/tree/main/DM-DataClaw)。不能据此把论文的万小时总量写成已全部公开，也不能把门户里的手部外骨骼数据全部算成本论文的 TacClaw 采集数据。公开根目录还可见 `DataDex_Datasets/`、`TacExo/` 等内容，未核算其实际总时长。本仓库保存论文记录与资源链接，未下载这些原始数据。
- [论文代码仓库](https://github.com/daimon-robotics/TacClaw-Infinity) 已发布机器人轨迹重放、逆运动学可达性／可操作度评估和工作空间可视化工具；策略训练与任务成功率评测代码仍列为待发布。
- 当前代码的重放与运动学分析不等同于接触任务的闭环策略成功评测。数据门户与论文报告规模、采集器与部署机器人、运动学分析与策略实验分别记录。
