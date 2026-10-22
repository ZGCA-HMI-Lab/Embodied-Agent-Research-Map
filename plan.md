# 文献地图维护计划

## 当前范围

VLA / WAM 推理加速与实时控制。现有 16 篇文献、7 个分类，包含双语索引、代表工作导图和中文阅读笔记。

## 内容维护

- 论文信息维护在 data/papers，分类维护在 taxonomy.json；详细讨论放在 notes。
- 同一论文保持固定 ID 和 slug；删除条目的编号登记在 data/retired_ids.json。
- 摘要说明问题、方法和实验范围，性能数据附来源和计时条件。
- 研究设想与已发表结果分别记录，复现实验单独维护。
- 文档采用研究笔记的写法，保留技术内容、来源与必要的未决问题。

## 动态任务扩展

暂缓。[分类提案](docs/dynamic-taxonomy-proposal_cn.md)保留供后续讨论，当前不扩展分类或新增该批论文。

## 检查

```powershell
python -X utf8 scripts/build_catalog.py
python -X utf8 scripts/build_catalog.py --check
python -X utf8 -m unittest discover -s tests -v
git diff --check
```
