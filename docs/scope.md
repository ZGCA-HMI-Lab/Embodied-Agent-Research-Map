# Scope and Classification Rationale

[Back to home](../README.md)

## Scope

The core collection covers learned policies and action models that output executable actions, action sequences, or motion trajectories for real or simulated robots, together with benchmarks for evaluating them. Relevant outputs include end-effector poses, joint targets, base velocities, and torques.

Perception, human motion data, world models, simulation, and classical control can be included as supporting resources when their connection to robot action generation or execution is explained. Pure perception or video-generation work alone is outside the core collection.

## Category Boundaries and Generalization

- **Boundary platforms such as three-finger devices:** Consider independently controlled degrees of freedom, action space, and the main research question rather than finger count alone. Devices primarily controlled through overall opening and closing can belong to the gripper category; work on coordinated finger joints and contact adjustment can belong to the dexterous-hand category.
- **Other end effectors:** Suction and specialized tool effectors will receive categories when relevant papers are collected. Soft versus rigid construction is a separate attribute; a soft dexterous hand does not automatically belong to an “other” category.
- **Generality:** Record experimental support for transfer across tasks, objects or scenes, robot arms, and end-effector morphologies separately. “Generalist” and “cross-embodiment” are not a third end-effector morphology.
- **Evaluation scope column:** Briefly record evaluated effectors and single-arm or bimanual configurations, action space, generalization setting, and required fine-tuning or adaptation. Distinguish design goals from demonstrated capabilities, and mark missing information as “not reported.”
- **Cross-morphology work:** Choose one primary category based on the main contribution and core evaluation. List all evaluated morphologies in the scope column and reference the other category when applicable. Benchmark entries are grouped by the systems they evaluate. Do not assign duplicate paper IDs.

## Classification Rationale and Related Surveys

These references document the classification rationale and are not assigned specific action-model paper IDs. The second level is this map's retrieval structure informed by the surveys; hardware, learning methods, and model functions can be organized along separate dimensions.

| Survey | Relevant organization |
|---|---|
| [Dexterous Manipulation through Imitation Learning: A Survey (2025 version)](https://arxiv.org/html/2504.03515v1) | Section IV distinguishes traditional two-finger grippers, multi-finger anthropomorphic hands, and three-finger robotic claws; Section III separately organizes imitation learning methods. |
| [A Review of Embodied Grasping (2025)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11819895/) | Section 2.2 discusses two-finger grippers, dexterous hands, and other effectors; the algorithm discussion covers embodied perception, strategy, and agents. |
| [The Developments and Challenges towards Dexterous and Embodied Robotic Manipulation: A Survey (2025 version)](https://arxiv.org/html/2507.11840v1) | Section III compares grippers and multi-fingered hands; subsequent sections separately examine data collection and imitation or reinforcement learning frameworks. |
