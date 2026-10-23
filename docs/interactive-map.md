# Interactive Map：接口与维护约定

[中文首页](../README_cn.md) · [English home](../README.md) · [本地页面](../site/index.html)

## 查看与发布

本地直接用浏览器打开 `site/index.html`，或运行：

```bash
python3 -m http.server 8765 --bind 127.0.0.1 --directory site
```

访问 http://127.0.0.1:8765 。页面用同目录的 map-data.js 加载数据，不依赖联网、第三方字体或前端框架。修改并构建后刷新浏览器。

线上使用 GitHub Pages：仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions（首次设置一次，需要仓库管理权限）。现有工作流在 main 推送或手动运行时，先完成 Python 测试、生成一致性和 Node 测试，再发布 site/。PR 只校验不部署。

配置并成功部署后，默认地址为 https://zgca-hmi-lab.github.io/Embodied-Agent-Research-Map/ 。这是预期部署地址，不代表仓库已经启用 Pages。GitHub 仓库内的 HTML 链接展示源码；运行交互页面应使用本地浏览器或部署地址。部署成功后可把首页主入口改为线上地址，同时保留本地入口。

## 一次修改同步所有视图

- `data/papers/<slug>.json`：唯一论文记录；维护内容、日期、分类、可见标签、来源。
- `taxonomy.json`：分类名称和层级；不保存论文列表。
- `data/topics.json`：跨分类主题及标签匹配规则。
- `web/`：仅维护页面布局和交互代码，禁止硬编码论文及研究分类。
- `scripts/build_interactive.py`：从统一数据导出浏览器接口。
- `site/`：全部为生成物，包括网页、静态图副本、map.json 和 map-data.js，禁止手改。

固定流程：

```bash
python3 scripts/build_catalog.py
python3 scripts/build_catalog.py --check
python3 -m unittest discover -s tests -v
node --test tests/test_map_core.cjs
git diff --check
```

`build_catalog.py` 是唯一构建入口，同时生成 README 导航、分类与主题页、思维导图和交互站点。`--check` 不写文件，发现任一生成物缺失或过期即失败。网页 JS/CSS 或数据有变化时，生成的资源版本标记随之改变。

分类调整规则：改名或移动整个分支时，只修改 `taxonomy.json` 的双语名称／children 层级，并保留分类 code 和 catalog_path；论文改归属时修改该记录的 category，保留论文 id 和 slug；拆分／合并分类时先定义目标分类、迁移受影响论文，再处理旧分类与 catalog_aliases。构建会拒绝不存在的 category，禁止网页另写一套分类。生成数据中的 taxonomy 是源文件的完整导出，网页树和 SVG 树的论文归属均以 category 为准。静态导图默认仅显示 show_on_map 代表作，网页默认展示全部论文，因此论文数量可以不同，分类体系相同。

这是构建时同步：修改源 JSON 后运行构建并刷新浏览器；线上更新还需要推送并部署成功。`site/map.json` 是自动导出结果，不是第二份需要维护的数据。

## 日期字段：论文记录 schema_version 1 的可选扩展

```json
"publication_date": {
  "value": "2026-07",
  "source": "https://arxiv.org/pdf/2607.01067v1",
  "basis": "arxiv-id-month"
}
```

