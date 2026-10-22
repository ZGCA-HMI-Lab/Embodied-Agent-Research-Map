# VLA / WAM 真机延迟优化文献地图

[English](README.md) · [研究范围](docs/scope_cn.md) · [维护规范](CONTRIBUTING.md)

围绕 VLA / WAM 的推理成本、观测时效性与动作执行连续性组织文献。由“真机延迟优化计划”中的研究问题出发，保留可追溯的原始论文来源，不把聊天中的判断直接当成论文事实。

## 从这里开始

1. 看[论文比较与阅读路线](notes/latency-review_cn.md)，区分 VLM、动作生成和执行系统的瓶颈。
2. 按下方分类阅读双语短条目，点击“笔记”查看边界与研究问题。
3. 查看[核验记录](docs/source-audit_cn.md)，了解版本、计时口径及尚未提取的信息。

当前收录 **16 篇**：初始 12 个候选名称经同名消歧得到 13 篇，另补 3 篇相关架构文献；并非全领域计数。π0.5 是基座背景，Fast-WAM/ImageWAM 也涉及效率。核验日期为 2026-10-22，全部为 indexed，未进行本地复现。

[![研究地图](mindmap_cn.svg)](mindmap_cn.svg)

## 分类入口

<!-- BEGIN GENERATED:CATALOG -->

| 分类 | 编号前缀 | 条目数 | 阅读入口 |
|---|---|---:|---|
| 感知与 VLM 复用 | `LAT.VLM` | 2 | [查看](catalog/perception/vlm-reuse_cn.md) |
| 一步生成与蒸馏 | `LAT.GEN.STEP` | 2 | [查看](catalog/generation/one-step_cn.md) |
| 历史先验与热启动 | `LAT.GEN.HIST` | 3 | [查看](catalog/generation/history_cn.md) |
| 自适应采样预算 | `LAT.GEN.ADAPT` | 1 | [查看](catalog/generation/adaptive_cn.md) |
| 异步执行与延迟补偿 | `LAT.ASYNC` | 4 | [查看](catalog/execution/asynchronous_cn.md) |
| 执行时序与动作粒度 | `LAT.EXEC` | 1 | [查看](catalog/execution/temporal-granularity_cn.md) |
| WAM 与策略基座 | `LAT.BASE` | 3 | [查看](catalog/foundations/models_cn.md) |

<!-- END GENERATED:CATALOG -->

## 日常添加文献

论文统一维护在 `data/papers/<slug>.json`；可选详细笔记放 `notes/`。普通工作复制 `data/templates/model.json`，基准复制 `benchmark.json`，替换全部占位信息，分配未使用且未退役的编号。只有末端分类码可用于 category；关联方向写 related_categories。

- 保留双语摘要、原始证据链接与实际核验日期。
- 阅读状态依本人进度更新；下载代码不等于复现。
- `show_on_map` 只为代表工作设为 true，所有条目仍进入分类页。
- 两篇 FlashVLA 使用不同 slug；PaceVLA 保留历史编号，当前归属以 category 为准。
- 生成页与导图由脚本更新，笔记由人工维护。

```powershell
python -X utf8 scripts/build_catalog.py
python -X utf8 scripts/build_catalog.py --check
python -X utf8 -m unittest discover -s tests -v
git diff --check
```

本仓库只管理文献与研究记录，不启动模型训练或机器人实验。模板来源：[Embodied-Agent-Research-Map](https://github.com/ZGCA-HMI-Lab/Embodied-Agent-Research-Map)，分类导图组织参考 [Hand3DResearch](https://github.com/SeanChenxy/Hand3DResearch)。
