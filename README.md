<div align="center">

# Awesome 3D Hand

**A categorized index of papers, datasets, and tools for 3D hand understanding and hand-object interaction**

[简体中文](README_cn.md)

</div>

This repository organizes representative research by topic. Its taxonomy is based on [Hand3DResearch](https://github.com/SeanChenxy/Hand3DResearch). This is a reusable template: a group can copy it and replace the field name, taxonomy, and entries with its own content.

## Contents

- [Field Mind Map](#field-mind-map)
- [Papers by Category](#papers-by-category)
- [Datasets and Benchmarks](#datasets-and-benchmarks)
- [Tools](#tools)
- [Maintenance and Contributions](#maintenance-and-contributions)

## Field Mind Map

Each leaf topic has a category code, such as `H.FK`. Click the image to view it at full size. The English map is generated from the bilingual taxonomy in [`taxonomy.json`](taxonomy.json).

[![3D Hand field mind map](mindmap.svg)](mindmap.svg)

## Papers by Category

Papers are grouped by the leaf topics in the map. Each paper ID combines its category code with a paper number: for example, `[H.FK.2]` belongs to `H.FK` (Forward Kinematics). The same category codes appear in the map and section headings.

### Hand Modeling

#### Kinematics

##### Forward `[H.FK]`

| ID | Paper | TL;DR | Venue | Resources |
|---|---|---|---:|---|
| [H.FK.2] | Pushing the Envelope for RGB-based Dense 3D Hand Pose Estimation via Neural Rendering — Seungryul Baek, Kwang In Kim, Tae-Kyun Kim | Fits a parametric hand mesh with differentiable neural rendering, then improves single-image 3D pose and mesh recovery through iterative refinement and self-generated training data. | CVPR 2019 | [PDF](https://openaccess.thecvf.com/content_CVPR_2019/papers/Baek_Pushing_the_Envelope_for_RGB-Based_Dense_3D_Hand_Pose_Estimation_CVPR_2019_paper.pdf) |
| [H.FK.1] | GANerated Hands for Real-Time 3D Hand Tracking from Monocular RGB — Franziska Mueller et al. | Makes synthetic training images look more realistic with image-to-image translation, then combines CNN predictions and kinematic fitting for real-time 3D hand tracking from monocular RGB video. | CVPR 2018 | [PDF](http://handtracker.mpi-inf.mpg.de/projects/GANeratedHands/content/GANeratedHands_CVPR2018.pdf) · [Supplement](http://handtracker.mpi-inf.mpg.de/projects/GANeratedHands/content/GANeratedHands_CVPR2018_Supp.pdf) · [Project](http://handtracker.mpi-inf.mpg.de/projects/GANeratedHands/) |

##### Inverse `[H.IK]`

| ID | Paper | TL;DR | Venue | Resources |
|---|---|---|---:|---|
| [H.IK.5] | Learnable SMPLify: A Neural Solution for Optimization-Free Human Pose Inverse Kinematics | Replaces SMPLify's iterative optimization with single-pass neural regression, using temporal sampling, human-centric normalization, and residual learning to improve efficiency and generalization. | arXiv 2025 | [PDF](https://arxiv.org/abs/2508.13562) |
| [H.IK.4] | HandTailor: Towards High-Precision Monocular 3D Hand Recovery | Combines learned hand estimation with energy-based refinement to recover a more accurate hand mesh from a single RGB image. | arXiv 2021 | [PDF](https://arxiv.org/pdf/2102.09244.pdf) · [Code](https://github.com/LyuJ1998/HandTailor) |

#### Graph `[H.GH]`

| ID | Paper | TL;DR | Venue | Resources |
|---|---|---|---:|---|
| [H.GH.14] | HandDGP: Camera-Space Hand Mesh Prediction with Differentiable Global Positioning | Unifies relative-space mesh prediction and camera-space positioning in an end-to-end model, using image rectification to reduce scale-depth ambiguity. | ECCV 2024 | [PDF](https://arxiv.org/pdf/2407.15844) · [Project](https://nianticlabs.github.io/handdgp/) |

#### More Hand Modeling Categories

`H.VX` 2.5D · `H.TR` Transformer · `H.UV` Texture · `H.SP` Implicit Shape · `H.GEN` Generation · `H.AVA` Avatar · `H.DN` Dynamics · `H.TP` Temporal · `H.WS` Weak Supervision

### Hand-Object Interaction

#### Kinematics `[HO.FK]`

| ID | Paper | TL;DR | Venue | Resources |
|---|---|---|---:|---|
| [HO.FK.10] | CPF: Learning a Contact Potential Field to Model the Hand-Object Interaction — Lixin Yang et al. | Represents hand-object contact as a spring-based potential field and combines learning with fitting to estimate interaction poses with more plausible contact. | ICCV 2021 · TPAMI 2024 | [PDF](https://arxiv.org/pdf/2012.00924.pdf) · [Code](https://github.com/lixiny/CPF) |

#### More Hand-Object Interaction Categories

`HO.GH` Graph · `HO.SP` Implicit Shape · `HO.NR` Neural Rendering · `HO.DN` Dynamics · `HO.Con` Contact · `HO.AF` Affordance

### Hand-Hand Interaction

`HH.FK` Kinematics · `HH.VX` 2.5D · `HH.GH` Graph · `HH.TR` Transformer · `HH.SP` Implicit Shape · `HH.NR` Neural Rendering · `HH.GP` Gesture Prediction · `HH.Mani` Manipulation

### Full Body Modeling

`FBR.FK` Forward Kinematics · `FBR.IK` Inverse Kinematics · `FBR.SP` Implicit Shape · `FBR.NR` Neural Rendering · `FBR.GR` Grasping

### Multi-Modal Motion

`MM.IS` In Scene · `MM.Tex` Text to Motion

### Dexterous Robot Hand

`RO.DN` Dynamics · `RO.IM` Imitation · `RO.VLA` Vision-Language-Action

## Datasets and Benchmarks

| Dataset | Task / Content | Paper and Project |
|---|---|---|
| [HO3D](https://github.com/shreyashampali/ho3d) | Hand-object pose estimation under occlusion | [Project and data](https://github.com/shreyashampali/ho3d) |
| [ContactPose](https://contactpose.cc.gatech.edu/) | Real-world hand-object interaction, grasping, and contact understanding | [Project page](https://contactpose.cc.gatech.edu/) |
| [OakInk](https://oakink.net/) | Affordance, interaction intent, hand-object pose, and grasping | [CVPR 2022 paper](https://arxiv.org/abs/2203.15709) · [Project page](https://oakink.net/) |
| [ARCTIC](https://arctic.is.tue.mpg.de/) | Dexterous bimanual manipulation of articulated objects | [Project page](https://arctic.is.tue.mpg.de/) |

## Tools

| Code | Tool Category | Examples |
|---|---|---|
| `T.MD` | Hand models | MANO, manotorch, NIMBLE |
| `T.MC` | Motion capture | MediaPipe, OpenPose, EasyMocap |

## Maintenance and Contributions

Add papers under the relevant category and use its code in the paper ID. To add or change categories, edit [`taxonomy.json`](taxonomy.json) and regenerate the mind maps. See the [maintenance and contribution guide (Chinese)](CONTRIBUTING.md) for the file overview, commands, tag rules, and pull request steps. Contributions of papers, datasets, tools, and taxonomy improvements are welcome.
