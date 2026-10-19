# 维护与贡献指南

这个仓库的首页 `README.md` 面向领域读者，主要展示思维导图、分类标签、论文、数据集和工具。论文条目直接写在 README 的分类表格中；分类结构写在 `taxonomy.json`，并从它生成思维导图图片。

## 文件分别做什么

| 文件 | 用途 | 是否手动编辑 |
|---|---|---|
| `README.md` | 英文 Awesome 风格首页 | 是。新增论文、数据集或工具时同步更新中英文首页 |
| `README_cn.md` | 中文 Awesome 风格首页 | 是。与 `README.md` 保持相同的分类、论文和编号 |
| `taxonomy.json` | 双语思维导图的数据源，保存中英文分类名称、层级和分类标签 | 是。改分类时编辑 |
| `mindmap.svg`、`mindmap_cn.svg` | 英文、中文彩色分支思维导图；分别嵌入对应首页 | 否，由脚本生成 |
| `mindmap.md`、`mindmap_cn.md` | 分别单独打开英文、中文思维导图 | 否，由脚本生成 |
| `scripts/build_mindmap.py` | 检查两份 README 中的论文标签，并生成中英文思维导图 | 通常不用改 |
| `.github/workflows/generate-mindmap.yml` | PR 时检查格式；合并后重新生成思维导图 | 通常不用改 |

## 分类标签和论文编号

每个末端分类都有一个简短、唯一的 `code`，例如 `H.FK`。论文编号是在分类码后面加序号，例如 `[H.FK.2]`。这样读者既能从编号看出论文属于哪个主题，也能在图和论文列表之间对应起来。

- `H.FK` 是分类标签，表示 Hand Modeling 下的 Forward Kinematics。
- `H.FK.2` 是这类论文中的一篇。
- 新论文使用当前分类码，并选一个未被使用的序号。已有编号不要因为排序或插入新论文而改动，也不要重复使用已删除论文的编号。
- 排序可按年份或研究脉络调整；编号只用于识别，不表示论文质量。
- 标签由各方向维护者定义。建议使用简洁、可读的缩写；同一仓库内不得重名。分类标题可以调整，已发布的 `code` 尽量保持稳定。

论文在两份 README 表格中的格式相同，标题与 TL;DR 分别使用英文和中文：

```markdown
| [H.FK.2] | 论文标题 — 作者 | 一句话概括任务、方法和主要贡献。 | CVPR 2019 | [论文](论文链接) · [代码](代码链接) |
```

每篇论文放在最主要的一个分类下。TL;DR 用自己的话写 1 句，概括论文解决什么问题、采用什么关键做法或带来什么结果；避免照抄摘要、只重复标题，或写没有证据支持的评价。确有必要时，可以在条目里补充其他相关分类标签，并在 PR 说明理由。优先提供论文原文、作者项目页或官方代码链接；没有的资源不要编造。

## 增加或修改论文

1. 在 `README.md` 和 `README_cn.md` 找到对应分类，分别新增英文和中文条目。
2. 复制分类标签并分配一个未用过的论文序号，例如 `[HO.FK.11]`。
3. 填写准确的标题、作者、发表 venue/年份、一句话 TL;DR 和可用链接，并核对两种语言的编号一致。
4. 提交 PR，并说明论文为何归入该分类。

只改论文、数据集或工具时，不需要重新生成思维导图。脚本会检查 README 中的论文编号是否唯一、是否指向已定义的分类码。

## 增加或修改分类

1. 在 `taxonomy.json` 中找到合适的位置，新增或修改节点。
2. 根节点同时维护英文 `title` 和中文 `title_zh`；每个分类节点同时维护英文 `name` 和中文 `name_zh`。普通中间节点填写 `children`；末端论文分类还要填写唯一的 `code`，并将 `children` 设为空列表。
3. 在 `README.md` 和 `README_cn.md` 中同步增加对应的论文分类标题或标签索引。
4. 在仓库根目录运行：

```bash
python3 scripts/build_mindmap.py --check
python3 scripts/build_mindmap.py
```

5. 查看两份 README 中的图片和 `mindmap.svg`、`mindmap_cn.svg` 是否正确，再把分类源文件和生成图片一起提交。

脚本只使用 Python 3 标准库，不需要安装额外依赖。

## 命令说明

- `python3 scripts/build_mindmap.py --check`：检查分类树、分类码和中英文 README 的论文编号，不改文件。
- `python3 scripts/build_mindmap.py`：生成中英文 SVG 思维导图和对应的独立页面。
- `git status`：查看当前修改了哪些文件。
- `git add README.md README_cn.md taxonomy.json mindmap.svg mindmap_cn.svg mindmap.md mindmap_cn.md`：选择本次要提交的文件。
- `git commit -m "增加手部建模论文"`：将修改保存为本地提交。
- `git push -u origin add-hand-papers`：把当前分支上传到 GitHub；首次推送时同时关联远程分支。

## 如何提交 Pull Request

### GitHub 网页

适用于少量 README 文本修改：

1. 分别打开 `README.md` 和 `README_cn.md`，点击铅笔图标修改论文、数据集或工具条目。
2. 点 **Commit changes**，选择新建分支并开始 Pull Request。
3. 在 PR 标题和描述中写清楚修改内容、归类理由和来源链接。
4. 创建 PR。维护者会检查条目和归类，并在需要时留言；按意见更新同一个 PR。
5. 通过检查后，由有权限的维护者合并。

网页修改论文编号时，仓库的自动检查会验证两份 README 中的编号格式、唯一性以及对应分类是否存在。若修改分类树，建议在本地生成并提交中英文思维导图文件，确保 PR 预览就能看到更新后的图。

### 命令行

```bash
git clone <仓库地址>
cd <仓库目录>
git switch -c add-hand-papers
```

编辑文件后，如果改了 `taxonomy.json`，先运行：

```bash
python3 scripts/build_mindmap.py --check
python3 scripts/build_mindmap.py
git status
```

然后提交并推送：

```bash
git add README.md README_cn.md taxonomy.json mindmap.svg mindmap_cn.svg mindmap.md mindmap_cn.md
git commit -m "增加手部建模论文"
git push -u origin add-hand-papers
```

推送后，在 GitHub 仓库页面点击 **Compare & pull request**，填写说明并创建 PR。检查通过后，由维护者合并。
