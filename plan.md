# VLA / WAM 真机延迟优化文献地图改造计划

状态：用户已确认（2026-10-22），实施完成。

## 目标与范围

将当前通用具身动作地图改造成服务于“VLA / WAM 真机延迟优化”这一研究方向的文献库。沿用现有 JSON 数据、双语索引、可选 Markdown 笔记和 SVG 导图生成器，不引入框架，不修改模型、训练或部署代码，不运行训练或评测，不提交或推送 Git。

依据：用户引用的 ChatGPT 会话“真机延迟优化计划”（6ad0e79b-ead4-83e8-9219-aa94d3d13095）。可读取其中 5 轮讨论；最后一条论文汇总的助手回答只有内容引用占位符，不能据此认定已经取得完整论文清单。聊天里的方法描述、数字与创新判断只作为线索，必须核验原论文或官方项目后才能进入正式记录。

## 拟采用的分类

根节点：VLA / WAM 推理加速与闭环延迟优化。

1. 感知与 VLM 计算加速：视觉/语言 token、层计算、特征与 KV 复用、按需刷新。
2. 动作生成加速：
   - 一步/少步生成与蒸馏；
   - 历史条件与热启动；
   - 自适应随机性与计算预算。
3. 异步执行与延迟补偿：动作块衔接、观测过时、流式更新、推理执行重叠。
4. 动作执行效率与时间粒度：独立区分任务完成加速和单次推理加速。
5. WAM 与基础模型背景：世界动作联合生成、已有基座及其计算路径。

每篇仅一个主分类，通过 related_categories 和标签表达交叉关系；VLA/WAM/普通扩散策略作为标签和评测范围，避免重复收录。只有核验到对应论文的分支才实际建立，不预填空分类。

## 首批候选论文

从可读聊天中提取以下 12 个名称，逐篇核对正式标题、作者、年份、版本、论文链接和官方代码；未核实的仅留在 docs 中的待核验清单，不伪造正式 JSON：

- Let It Be Simple: One-Step Action Generation for Vision-Language-Action Models
- A2A / Action-to-Action Flow Matching
- STEP: Warm-Started Visuomotor Policies with Spatiotemporal Consistency Prediction
- Δ Flow Matching for Robot Foundation Models
- MARS Policy: Multimodality Only When It Matters
- ElegantVLA
- RTC
- FutureRTC
- FlashVLA
- AR-VLA
- SnapFlow
- PaceVLA

ImageWAM、Fast-WAM、π0.5 在会话中作为基座出现：定位原始来源后，按与主线的关系纳入背景记录或比较笔记，不将基座论文自动算作专门加速论文。不声称这是该领域全部文献。

已初步核验的官方入口：

- Δ Flow：https://arxiv.org/abs/2610.15794
- MARS：https://arxiv.org/abs/2605.29766
- STEP：https://proceedings.mlr.press/v306/li26aa.html

## 条目与比较笔记

每个正式条目维护英文和中文摘要、资源、原始证据、核验日期、阅读状态及已验证基座/任务。默认 indexed，不能依据旧聊天声称用户已读或已复现。

在 notes 中提供中文方向综述/比较表，统一记录：

- 瓶颈位于 VLM、Action Expert、WAM 视觉分支还是执行系统；
- 训练/架构/推理分别改了什么，是否需要微调或蒸馏；
- 输入历史视觉还是历史动作，是否具备自适应调度；
- 测试平台、硬件、采样步数、动作 horizon 和重规划设置（原文未报告则标明）；
- 延迟是模块延迟、端到端 policy 延迟、观测到执行延迟还是任务完成时间；
- 加速比对应哪个基线与配置，不能跨硬件直接排名；
- 对“观测时效性、历史条件与一步生成、动态闭环控制”的启发，区分作者证据与研究假设。

不增加 JSON schema 字段：简短对比进入 evaluation_scope，详细表格进入 Markdown 笔记。代表工作设 show_on_map=true，其余完整进入索引。

## 原有数据清理范围

用户已要求删除模板原有数据，确认本计划后执行：

