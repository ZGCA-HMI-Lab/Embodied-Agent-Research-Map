# Interactive Map：接口与维护约定

[中文首页](../README_cn.md) · [English home](../README.md) · [本地页面](../site/index.html)

## 线上部署状态（2026-10-23 核查）

[打开在线交互地图](https://zgca-hmi-lab.github.io/Embodied-Agent-Research-Map/)。仓库所有者已明确授权将整个研究仓库及提交历史公开；仓库现为 Public，Pages Source 已设为 GitHub Actions，HTTPS 已启用。[运行 #13 的第二次执行](https://github.com/ZGCA-HMI-Lab/Embodied-Agent-Research-Map/actions/runs/39968922105) 已部署成功。线上页面、搜索、论文详情和原文跳转已在浏览器验证。

此前部署失败的原因是私有仓库所在套餐不支持 Pages，且首页链接误指向 HTML 源码。该限制已通过上述授权的公开设置解除。GitHub 的 blob/main/site/index.html 只作为源码入口，README 主入口始终使用已验证的线上 URL。

后续修改源数据 → 统一构建与校验 → 提交并推送 main → Actions 校验及部署成功 → 刷新线上页面。仅本地修改或推送成功不代表部署成功；维护者应检查 Actions 的 deploy 结果。不要另建分类数据或手改 site/。

## 查看与发布

本地直接用浏览器打开 `site/index.html`，或运行：

```bash
python3 -m http.server 8765 --bind 127.0.0.1 --directory site
```

访问 http://127.0.0.1:8765 。页面用同目录的 map-data.js 加载数据，不依赖联网、第三方字体或前端框架。修改并构建后刷新浏览器。

线上使用 GitHub Pages：仓库 Settings → Pages → Build and deployment → Source 选择 GitHub Actions（首次设置一次，需要仓库管理权限）。现有工作流在 main 推送或手动运行时，先完成 Python 测试、生成一致性和 Node 测试，再发布 site/。PR 只校验不部署。

线上地址为 https://zgca-hmi-lab.github.io/Embodied-Agent-Research-Map/ 。GitHub 仓库内的 HTML 链接展示源码；运行交互页面应使用线上地址或本地预览。

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

分类调整规则：改名或移动整个分支时，只修改 `taxonomy.json` 的双语名称／children 层级，并保留分类 code 和 catalog_path；论文改归属时修改该记录的 category，保留论文 id 和 slug；拆分／合并分类时先定义目标分类、迁移受影响论文，再处理旧分类与 catalog_aliases。构建会拒绝不存在的 category，禁止网页另写一套分类。生成数据中的 taxonomy 是源文件的完整导出，网页树和 SVG 树均读取 category 与可选 additional_entries 中的显式展示分类；不根据编号推断，也不从 related_categories 自动增加节点。静态导图默认仅显示 show_on_map 代表作，网页默认展示全部论文，因此论文数量可以不同，分类体系相同。

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

`display_tags` 的每个双语标签可包含可选 `bold` 布尔字段；缺省为 false。该兼容性扩展保留 schema v1，原样导出并在地图／列表标签中加粗显示。`labels.en / zh` 始终为无格式标记的纯文本，搜索及分享不变。禁止在标签文本中嵌入 HTML 或 Markdown 来控制样式。

论文保留全部原始事实字段，导出时补充：

| 字段 | 含义 |
|---|---|
| `publication_date` | 已规范化的时间及依据；缺失时为 `{value: "2026", basis: "year-only", source: null}` |
| `labels.en / zh` | 名称与最多三个展示标签组合 |
| `topics` | 根据现有 tags 与主题定义计算的主题 slug；去重 |
| `catalog_urls.en / zh` | 当前主分类的 GitHub 记录锚点链接 |
| `notes_urls` | 已存在阅读笔记的链接，仅导出已登记语言 |

`id` 和 `slug` 永久稳定；主归属读取 `category`；额外展示读取 `additional_entries`。历史编号前缀可以不同于 category。前端末端节点使用 code；中间节点使用英文名称与排序后的后代末端 code 集合构成标识，区分后代相同的单子节点层级，不依赖数组位置或共同的 AM 前缀。重排不改变标识；改名或改变后代集合会使旧父类链接失效并安全回退。

所有论文进入导出，与 show_on_map 无关；该字段只控制静态总图和交互页可选的“仅代表作”。普通 related_categories 不复制论文节点；只有 additional_entries 会创建共享同一记录的额外展示节点。Benchmark 仍保留 hands/tasks/cross_hand/release/highlight 五项双语事实，详情页逐项显示，不能用泛化摘要替代。

## 显式额外展示入口（可选兼容扩展）

论文 schema v1 新增可选 `additional_entries` 数组；非 benchmark 的每项必须含 `category`、双语 `tldr` 和最多三个 `display_tags`。分类必须是已定义末端，不能与主分类或数组内其他分类重复；只允许这三个字段。缺省／空数组沿用原行为；非空 benchmark 入口暂不支持，五项事实仍完整保留。原 `category`、id、slug 与共享事实含义不变，浏览器导出原样携带额外入口。

Python 的 paper_entries / paper_view / papers_in_category 与 MapCore.entries / paperView / inCategory / scopedPaper 处理同一规则。视图对象只覆盖摘要和标签，不能写回规范数据。buildTree 的叶分类使用对应入口的显示内容，父级以唯一论文成员计数；filterPapers、主题、详情导航、列表和 JSON/CSV 导出仍返回去重的规范记录。搜索包括所有入口摘要及标签；列表在聚焦额外分类时使用该入口的显示内容，范围同时包含主分类时优先主入口。相关分类不改变语义。

分类地图、静态图和可聚焦树均显示显式入口。论文总数去重，分类条目数之和可能大于总数。网页详情列出主分类和额外入口的路径、标签与简介，共享相同作者、原文、资源及评测范围；各入口指向同一 paper slug。每个树节点与详情按钮的焦点标识包含分类和 slug，避免同名节点冲突。完整树导出可包含两个展示节点；JSON/CSV 仍只有一篇记录，CSV 末尾的 additional_entries 字段保留全部双语入口数据。

InternW0 是首个使用该扩展的条目：主入口为触觉后训练，额外入口为异步WAM架构。新增论文通常只改一份 JSON；不能创建第二份记录、手改 site/ 或让历史 related_categories 自动变成额外入口。验收需核对两个叶类分别命中、共同父类与列表／导出不重复、每处标签／摘要不同、双语详情显示全部入口和图片导出覆盖当前子树。

## 交互约定

纵向是同一分类树，横向是月份，最新在左。首次打开默认展开全部分类层级，直接显示末端分类；使用分支颜色、匹配／全库计数，仍可手动收起和展开；展开的父级为紧凑分隔行。每格预览前三篇，可展开其余论文，方法标签始终可见。聚焦按钮或研究方向下拉框切换分类后，自动展开当前分类的全部子类；通过分享链接直接打开分类时同样展开，也可返回全部展开的总览。全部时间视图中，早于全库最新年份的年份默认折叠，点击可展开月份；更新／更早按钮横向移动时间轴。

地图与论文列表共用同一筛选结果。列表展示完整分类路径、可见标签与摘要，支持最新／最早／名称排序，每次显示 30 篇；地图固定最新优先。排序保留源数据日期精度，不补造月日。无显式 view 参数时，宽度不超过 760px 默认列表，其余默认地图；分享链接指定的视图优先。空分类显示“尚未收录”，已有记录但筛选为零显示“没有匹配”。

时间窗口以全库最新记录为参照，筛选时不移动参照；只含年份的记录按全年与窗口是否相交判断，保留在未知月份列。不存在论文的月份不创建空列。主题内部多个标签取并集，不同已选主题取交集；主题旁的数量表示在当前分类、搜索、类型、代表作与时间条件下该主题自身的命中数，结果区显示组合筛选后的总数。搜索包括名称、标题、作者、完整／展示标签、双语摘要、基准事实和评测范围。

点击卡片论文名称直接在新标签页打开 `links.paper`；“简介与资源”按钮打开详情。详情标题也链接原文，资源入口置于摘要之前。名称链接与详情按钮分离，支持键盘、右键复制链接和浏览器新标签页操作。

论文详情显示内容核验日期、日期证据、全部资源和已有笔记，支持当前完整结果中的上／下一篇、查看所在分类及分享单篇。有效论文即使不在当前筛选结果中也显示完整详情并提示原因，此时上／下一篇禁用。按 Escape 或关闭按钮退出并恢复打开详情的按钮焦点，键盘可操作。Markdown 仅支持有限的加粗和换行显示，其余内容转义，禁止将论文摘要作为任意 HTML 注入。

接口增加兼容性字段不破坏旧记录；删除、重命名或改变字段语义时必须升级导出版本并同时修改生成器、前端、测试与此说明。前端发现不支持的版本应显示错误，不能静默漏掉论文。

## 可聚焦的思维导图视图

“思维导图”与“分类地图”“论文列表”并列，URL 使用 `view=tree`。它从同一份导出 taxonomy 和 papers 构树；不依赖静态 SVG，不另存分类或论文。默认入口仍按原来的桌面地图／手机列表规则选择，显式分享参数优先。直接打开 `?view=tree&range=all&lang=zh` 可浏览完整时间范围。

- 点击任何分类，以它为根重新布局，只展示全部后代分类及匹配论文；不需要逐级手动展开。当前层的“子分类”按钮提供快速聚焦入口，空分类也保留。
- 路径导航可返回任一祖先；“返回上一级”回到父类，“返回总览”回到整棵树。分享、浏览器前进／返回和语言切换使用既有 category 标识及状态契约；失效分类回退总览并提示。
- 与地图、列表共用搜索、时间、成果类型、主题交集和代表作开关。切换视图保留这些条件；默认时间仍是近一年，查看历史工作请选择“全部”。“分类全部展开”不代表忽略当前筛选。默认不限制代表作，不同于静态 SVG 的 show_on_map 规则。
- 每个末端分类显示全部匹配的主入口及显式 additional_entries，使用各入口的标签，按当前排序；related_categories 仍不增加节点，也不截取前三篇。一个分类内一篇只出现一次，公共祖先和结果总数按唯一论文去重；同一论文在不同叶类的节点 key 使用分类码＋slug。名称打开原文，简介按钮复用双语详情、基准五项、资源和焦点恢复。
- 画布内部滚动，支持缩放、恢复 100% 和适应全图。按当前语言换行计算紧凑节点尺寸；文字字号保持 13px／10.5px，左右内边距 4px、普通双行论文节点高 30px，长文本按需换行增高，根的完整分支按高度平衡分到两侧，各侧保留原分类顺序；切换根节点恢复 100% 并将视窗对准新根。缩放是本地展示状态，不进入分享参数。完整显示名称和标签，不裁切方法标签。窄屏只滚动画布，不撑宽页面。

实现文件：`web/tree-view.js` 提供纯函数 `TreeView.model(data,state)` 与 `TreeView.layout(root)`；前者负责显式展示入口、范围、路径、去重后的匹配／全库计数，后者按当前语言输出紧凑双侧文本节点与连线；`TreeView.svg(graph, options)` 是网页与图片导出共用的 SVG 渲染器，`TreeView.rasterSize(graph)` 限制 PNG 资源开销。`web/app.js` 负责 DOM、导航、缩放和共享详情；`web/style.css` 负责外观。`scripts/build_interactive.py` 统一复制并版本化 tree-view.js；修改后仍只运行 build_catalog.py。论文添加无需编辑任何网页代码。不预生成分类静态子图。使用树形视图工具栏的“导出 SVG／导出 PNG”即时导出当前分类、排序和筛选下的整棵子树。导出覆盖全部匹配论文，与画布滚动、缩放及屏幕可见范围无关。SVG 为独立矢量图，纯 SVG text/tspan/连线，无 foreignObject、外部字体或脚本，保留论文原文链接和加粗标签；PNG 从同一 SVG 栅格化。导出固定白底，文件名含当前分类与语言。PNG 优先两倍分辨率，最多 1600 万像素、单边 8192px；大图按比例降低分辨率并保留整图，SVG 始终保留矢量精度。过滤为零的提示页禁用图片导出；尚未收录的空分类仍可导出分类结构。

验收除已有项目外，检查从操作→灵巧手→策略→末端分类逐级聚焦、子类默认全部可见、祖先／上级／总览、完整论文数、空分类与零匹配、深链接及失效链接、键盘操作、缩放与适应全图、当前子树的 SVG／PNG 完整导出、390px 窄屏、深色模式、双语标签及 file:// 离线入口。测试位于 tests/test_map_core.cjs 和 tests/test_build_mindmap.py。

## 分享状态与导出接口

URL 查询参数由 `web/map-core.js` 的 `readState` 校验、`stateQuery` 编码；前端不得自行拼接未转义的分类名称或摘要。

| 参数 | 约定 |
|---|---|
| `q` | 搜索文字 |
| `topic` | 可重复的已知主题 slug；多项取交集 |
| `type` | model / benchmark / dataset / tool / survey |
| `category` | 末端 code 或当前树可核对的父类标识；失效时回退全部并提示 |
| `range` | 6 / 12 / all；默认 12 |
| `reps` | 1 表示仅代表作 |
| `view` | map / list / tree |
| `sort` | newest / oldest / name；地图固定最新优先 |
| `lang` | zh / en |
| `paper` | 稳定论文 slug；未知值忽略，有效值不受筛选限制 |

例：`?view=list&topic=vla&topic=tactile&lang=zh`。分享当前视图／单篇会复制完整 URL；剪贴板不可用时显示可手动复制的文本框。localhost 和 file 链接仅适合本机验证，对外分享应从线上页面复制。浏览器前进／返回恢复筛选、视图与详情；分类／年份展开状态保存在当前浏览器历史条目中，返回／前进尊重手动收起状态；新打开的链接默认展开当前范围全部分类，展开状态不作为跨设备分享契约。单格展开和列表加载数量属于临时展示状态。

导出始终覆盖**全部筛选结果**，不能仅导出每格三篇预览或当前已加载的 30 篇。

- JSON：沿用浏览器 schema v1，保留 repository、完整 taxonomy/topics 和匹配论文的全部双语事实，适合程序读取；不是可直接覆盖单篇源 JSON 的格式。
- CSV：UTF-8 BOM；列为 slug、title、authors、publication_date、date_basis、category、category_path、tags、summary、evaluation_scope、paper、project、code、data、additional_entries。additional_entries 为包含全部双语入口摘要与标签的 JSON 字符串，其他列保留规范主记录。摘要使用当前语言，Benchmark summary 保留五项事实。逗号、换行、双引号正确转义；危险公式前缀加单引号，使表格软件按文本读取。
- 空结果时导出按钮禁用。导出和结果计数、详情上下篇使用同一完整结果集合。

## 页面变更验收

除统一构建和测试外，在真实浏览器验证：桌面分类折叠／聚焦、每格三篇与展开、列表排序、主题交集、空结果与重置、双语 Benchmark 五项、详情打开／关闭后的焦点、返回／前进、有效论文在筛选外的深链接、失效分类回退、分享和下载。检查约 390px 窄屏、深色模式以及直接打开 `site/index.html`。涉及超过 30 篇的数据时检查继续加载，确保导出仍包含所有匹配论文。不要将本地验证写成线上部署成功。

## 给后续模型的任务模板

> 按 AGENTS.md 和 CONTRIBUTING.md 收录／更新论文，核实并维护唯一 JSON 记录中的分类、时间依据、双语摘要及可见标签。只在需要新分类或主题时修改对应定义。运行统一构建，同步 README、分类目录、思维导图和 Interactive Map；完成 Python/Node 测试与 --check。涉及页面交互时按本文件“页面变更验收”检查桌面／移动布局、分类导航、列表、组合筛选、详情、分享恢复及完整导出。报告查看入口与推送状态。不要手改生成文件，不要虚构日期、引用或继承关系。

## 实现参考与边界

分类 × 时间的布局和折叠交互参考 [Memory-in-World-Models](https://github.com/ZGCA-HMI-Lab/Memory-in-World-Models#interactive-map)。本项目按显式 category、双语研究记录和主题规则实现独立的数据适配。第一版不展示引用连线；未来需另建带证据的关系数据，不能用年份相邻、同标签或语义相似推定引用／技术继承。

## English maintenance summary

Optional additional_entries provide explicit secondary display categories with their own summaries/tags, sharing canonical identity and facts. Leaf displays use entry-specific content; ancestor/global counts, lists, topics and JSON/CSV exports remain unique by paper. related_categories remain document-only links. The focused mind-map view (`view=tree`) reuses category identity, filters, paper details and history; it does not add a data source. Clicking a category makes it the new root with every descendant expanded; breadcrumb/up/overview navigation, zoom and fit-tree work on mobile. Compact SVG layout uses current-language text and balanced branches; standalone SVG and bounded-resolution PNG exports include the entire current subtree and filtered papers, independent of viewport cropping. Edit canonical paper JSON, taxonomy and topic rules once. Run build_catalog.py to regenerate the catalog, SVGs and complete site. Never hand-edit site/. The versioned browser payload contains all papers and explicit current categories, stable IDs, bilingual facts, derived topic memberships, date provenance and canonical record links. Identifier-derived arXiv dates have month precision only; a missing date falls back to year and never to verified_on. Use the Python and Node test commands above, verify browser behavior for UI changes, and deploy only after validation. Local HTML works offline; hosted browsing requires the one-time GitHub Pages/Actions setting. Citation edges remain out of scope until evidence is recorded.
