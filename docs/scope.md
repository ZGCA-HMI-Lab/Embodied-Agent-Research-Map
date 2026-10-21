# Scope and Classification Rationale

[Back to home](../README.md)

## Scope

The core collection covers learned policies and action models that output executable actions, action sequences, or motion trajectories for real or simulated robots, together with benchmarks for evaluating them. Relevant outputs include end-effector poses, joint targets, base velocities, and torques.

Perception, human motion data, world models, simulation, and classical control can be included as supporting resources when their connection to robot action generation or execution is explained. Pure perception or video-generation work alone is outside the core collection.

## Category Boundaries and Generalization

- **Boundary platforms such as three-finger devices:** Consider independently controlled degrees of freedom, action space, and the main research question rather than finger count alone. Devices primarily controlled through overall opening and closing can belong to the gripper category; work on coordinated finger joints and contact adjustment can belong to the dexterous-hand category.
- **Other end effectors:** Suction and specialized tool effectors will receive categories when relevant papers are collected. Soft versus rigid construction is a separate attribute; a soft dexterous hand does not automatically belong to an “other” category.
- **Generality:** Record experimental support for transfer across tasks, objects or scenes, robot arms, and end-effector morphologies separately. “Generalist” and “cross-embodiment” are not a third end-effector morphology.
- **Common manipulation methods:** When the main contribution is a method reusable across manipulation platforms, classify it by research question under common methods and record platforms through tags and evaluation scope. This is not a third end-effector morphology. Execution efficiency and temporal control concern task completion time; model inference acceleration concerns computational latency. Validation on multiple backbones does not establish compatibility with arbitrary models.
- **Demonstration acquisition and action conversion:** Classify by the main research question, rather than grouping every use of retargeting together. Video demonstrations to robot actions covers obtaining executable robot actions from real or generated videos; retargeting, residual RL and trajectory optimization are method tags. Add separate branches for motion mapping, teleoperation collection or cross-embodiment policy transfer when relevant papers arrive. Record required scene information and distinguish optimized trajectory replay from closed-loop policy control.
- **In-hand manipulation:** Use rotation, repositioning and coordinated manipulation of objects in the hand as the task entry, then group work by its main method. Reinforcement learning is currently indexed; add imitation learning and model-based planning and control when papers arrive. Touch, vision, proprioception, domain randomization and sim-to-real are tags or evaluation attributes. Methods may be combined: choose one primary category by contribution and keep other methods as tags without duplicating records. Demonstration pretraining followed by RL does not require a catch-all hybrid category.
- **Evaluation scope column:** Briefly record evaluated effectors and single-arm or bimanual configurations, action space, generalization setting, and required fine-tuning or adaptation. Distinguish design goals from demonstrated capabilities, and mark missing information as “not reported.”
- **Cross-morphology work:** Choose one primary category based on the main contribution and core evaluation. List all evaluated morphologies in the scope column and reference the other category when applicable. Benchmark entries are grouped by the systems they evaluate. Do not assign duplicate paper IDs.

## Classification Rationale and Related Surveys

These references document the classification rationale and are not assigned specific action-model paper IDs. The second level is this map's retrieval structure informed by the surveys; hardware, learning methods, and model functions can be organized along separate dimensions.

| Survey | Relevant organization |
|---|---|
| [Dexterous Manipulation through Imitation Learning: A Survey (2025 version)](https://arxiv.org/html/2504.03515v1) | Section IV distinguishes traditional two-finger grippers, multi-finger anthropomorphic hands, and three-finger robotic claws; Section III separately organizes imitation learning methods. |
| [A Review of Embodied Grasping (2025)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11819895/) | Section 2.2 discusses two-finger grippers, dexterous hands, and other effectors; the algorithm discussion covers embodied perception, strategy, and agents. |
| [The Developments and Challenges towards Dexterous and Embodied Robotic Manipulation: A Survey (2025 version)](https://arxiv.org/html/2507.11840v1) | Section III compares grippers and multi-fingered hands; subsequent sections separately examine data collection and imitation or reinforcement learning frameworks. |
| [Survey of learning-based approaches for robotic in-hand manipulation (2024)](https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2024.1455431/full) | Discusses model-based methods, reinforcement learning and imitation learning, informing the method branches within in-hand manipulation. These approaches may be combined and are not strictly exclusive. |
