# Evo-DexBench：初读与资源核验

[返回灵巧手 Benchmarks](../catalog/manipulation/dexterous/benchmarks_cn.md#am-man-dex-bench-3) · [English](evo-dexbench.md)

编号：`AM.MAN.DEX.BENCH.3`；版本：arXiv v1；核验日期：2026-10-21。仅核对论文、官方文档及文件清单，未安装仿真、训练模型或复现实验。

## 操作手与任务

使用 **1 种手型：Shadow Hand＋Franka Panda**。单手任务使用一套臂手，双手任务使用两套；每手有 123 个虚拟法向力触点。单手语义动作是 6 维末端位姿增量＋24 个手部关节目标，双手拼接为 60 维；24 个关节目标不表示 24 个独立物理驱动器。没有同任务跨其他手型的对照。[官方数据说明](https://huggingface.co/datasets/MINT-SJTU/Evo-DexBench-dataset)

共 **30 个任务＝24 Core＋6 Gen**。每类 4 个 Core、1 个 Gen；前三类为单手，后三类为双手。每任务在 Studio 或 Kitchen 对应环境的 3 种布局间变化，共 90 个任务—布局组合。

| 功能交互类 | 4 个 Core 任务 | 1 个 Gen 任务 |
|---|---|---|
| 按钮驱动 | 台灯按钮、墙壁开关、手机 Home 键、烤面包机拨杆 | 显示器电源按钮 |
| 旋转操作 | 水龙头、鼠标滚轮、咖啡机旋钮、水壶盖拨片 | 洗碗机旋钮 |
| 开合取放 | 柜中取杯、碗放微波炉、网球换层、抽屉取香蕉 | 蜡烛放入柜中 |
| 结构摆放 | 餐具摆放、积木拼锤形、三明治堆叠、环塔搭建 | 物品装箱 |
| 装配 | 盖笔帽、套杯套、漏斗插瓶、插头插接 | 剪刀入鞘 |
| 关节构型控制 | 合笔记本电脑、订书机标纸、打开剪刀、打开盒盖 | 折叠眼镜 |

名称与 Core/Gen 对应关系见[官方数据卡](https://huggingface.co/datasets/MINT-SJTU/Evo-DexBench-dataset)；任务 ID、指令和阶段评分见[完整任务目录](https://github.com/MINT-SJTU/Evo-DexBench/blob/main/docs/task-catalog.md)。

## 核心特点与评测边界

核心是 **功能相关任务之间的少样本迁移**：每个 Core 有 50 条示范，每个 Gen 仅 8 条；控制源任务与目标任务的功能相关性，比较源任务的相关性和广度是否有帮助。Gen 有目标示范，属于少样本设置。每任务三布局，另对相机、光照、物理参数和空间布局做单因素扰动，并提供触觉消融。

论文的五种基线是 π0.5、DP-C、DP-T、KineDex、SmolVLA，实际覆盖按钮、旋转、关节构型控制三类的 **15 个任务**。每任务评测 100 回合＝20 常规＋4 类扰动各 20；指标为成功率 SR 和阶段分数 StageScore。不能将这部分结果写成全部 30 任务的模型验证。[论文第 3–4 节](https://arxiv.org/html/2610.21180v1)

## 开源、仿真与 checkpoint

| 项目 | 截至核验日的情况 |
|---|---|
| 环境与代码 | [GitHub](https://github.com/MINT-SJTU/Evo-DexBench) 已公开，基于 ManiSkill 3／SAPIEN；含任务、评分、遥操作、数据转换与策略接口 |
| 示范数据 | [数据仓库](https://huggingface.co/datasets/MINT-SJTU/Evo-DexBench-dataset) 公开且无访问门槛；文件清单核到 1,248 个 HDF5 和 30 个 LeRobot-v3 任务目录；包含图像、深度、状态、动作与触觉 |
| 仿真资产 | [可分发资产包](https://huggingface.co/datasets/MINT-SJTU/Evo-DexBench_Assets) 已公开；机器人描述随代码包提供，PartNet-Mobility 资产需从官方受限仓库单独取得访问权限 |
| 训练与推理例程 | 提供 [KineDex 集成](https://github.com/MINT-SJTU/Evo-DexBench/blob/main/examples/policies/kinedex/README.md)，支持训练、续训与评测；控制 30 Hz，物理仿真 120 Hz |
| 已训练 checkpoint | **未找到 Evo-DexBench 基准训练权重的官方下载**。已核查官方集合、模型检索、仓库指南及 Releases；评测示例要求用户提供本地 `latest.ckpt`，不能将例程当作权重发布 |
| 真机证据 | 本文报告仿真评测；本次未核到真机验证，也未运行上述环境 |

checkpoint 结论仅覆盖当前官方发布入口，后续若发布权重需重新核验。检查入口：[官方 HF 集合](https://huggingface.co/collections/MINT-SJTU/evo-dexbench)、[官方模型检索](https://huggingface.co/api/models?author=MINT-SJTU&search=Evo-DexBench)、[GitHub Releases](https://github.com/MINT-SJTU/Evo-DexBench/releases)。数据文件清单来自 [HF 元数据](https://huggingface.co/api/datasets/MINT-SJTU/Evo-DexBench-dataset)，核验版本为 `a3a741182bcf88d24c2f7b150f93eff44e1f3b7a`。
