<div align="center">

# Awesome 3D Hand

**3D 手部理解、手物交互与相关方向的论文分类索引**

[English](README.md)

</div>

本仓库按研究主题整理代表性论文、数据集和工具。分类结构参考 [Hand3DResearch](https://github.com/SeanChenxy/Hand3DResearch)。本仓库是可复用模板示例：课题组复制后，替换领域名称、分类树和论文条目即可。

## 目录

- [领域思维导图](#领域思维导图)
- [论文分类](#论文分类)
- [数据集与基准](#数据集与基准)
- [工具](#工具)
- [维护与贡献](#维护与贡献)

## 领域思维导图

图中每个末端主题都有一个分类标签，例如 `H.FK`。点开图片可以查看原尺寸。分类与标签由双语数据文件 [`taxonomy.json`](taxonomy.json) 维护并通过脚本生成。

[![3D Hand 领域思维导图](mindmap_cn.svg)](mindmap_cn.svg)

## 论文分类

论文按思维导图中的末端主题归类。方括号里的编号由“分类标签.论文序号”组成，例如 `[H.FK.2]` 属于 `H.FK`（Forward Kinematics）分类。分类码同时显示在思维导图和对应章节标题中，条目提供论文年份和可用资源。

### Hand Modeling｜手部建模

#### Kinematics｜运动学

##### Forward｜正向运动学 `[H.FK]`

| 标签 | 论文 | TL;DR（一句话） | 发表 | 资源 |
|---|---|---|---:|---|
| [H.FK.2] | Pushing the Envelope for RGB-based Dense 3D Hand Pose Estimation via Neural Rendering — Seungryul Baek, Kwang In Kim, Tae-Kyun Kim | 用可微神经渲染拟合参数化手部网格，再以迭代细化和自生成数据提升单张 RGB 图像的 3D 姿态与网格恢复。 | CVPR 2019 | [PDF](https://openaccess.thecvf.com/content_CVPR_2019/papers/Baek_Pushing_the_Envelope_for_RGB-Based_Dense_3D_Hand_Pose_Estimation_CVPR_2019_paper.pdf) |
| [H.FK.1] | GANerated Hands for Real-Time 3D Hand Tracking from Monocular RGB — Franziska Mueller et al. | 用图像到图像转换改善合成训练数据的真实感，并结合 CNN 预测与运动学拟合实现单目 RGB 视频中的实时 3D 手部跟踪。 | CVPR 2018 | [PDF](http://handtracker.mpi-inf.mpg.de/projects/GANeratedHands/content/GANeratedHands_CVPR2018.pdf) · [补充材料](http://handtracker.mpi-inf.mpg.de/projects/GANeratedHands/content/GANeratedHands_CVPR2018_Supp.pdf) · [项目](http://handtracker.mpi-inf.mpg.de/projects/GANeratedHands/) |

##### Inverse｜逆向运动学 `[H.IK]`

| 标签 | 论文 | TL;DR（一句话） | 发表 | 资源 |
|---|---|---|---:|---|
| [H.IK.5] | Learnable SMPLify: A Neural Solution for Optimization-Free Human Pose Inverse Kinematics | 用单次神经回归替代 SMPLify 的迭代优化，并通过时序采样、人体中心归一化和残差学习提升效率与泛化。 | arXiv 2025 | [PDF](https://arxiv.org/abs/2508.13562) |
| [H.IK.4] | HandTailor: Towards High-Precision Monocular 3D Hand Recovery | 将学习式手部估计与能量优化细化结合，从单张 RGB 图像恢复更准确的手部网格。 | arXiv 2021 | [PDF](https://arxiv.org/pdf/2102.09244.pdf) · [代码](https://github.com/LyuJ1998/HandTailor) |

#### Graph｜图结构 `[H.GH]`

| 标签 | 论文 | TL;DR（一句话） | 发表 | 资源 |
|---|---|---|---:|---|
| [H.GH.14] | HandDGP: Camera-Space Hand Mesh Prediction with Differentiable Global Positioning | 将相对坐标网格预测与相机坐标定位整合为端到端模型，并通过图像校正缓解尺度与深度歧义。 | ECCV 2024 | [PDF](https://arxiv.org/pdf/2407.15844) · [项目](https://nianticlabs.github.io/handdgp/) |

#### 更多手部建模分类

`H.VX` 2.5D · `H.TR` Transformer · `H.UV` Texture · `H.SP` Implicit Shape · `H.GEN` Generation · `H.AVA` Avatar · `H.DN` Dynamics · `H.TP` Temporal · `H.WS` Weak-Supervision

### Hand-Object Interaction｜手物交互

#### Kinematics｜运动学 `[HO.FK]`

| 标签 | 论文 | TL;DR（一句话） | 发表 | 资源 |
|---|---|---|---:|---|
| [HO.FK.10] | CPF: Learning a Contact Potential Field to Model the Hand-Object Interaction — Lixin Yang et al. | 将手物接触建模为弹簧势场，并结合学习与拟合联合估计交互姿态，改善接触合理性。 | ICCV 2021 · TPAMI 2024 | [PDF](https://arxiv.org/pdf/2012.00924.pdf) · [代码](https://github.com/lixiny/CPF) |

#### 更多手物交互分类

`HO.GH` Graph · `HO.SP` Implicit Shape · `HO.NR` Neural Render · `HO.DN` Dynamics · `HO.Con` Contact · `HO.AF` Affordance

### Hand-Hand Interaction｜双手交互

`HH.FK` Kinematics · `HH.VX` 2.5D · `HH.GH` Graph · `HH.TR` Transformer · `HH.SP` Implicit Shape · `HH.NR` Neural Render · `HH.GP` Gesture Prediction · `HH.Mani` Manipulation

### Full Body Modeling｜全身建模

`FBR.FK` Forward Kinematics · `FBR.IK` Inverse Kinematics · `FBR.SP` Implicit Shape · `FBR.NR` Neural Render · `FBR.GR` Grasp

### Multi-Modal Motion｜多模态动作

`MM.IS` In Scene · `MM.Tex` Text to Motion

### Dexterous Robot Hand｜灵巧机器人手

`RO.DN` Dynamics · `RO.IM` Imitation · `RO.VLA` Vision-Language-Action

## 数据集与基准

| 名称 | 主要任务 / 内容 | 论文与项目 |
|---|---|---|
| [HO3D](https://github.com/shreyashampali/ho3d) | 遮挡场景下的单手-物体姿态估计 | 项目与数据 |
| [ContactPose](https://contactpose.cc.gatech.edu/) | 真实手物交互、抓取和接触理解 | 项目主页 |
| [OakInk](https://oakink.net/) | 可供性、交互意图、手物姿态与抓取 | [CVPR 2022 论文](https://arxiv.org/abs/2203.15709) · 项目主页 |
| [ARCTIC](https://arctic.is.tue.mpg.de/) | 双手灵巧操控可动部件物体 | CVPR 2023 论文与项目 |

## 工具

| 标签 | 工具类别 | 示例 |
|---|---|---|
| `T.MD` | 手部模型 | MANO、manotorch、NIMBLE |
| `T.MC` | 动作捕捉 | MediaPipe、OpenPose、EasyMocap |

## 维护与贡献

新增论文时，在对应分类下添加一行，并使用该分类的标签。新增或调整分类时，编辑 [`taxonomy.json`](taxonomy.json) 并重新生成思维导图。标签规则、文件说明、命令和 Pull Request 步骤见 [`CONTRIBUTING.md`](CONTRIBUTING.md)。欢迎通过 PR 补充条目或提出分类调整。
