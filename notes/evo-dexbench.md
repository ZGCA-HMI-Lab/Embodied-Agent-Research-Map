# Evo-DexBench: Initial Reading and Release Check

[Back to dexterous Benchmarks](../catalog/manipulation/dexterous/benchmarks.md#am-man-dex-bench-3) · [简体中文](evo-dexbench_cn.md)

ID: `AM.MAN.DEX.BENCH.3`; version: arXiv v1; checked: 2026-10-21. Paper, official documentation and file listings were inspected; simulation, training and experiments were not reproduced.

## Hands and tasks

**One hand type: Shadow Hand on Franka Panda.** Single-hand tasks use one arm–hand unit; bimanual tasks use two. Each hand has 123 virtual normal-force taxels. Single-arm semantic actions contain a 6-D end-effector delta and 24 hand-joint targets; dual-arm actions are 60-D. Joint-target count is not a count of independently actuated physical joints. No matched comparison across different hand types is provided. [Official dataset](https://huggingface.co/datasets/MINT-SJTU/Evo-DexBench-dataset)

There are **30 tasks: 24 Core + 6 Gen**, with four Core and one Gen in each family. The first three families are single-hand and the last three bimanual. Each task has three layouts in its Studio or Kitchen environment, giving 90 task–layout combinations.

| Interaction family | Four Core tasks, abbreviated | Gen task |
|---|---|---|
| Button-driven | Lamp, wall switch, phone Home key, toaster lever | Display power button |
| Rotation | Faucet, mouse wheel, coffee knob, kettle-lid tab | Dishwasher knob |
| Access and transfer | Cabinet cup, microwave bowl, tennis-ball transfer, drawer banana | Candle into cabinet |
| Structured arrangement | Tableware, hammer-shaped blocks, sandwich, ring tower | Box packing |
| Assembly | Pen cap, cup sleeve, bottle funnel, plug | Scissors sheath |
| Articulated configuration | Laptop lid, stapler and paper, scissors opening, box lid | Folding glasses |

See the [dataset card](https://huggingface.co/datasets/MINT-SJTU/Evo-DexBench-dataset) for Core/Gen assignments and the [task catalog](https://github.com/MINT-SJTU/Evo-DexBench/blob/main/docs/task-catalog.md) for IDs, instructions and stage predicates.

## Distinction and evaluation scope

The main question is **few-shot transfer between functionally related tasks**. Each Core task has 50 demonstrations and each Gen task eight. Controlled source relatedness and breadth help distinguish transfer from target memorization. Gen demonstrations are provided, so this is a few-shot setting. Three layouts and four perturbation axes—camera, lighting, physical properties and spatial configuration—complement tactile ablations.

Paper baselines are π0.5, DP-C, DP-T, KineDex and SmolVLA on **15 tasks** in the button, rotation and articulated-control families. Evaluation uses 100 episodes per task: 20 nominal and 20 for each perturbation axis, reporting SR and StageScore. This is not model validation across all 30 tasks. [Paper, Sections 3–4](https://arxiv.org/html/2610.21180v1)

## Public resources and checkpoints

| Resource | Status at the check date |
|---|---|
| Simulator/code | [GitHub](https://github.com/MINT-SJTU/Evo-DexBench) public; ManiSkill 3/SAPIEN tasks, evaluation, teleoperation, conversion and policy interfaces |
| Demonstrations | [Dataset](https://huggingface.co/datasets/MINT-SJTU/Evo-DexBench-dataset) public and ungated; metadata lists 1,248 HDF5 files and 30 LeRobot-v3 task directories, including images, depth, state, actions and tactile signals |
| Assets | [Redistributable bundle](https://huggingface.co/datasets/MINT-SJTU/Evo-DexBench_Assets) public; robot descriptions ship with the code package. PartNet-Mobility requires separate access through its official gated repository |
| Training/inference | [KineDex integration](https://github.com/MINT-SJTU/Evo-DexBench/blob/main/examples/policies/kinedex/README.md) provides training, continuation and evaluation recipes; 30 Hz control and 120 Hz physics |
| Trained checkpoints | **No official download of benchmark-trained checkpoints found.** Official collection/model search, repository guide and Releases were checked. Evaluation expects a user-supplied local `latest.ckpt`; runnable recipes are not published weights |
| Hardware evidence | Paper reports simulation evaluation; no hardware validation was located, and the environment was not run locally |

Checkpoint status is limited to currently inspected official release channels and should be rechecked when weights appear: [HF collection](https://huggingface.co/collections/MINT-SJTU/evo-dexbench), [official model query](https://huggingface.co/api/models?author=MINT-SJTU&search=Evo-DexBench), [GitHub Releases](https://github.com/MINT-SJTU/Evo-DexBench/releases). [Dataset metadata](https://huggingface.co/api/datasets/MINT-SJTU/Evo-DexBench-dataset) was checked at revision `a3a741182bcf88d24c2f7b150f93eff44e1f3b7a`.