- 清除原有六篇记录的旧整理内容：BiDex-100、HandsOn、Evo-DexBench、Gen2Dex、No Eyes No Problem、PaceVLA。
- 删除原有单篇示例笔记，重写 notes/README.md，清理首页与 scope 文档中的旧方向介绍、旧链接及旧分类内容。
- PaceVLA 同时是用户方向中的候选：若核验符合范围，则重新整理为新方向条目，并保持其原有 slug/id，避免同一论文重复编号。其余被移除记录的 ID 写入 data/retired_ids.json，不复用。
- 替换 taxonomy.json 的旧分类树；核对并删除旧生成分类页，再用脚本生成新索引与导图。删除前逐一确认目标位于本仓库、属于原始示例或旧生成页，不触及仓库外文件。
- 保留 .git 历史、脚本、测试、AGENTS.md、CONTRIBUTING.md 和通用模板；调整模板里的分类/示例编号以匹配新分类并避免与正式条目冲突。

## 交付与检查

交付双语首页与分类索引、核验后的论文 JSON、中文研究比较笔记、待核验候选清单及新导图。明确报告实际收录数量、未核验条目和原因。

执行：

```powershell
python -X utf8 scripts/build_catalog.py
python -X utf8 scripts/build_catalog.py --check
python -X utf8 -m unittest discover -s tests -v
git diff --check
git status --short
```

检查所有旧示例链接已清理、笔记引用存在、双语事实一致及原始来源对应正确；查看生成 SVG 和分类页的可读性。最终提供本地查看入口和变更摘要，不提交、不推送。

## 实施结果（2026-10-22）

- 收录 16 篇、7 个分类；12 个候选名称全部定位，FlashVLA 消歧后 13 篇，加 3 篇相关架构文献。
- 新增每篇中文索引笔记、方向比较与阅读路线、来源版本及待补信息清单；全部 reading_status=indexed。
- 删除 5 篇无关示例记录和 6 份原笔记；PaceVLA 按 v2 重写且保留原 slug/id；5 个旧 ID 已退役。
- 旧分类生成页清理后重建；脚本、测试和 AGENTS.md 未改动。CONTRIBUTING.md 仅更新两处示例，去掉已删除条目引用。
- 构建与只读一致性校验通过；18 项单元测试全部通过；全部 Markdown 本地链接无缺失；git diff --check 通过。
- 两份 SVG 已渲染为图像并检查，分类与代表论文无明显遮挡或裁切；分类页内容与笔记入口已检查。
- 研究问题与原文事实分别记录；尚未摘录的逐配置细节在 docs/source-audit_cn.md 中列明。
- 无训练/评测任务启动，无 Git commit/push。

## 第二阶段：动态任务文献扩展（2026-10-22）

状态：用户于 2026-10-22 明确要求暂不加入，本阶段暂缓。分类分析保留供参考；不迁移分类、不新增本批论文，现有十六篇记录和分类保持不变。以后仅在用户明确要求继续时恢复。

用户要求先分析“动态机器人论文追踪”相关论文是否需要调整分类。具体提案见 [动态任务分类分析](docs/dynamic-taxonomy-proposal_cn.md)。

- 建议地图扩展为“VLA / WAM 实时与动态控制”，维持“按方法机制主分类、按任务证据横向检索”。
- 保留现有七个分类编码/路径，新增动态表征、流式持续重规划、快速反馈、候选验证、动态基准五个末端分类，共十二类。
- 已从追踪消息提取十五个直接 arXiv 来源并核验元信息/摘要，另核验 DOMINO/PUMA 与 DynamicVLA/DOM；其余名称线索在实施时继续定位来源。
- 拟将已有 FlashVLA streaming 与 AR-VLA 移至流式分支，保留其历史编号与笔记；其余已有论文不重复收录。
- 动态外部目标、延迟注入、时序扰动、记忆任务分开记录，不把静态基准上的提速自动视为动态控制能力。
- 确认本阶段方案后才迁移正式分类并收录论文；保留首阶段全部本地改动，不修改训练代码、不运行训练/评测、不 commit/push。
