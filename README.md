<div align="center">

# Embodied Action Model Research Map

**A bilingual research map of learned models for robot action generation and control**

[简体中文](README_cn.md)

</div>

This project organizes learned models that predict or generate executable robot actions from observations, robot states, and task goals or instructions. It connects research questions, action representations, model architectures, learning methods, data, and evidence about generalization.

The initial map contains three research areas: manipulation, navigation, and body motion and whole-body control. These areas have overlapping boundaries. Each paper receives one primary category and may reference related areas. Finer categories will be developed as representative papers are reviewed.

**Current status:** The initial scope and category structure are established. No papers, datasets, or tools have been indexed yet.

## Contents

- [Scope](#scope)
- [Research Map](#research-map)
- [Papers by Research Area](#papers-by-research-area)
- [Datasets and Benchmarks](#datasets-and-benchmarks)
- [Tools](#tools)
- [Maintenance and Contributions](#maintenance-and-contributions)
- [Acknowledgments](#acknowledgments)

## Scope

The core collection covers learned policies and action models that output executable actions, action sequences, or motion trajectories for real or simulated robots. Relevant outputs include end-effector poses, joint targets, base velocities, and torques.

Perception, human motion data, world models, simulation, and classical control can be included as supporting resources when their connection to robot action generation or execution is explained. Pure perception or video-generation work alone is outside the core collection.

## Research Map

The bilingual category source is [`taxonomy.json`](taxonomy.json). Each current area is a leaf category with a unique code. Click the map to view the full-size image.

[![Embodied action model research map](mindmap.svg)](mindmap.svg)

| Code | Research area | Core question |
|---|---|---|
| `AM.MAN` | Manipulation Action Models | How can a robot generate actions that change an object's state? |
| `AM.NAV` | Navigation Action Models | How can a robot generate movement decisions or trajectories to reach a goal or find a target? |
| `AM.WBC` | Body Motion and Whole-Body Control Models | How can a robot generate and track body motions, maintain balance, and coordinate multiple body parts? |

The first level groups research questions. Robot embodiment, inputs and outputs, architecture, action generation method, and learning method are separate attributes to record when reviewing a paper.

## Papers by Research Area

Paper IDs combine a category code and a stable number, such as `AM.MAN.1`. Numbers identify papers and do not indicate rank. Each entry records the paper, a one-sentence summary, publication information, available resources, and related area codes when applicable.

### Manipulation Action Models [`AM.MAN`]

Includes grasping, placement, assembly, dexterous manipulation, and bimanual manipulation. Mobile manipulation belongs here when completing the object interaction is the main research question; related navigation or whole-body control areas can be noted.

| ID | Paper | TL;DR | Venue / Year | Resources | Related areas |
|---|---|---|---|---|---|

### Navigation Action Models [`AM.NAV`]

Includes point-goal, object-goal, and language-guided navigation, exploration, and navigation trajectory generation. The focus is reaching or finding a target using environmental observations; locomotion execution can be linked as a related area.

| ID | Paper | TL;DR | Venue / Year | Resources | Related areas |
|---|---|---|---|---|---|

### Body Motion and Whole-Body Control Models [`AM.WBC`]

Includes locomotion, balance, motion tracking, getting up, dynamic motor skills, and coordinated body control. Loco-manipulation belongs here when body coordination, balance, or motion execution is the main research question; manipulation can be noted as a related area.

| ID | Paper | TL;DR | Venue / Year | Resources | Related areas |
|---|---|---|---|---|---|

## Datasets and Benchmarks

No entries yet. Future entries will state the supported research areas, robot embodiments, observations and action annotations, evaluation tasks, and official sources.

## Tools

No entries yet. Future entries will explain how a tool supports data collection, training, simulation, evaluation, or deployment of action models, with official resource links.

## Maintenance and Contributions

Update both language versions when adding content. Edit [`taxonomy.json`](taxonomy.json) when changing categories, then regenerate the maps:

```bash
python3 scripts/build_mindmap.py
python3 scripts/build_mindmap.py --check
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for inclusion criteria, category boundaries, paper IDs, and contribution steps. The generator uses only the Python 3 standard library.

## Acknowledgments

The map presentation and category-based paper indexing were inspired by [Hand3DResearch](https://github.com/SeanChenxy/Hand3DResearch). This repository defines its own scope and initial categories for embodied action models.
