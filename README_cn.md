# 具身动作模型研究地图

面向机器人动作生成与控制的学习式模型、数据集、评测基准和阅读记录。

[English](README.md) · [研究范围与分类依据](docs/scope_cn.md) · [维护规范](CONTRIBUTING.md)

**[Interactive Map · 交互地图](site/index.html)**：按分类与时间浏览，搜索论文、组合筛选主题、点击阅读详情。本地用浏览器打开此 HTML 即可；[预览与发布说明](docs/interactive-map.md)。

## 从这里开始

1. 看下方导图了解研究结构；总图仅展示选定代表工作。
2. 点击分类入口，阅读该方向的全部短条目与 TL;DR。
3. 需要深入时，点击条目中的“笔记”查看单篇阅读记录。

当前重点是**操作动作模型**；导航、身体运动与全身控制保留研究入口。操作按夹爪、多指灵巧手及跨平台共性方法组织。灵巧手下按主要贡献分为**数据集与评测基准、机器人示范数据生成、机器人操作策略与控制、人手动作与操作视频建模**；策略与控制再分为动作策略学习、执行反馈与动作修正。

论文名称旁直接显示主题与方法，例如 **No Eyes, No Problem｜手内操作 · RL · 触觉**。下方“按主题浏览”可以跨分类查找 VLA、强化学习、触觉与接触反馈、手内操作；每篇论文只有一份正式记录。

[![具身动作模型研究地图](mindmap_cn.svg)](mindmap_cn.svg)

## 分类入口

<!-- BEGIN GENERATED:CATALOG -->

**按主题浏览：** [VLA (4)](catalog/topics/vla_cn.md) · [强化学习 (2)](catalog/topics/reinforcement-learning_cn.md) · [触觉与接触反馈 (5)](catalog/topics/tactile_cn.md) · [手内操作 (1)](catalog/topics/in-hand-manipulation_cn.md)

| 分类路径 | 条目数 | 阅读入口 | 代表工作／主题与方法 |
|---|---:|---|---|
| 操作动作模型 → 夹爪操作模型 → 数据集 | 1 | [查看](catalog/manipulation/grippers/datasets_cn.md) | [TacClaw-Infinity｜夹爪示范 · 触觉数据集](catalog/manipulation/grippers/datasets_cn.md#am-man-grip-1) |
| 操作动作模型 → 夹爪操作模型 → Agent 架构 → Agent＋WAM | 1 | [查看](catalog/manipulation/grippers/agent-architectures/agent-wam_cn.md) | [AR-WAM｜Agent＋WAM · 事件反馈 · 失败恢复](catalog/manipulation/grippers/agent-architectures/agent-wam_cn.md#am-man-grip-agent-wam-1) |
| 操作动作模型 → 多指灵巧手操作研究 → 数据集与评测基准 | 3 | [查看](catalog/manipulation/dexterous/benchmarks_cn.md) | [BiDex-100｜双手操作 · 评测基准](catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-1)<br>[HandsOn｜双手操作 · 仿真评测](catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-2)<br>[Evo-DexBench｜灵巧手操作 · 仿真评测](catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-3) |
| 操作动作模型 → 多指灵巧手操作研究 → 机器人示范数据生成 | 2 | [查看](catalog/manipulation/dexterous/demonstrations/generation_cn.md) | [Gen2Dex｜视频示范 · 重定向 · RL轨迹优化](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-v2r-1)<br>[DexAgent｜视频示范 · Agent构建仿真 · 数据扩增](catalog/manipulation/dexterous/demonstrations/generation_cn.md#am-man-dex-demo-v2r-2) |
| 操作动作模型 → 多指灵巧手操作研究 → 机器人操作策略与控制 → 动作策略学习 | 2 | [查看](catalog/manipulation/dexterous/policies/policy-learning_cn.md) | [No Eyes, No Problem｜手内操作 · RL · 触觉](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-inhand-rl-1)<br>[TTP｜VLA · 触觉融合 · 动作与触觉联合预测](catalog/manipulation/dexterous/policies/policy-learning_cn.md#am-man-dex-vla-tactile-1) |
| 操作动作模型 → 多指灵巧手操作研究 → 机器人操作策略与控制 → 执行反馈与动作修正 | 1 | [查看](catalog/manipulation/dexterous/policies/execution-feedback_cn.md) | [AgenticTactileVLA｜VLA · 接触反馈 · 在线动作修正](catalog/manipulation/dexterous/policies/execution-feedback_cn.md#am-man-dex-vla-feedback-1) |
| 操作动作模型 → 多指灵巧手操作研究 → 人手动作与操作视频建模 | 1 | [查看](catalog/manipulation/dexterous/human-hand-modeling_cn.md) | [P³-WAM｜统一感知、预测与规划](catalog/manipulation/dexterous/human-hand-modeling_cn.md#am-man-dex-human-unified-1) |
| 操作动作模型 → 共性方法 → 执行效率与时序控制 | 1 | [查看](catalog/manipulation/common-methods/execution-efficiency_cn.md) | [PaceVLA｜VLA · 执行加速 · 动作时间粒度](catalog/manipulation/common-methods/execution-efficiency_cn.md#am-man-method-eff-1) |
| 导航动作模型 | 0 | [查看](catalog/navigation_cn.md) | — |
| 身体运动与全身控制模型 | 0 | [查看](catalog/whole-body-control_cn.md) | — |

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
