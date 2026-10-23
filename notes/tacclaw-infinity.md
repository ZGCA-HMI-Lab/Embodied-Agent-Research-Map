# TacClaw-Infinity: Dataset, Collection Interface and Methods

[Back to gripper datasets](../catalog/manipulation/grippers/datasets.md#am-man-grip-1) · [简体中文](tacclaw-infinity_cn.md)

ID: `AM.MAN.GRIP.1`; primary type: `dataset`; version: arXiv v1; checked: 2026-10-21. Initial reading and official release checks only; the full dataset, training and experiments were not reproduced.

## Classification

| Aspect | Contribution |
|---|---|
| Main resource | TacClaw-Infinity: vision, tactile, language and action data for contact-rich manipulation |
| Acquisition interface | TacClaw: a tactile UMI-style handheld gripper, requiring no target robot during collection |
| Supporting methods | Trajectory reconstruction, multimodal quality control, embodiment-aware filtering, contact-phase segmentation, subtask text and spatial object annotation |
| Utility validation | π0.5 and StarVLA transfer experiments across robot embodiments |

Index as a dataset and record collection methods as contributions and tags. The category path is **Manipulation Action Models → Gripper Manipulation Models → Datasets**. Gripper opening and fingertip sensing do not establish articulated multi-finger control; “dexterous manipulation” in the title alone does not determine the end-effector category. [Paper, Sections III and V](https://arxiv.org/html/2610.20320v1)

## Data and distinction

The paper reports **10,000+ hours, 1M+ episodes, 1B+ frames and 1,000+ task types** across 50+ locations and 20+ organizations, including single-hand and bimanual collection. Streams are synchronized at 30 Hz, with tactile deformation, shear and depth. Sensor maximum sampling capability is not the dataset recording rate.

Its distinction combines portable tactile acquisition without the target robot with learning-oriented structure: contact events connect phases, subtask language and object regions; kinematic feasibility filtering accounts for the target embodiment. [Dataset and processing pipeline](https://arxiv.org/html/2610.20320v1)

## Deployment scope

The three robot embodiments are Tianji Marvin M6S Lite, RealMan RM75-b and DM-Sparky One, not three articulated hand types. Policy experiments cover three bimanual tasks—cup stacking, bottle sorting and vase wiping—with 1,600 training episodes and 50 evaluation trials per task. Zero-robot transfer means no embodiment-specific robot demonstrations, not deployment without calibration or adaptation. [Paper, Section V-D](https://arxiv.org/html/2610.20320v1#S5.SS4)

## Current release

- The [Daimon-Infinity portal](https://huggingface.co/datasets/daimonrobotics/Daimon-Infinity) advertises an initial 1,000 hours, mostly DM-DataClaw with some DM-DataDex data; gripper recordings are available in the [DM-DataClaw directory](https://huggingface.co/datasets/daimonrobotics/Daimon-Infinity/tree/main/DM-DataClaw). This does not establish that the paper's full collection is public or that all exoskeleton data in the portal belong to TacClaw. Its public root also includes `DataDex_Datasets/` and `TacExo/`; their actual total duration was not audited. This research map stores paper records and resource links; these raw data were not downloaded.
- The [paper repository](https://github.com/daimon-robotics/TacClaw-Infinity) releases robot trajectory replay, IK reachability/manipulability assessment and workspace visualization. Policy training and task-success evaluation code remain forthcoming.
- Replay and kinematic analysis are distinct from closed-loop contact-task policy evaluation. Keep collection totals, public data, acquisition interfaces and deployment evidence separate.