- `value` 支持 YYYY、YYYY-MM、YYYY-MM-DD，按来源的实际精度填写。
- `basis: source` 表示从所附官方来源读取的首次公开时间；若仅知道预印本提交时间，来源应明确指向该记录。期刊年份可与首次公开年份不同。
- `basis: arxiv-id-month` 表示仅由现代 arXiv 编号 YYMM 推导月份；只允许 YYYY-MM，并校验与 source URL 中编号一致。页面明确提示未核实更早公开时间。当前 12 篇采用此方式，未新增具体日期事实。[arXiv 编号规则](https://info.arxiv.org/help/arxiv_identifier.html)
- 无此字段时，导出以已有 year 作为 year-only，进入“月份未注明”。不得把 verified_on 或新版本日期用于替代首次公开时间；版本更新不新增论文记录。
- 日期有新证据时只修改源记录，不修改 site/，不为数据格式迁移而更改原来的内容核验日期。

## 浏览器数据接口 v1

`site/map.json` 顶层为 `schema_version: 1`、`repository`、`taxonomy`、`topics`、`papers`。`site/map-data.js` 将完全相同的数据赋给 `window.RESEARCH_MAP`，用于离线打开；不是第二份人工数据源。

论文保留全部原始事实字段，导出时补充：

| 字段 | 含义 |
|---|---|
| `publication_date` | 已规范化的时间及依据；缺失时为 `{value: "2026", basis: "year-only", source: null}` |
| `labels.en / zh` | 名称与最多三个展示标签组合 |
| `topics` | 根据现有 tags 与主题定义计算的主题 slug；去重 |
| `catalog_urls.en / zh` | 当前主分类的 GitHub 记录锚点链接 |
| `notes_urls` | 已存在阅读笔记的链接，仅导出已登记语言 |

`id` 和 `slug` 永久稳定；当前归属只看 `category`。历史编号前缀可以不同于 category。前端中间节点使用路径标识，不能用共同的 AM 前缀充当不同节点 ID。

所有论文进入导出，与 show_on_map 无关；该字段只控制静态总图和交互页可选的“仅代表作”。相关分类不复制论文节点。Benchmark 仍保留 hands/tasks/cross_hand/release/highlight 五项双语事实，详情页逐项显示，不能用泛化摘要替代。

## 交互约定

纵向是同一分类树，横向是月份，最新在左。展开分类显示子类，收起时聚合同一分类下的论文。全部时间视图中，早于全库最新年份的年份默认折叠，点击可展开月份。

时间窗口以全库最新记录为参照，筛选时不移动参照；只含年份的记录按全年与窗口是否相交判断，保留在未知月份列。不存在论文的月份不创建空列。主题内部多个标签取并集，不同已选主题取交集；主题旁的数量表示在当前搜索、类型与时间条件下该主题自身的命中数，结果区显示组合筛选后的总数。搜索包括名称、标题、作者、完整／展示标签、双语摘要、基准事实和评测范围。

点击卡片论文名称直接在新标签页打开 `links.paper`；“简介与资源”按钮打开详情。详情标题也链接原文，资源入口置于摘要之前。名称链接与详情按钮分离，支持键盘、右键复制链接和浏览器新标签页操作。

论文详情显示内容核验日期、日期证据、全部资源和已有笔记。按 Escape 或关闭按钮退出，键盘可操作。Markdown 仅支持有限的加粗和换行显示，其余内容转义，禁止将论文摘要作为任意 HTML 注入。

接口增加兼容性字段不破坏旧记录；删除、重命名或改变字段语义时必须升级导出版本并同时修改生成器、前端、测试与此说明。前端发现不支持的版本应显示错误，不能静默漏掉论文。

## 给后续模型的任务模板

> 按 AGENTS.md 和 CONTRIBUTING.md 收录／更新论文，核实并维护唯一 JSON 记录中的分类、时间依据、双语摘要及可见标签。只在需要新分类或主题时修改对应定义。运行统一构建，同步 README、分类目录、思维导图和 Interactive Map；完成 Python/Node 测试与 --check。涉及页面交互时检查桌面和移动布局、搜索、主题交集、空结果和详情。报告查看入口与推送状态。不要手改生成文件，不要虚构日期、引用或继承关系。

## 实现参考与边界

分类 × 时间的布局和折叠交互参考 [Memory-in-World-Models](https://github.com/ZGCA-HMI-Lab/Memory-in-World-Models#interactive-map)。本项目按显式 category、双语研究记录和主题规则实现独立的数据适配。第一版不展示引用连线；未来需另建带证据的关系数据，不能用年份相邻、同标签或语义相似推定引用／技术继承。

## English maintenance summary

Edit canonical paper JSON, taxonomy and topic rules once. Run build_catalog.py to regenerate the catalog, SVGs and complete site. Never hand-edit site/. The versioned browser payload contains all papers and explicit current categories, stable IDs, bilingual facts, derived topic memberships, date provenance and canonical record links. Identifier-derived arXiv dates have month precision only; a missing date falls back to year and never to verified_on. Use the Python and Node test commands above, verify browser behavior for UI changes, and deploy only after validation. Local HTML works offline; hosted browsing requires the one-time GitHub Pages/Actions setting. Citation edges remain out of scope until evidence is recorded.
