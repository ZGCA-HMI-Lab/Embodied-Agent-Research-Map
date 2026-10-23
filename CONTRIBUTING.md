# 维护与贡献规范

本仓库使用“首页总览 → 分类短索引 → 可选单篇笔记”的组织方式，适合持续积累数百篇工作。**论文信息只在 `data/papers/` 维护；分类和论文条目不再手写在首页。**

## 文件职责

| 文件或目录 | 编辑方式 |
|---|---|
| `data/papers/<slug>.json` | 手动维护，每篇一个文件，是条目、双语摘要和资源的唯一数据源 |
| `taxonomy.json` | 手动维护分类、双语名称、说明和稳定的 `catalog_path` |
| `data/retired_ids.json` | 删除记录时登记旧编号，禁止复用 |
| `notes/<slug>_cn.md`、`notes/<slug>.md` | 可选的人工阅读笔记；生成器绝不改写 |
| `docs/scope_cn.md`、`docs/scope.md` | 人工维护研究范围、分类边界与综述依据 |
| `README*.md` | 人工维护总览；只有 GENERATED:CATALOG 标记内的入口表由脚本更新 |
| `catalog/**/*.md`、`mindmap*.svg`、`mindmap*.md` | 自动生成；修改源数据后再生成，不能直接修补结果 |
| `data/templates/` | 新条目模板，不会被计入论文数量 |

分类依据见[研究范围与分类说明](docs/scope_cn.md)。每篇只有一个主分类；其他关系填写 `related_categories` 和 `tags`，不用复制条目。

## 新增一篇工作的固定流程

1. 先核实论文原文、作者项目页或官方代码／数据，记录具体版本和核验日期。
2. 根据工作类型复制 `data/templates/model.json` 或 `data/templates/benchmark.json` 到 `data/papers/<slug>.json`，替换全部示例内容。
3. 选择现有末端分类，分配未使用且未退役的编号，填写双语摘要、资源、来源与阅读状态。
4. 有深入阅读内容时建立笔记，并在 `notes` 字段登记已有文件；没有笔记则保持空对象。
5. 只有希望在总图展示的代表工作才设 `show_on_map: true`。所有工作都会进入分类索引。
6. 运行生成与校验，查看变更后再提交：

```bash
python3 scripts/build_catalog.py
python3 scripts/build_catalog.py --check
python3 -m unittest discover -s tests -v
git diff --check
git status --short
```

旧命令 `python3 scripts/build_mindmap.py` 及其 `--check` 仍可用，会委托完整构建流程。新增论文通常只编辑一份数据文件及可选笔记，无需手改两个首页和分类表。

## 数据字段

`schema_version` 当前为整数 `1`；未知字段、重复 JSON 键、缺失必填值会报错。

| 字段 | 规则 |
|---|---|
| `id` | 稳定编号，如 `AM.MAN.DEX.BENCH.1`；唯一、不可复用。重新归类时保留原编号，当前归属以 category 为准 |
| `slug` | 全局唯一、小写连字符形式；必须与 JSON 文件名一致；笔记沿用同一 slug |
| `short_name`、`title`、`authors` | 简称、原文完整标题、作者；同一论文不重复收录，版本更新在原记录维护 |
| `year`、`venue` | 年份与发表／版本信息；预印本明确写 arXiv 及版本，不编造录用信息 |
| `kind` | `model`、`benchmark`、`dataset`、`tool` 或 `survey` |
| `category` | 一个已定义末端分类码；不根据编号的历史前缀推断当前分类 |
| `related_categories` | 其他已定义末端分类码，不与主分类重复 |
| `tags` | 小写连字符标签，如 `dexterous`、`bimanual`、`simulation`、`cross-embodiment`；分类页在标题、作者下显示，方法标签不代替主分类 |
| `tldr` | 非 benchmark 条目必填 `en` 和 `zh`，简短说明问题、方法和贡献；必要时按训练、结构、推理三点写，避免长篇展开 |
| `benchmark` | benchmark 条目使用下述五个双语字段，不能再重复填写 tldr |
| `evaluation_scope` | 可选双语补充说明，显示在分类页摘要的“评测范围”中，不代替基准五项摘要 |
| `links` | 至少有 paper；可有 project、code、data、assets、hand_catalog；只填写确实存在的 HTTP(S) 来源 |
| `sources` | 非空原始证据链接列表。数据和开放状态依据官方页面核对，不只看二手介绍 |
| `verified_on` | 最近事实核验日期，格式 YYYY-MM-DD；核实后才更新 |
| `reading_status` | indexed＝仅收录；skimmed＝初读；read＝已读；reproduced＝已复现。不得将“下载可用”写成“已复现” |
| `notes` | 可选语言到现有 Markdown 文件的映射，如 `{"zh": "notes/bidex-100_cn.md"}`；可仅有中文，也可为空 |
| `show_on_map` | 布尔值；默认模板为 false，防止几百篇工作挤满总图 |

## Benchmark 摘要五项

`benchmark` 必须含以下五项，每项分别填写 `en` 和 `zh`：

- `hands`：手型数量与具体型号；区分摘要宣称、资产可用和实际已验证的配置。
- `tasks`：任务数、训练／评测划分及必要的分配说明。
- `cross_hand`：同一任务能否复用于不同手、需要何种适配、是否有实际对照实验。
- `release`：基准代码、资产、数据各自是否已公开；附资源链接和核验日期，区分待发布。
- `highlight`：最有辨识度的设计与用途，避免没有证据的“最大、首个、最佳”等评价。

未知或未报告应明确写出，不能补猜名单。记录设计目标、发布内容、实际实验与自己复现的结果时分别表述。英文与中文传达相同事实。

## 笔记与来源

短条目负责检索，笔记负责理解。笔记按需写阅读问题、方法解释、实验证据、局限、横向比较和可能的实验；无需每篇都写长文。保留原始来源与阅读日期，个人推断注明依据。更新事实时同步修改数据文件，历史阅读观察可留在笔记中。

生成器不会重写 notes 或 docs；也会拒绝覆盖没有自动生成标记的分类文件。发现旧生成页孤立时会报错，由维护者先迁移或确认清理，不自动删除。

## 调整分类与编号

修改 `taxonomy.json` 的分类层级；中间节点只含双语名称和 children，末端节点增加唯一 code、catalog_path、description 与 description_zh。`catalog_path` 使用小写字母、数字和连字符组成的相对路径，不带扩展名；不要仅因显示名称改变而换路径。

分类树不保存论文列表，图中的工作由数据记录及 show_on_map 决定。首页、总索引和分类页显示完整分类路径。新增分类会自动生成空索引和首页入口。调整已有分类时先更新记录归属与相关分类，保持 id、slug 稳定；如必须换索引路径，可在末端节点的 `catalog_aliases` 列表登记旧路径（格式与 catalog_path 相同），生成器会保留双语旧入口和当前条目的锚点链接。新旧路径不得与其他分类冲突。删除论文时把旧 id 加入 retired_ids，不再分配给新论文。

## 提交与审阅

选择实际修改的源文件、可选笔记和生成文件一并提交。PR 说明新增内容、归类依据、证据来源与核验边界。脚本只验证结构、链接目标和生成一致性，不能替代论文事实核对；本地校验不访问外网。提交、推送和发布按本次任务授权执行。
