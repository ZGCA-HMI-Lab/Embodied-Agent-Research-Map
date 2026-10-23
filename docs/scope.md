# Scope and Classification Rationale

[Back to home](../README.md)

## Scope

The core collection covers learned policies and action models that output executable actions, action sequences, or motion trajectories for real or simulated robots, together with benchmarks for evaluating them. Relevant outputs include end-effector poses, joint targets, base velocities, and torques.

Perception, human motion data, world models, simulation, and classical control can be included as supporting resources when their connection to robot action generation or execution is explained. Pure perception or video-generation work alone is outside the core collection.

## Category Boundaries and Generalization

- **Resource type versus research area:** Dataset, benchmark, model and tool use the independent kind field; category specifies the research area. Dataset papers may also contribute acquisition hardware and processing methods; use dataset for the main resource rather than duplicating the paper. Determine effector category from acquisition/control interfaces and evaluated embodiments, not the word “dexterous” in a title alone.
- **Datasets and benchmarks:** The gripper dataset entry contains TacClaw-Infinity; the dexterous-hand area groups reusable datasets, task environments and evaluation protocols under Datasets and Benchmarks. The kind field still distinguishes dataset from benchmark, while touch and collection methods remain tags.
- **Boundary platforms such as three-finger devices:** Consider independently controlled degrees of freedom, action space, and the main research question rather than finger count alone. Devices primarily controlled through overall opening and closing can belong to the gripper category; work on coordinated finger joints and contact adjustment can belong to the dexterous-hand category.
- **Other end effectors:** Suction and specialized tool effectors will receive categories when relevant papers are collected. Soft versus rigid construction is a separate attribute; a soft dexterous hand does not automatically belong to an “other” category.
- **Generality:** Record experimental support for transfer across tasks, objects or scenes, robot arms, and end-effector morphologies separately. “Generalist” and “cross-embodiment” are not a third end-effector morphology.
- **Common manipulation methods:** When the main contribution is a method reusable across manipulation platforms, classify it by research question under common methods and record platforms through tags and evaluation scope. This is not a third end-effector morphology. Execution efficiency and temporal control concern task completion time; model inference acceleration concerns computational latency. Validation on multiple backbones does not establish compatibility with arbitrary models.
- **Robot demonstration data generation:** The main outputs are robot demonstration trajectories or training data. Gen2Dex and DexAgent belong here; video reconstruction, retargeting, RL trajectory optimization and simulation augmentation are methods. Online retargeting controllers belong under policy/control. Distinguish data generation, open-loop replay and downstream closed-loop deployment.
- **Robot manipulation policies and control:** Divide by research question into Action Policy Learning and Execution Feedback and Action Correction. The former learns actions from observations and includes No Eyes, No Problem and TTP; the latter focuses on execution monitoring, correction and recovery and includes AgenticTactileVLA. Ordinary closed-loop observations alone do not justify placement in the latter.
- **Evaluation scope column:** Briefly record evaluated effectors and single-arm or bimanual configurations, action space, generalization setting, and required fine-tuning or adaptation. Distinguish design goals from demonstrated capabilities, and mark missing information as “not reported.”
- **Cross-morphology work:** Choose one primary category based on the main contribution and core evaluation. List all evaluated morphologies in the scope column and reference the other category when applicable. Benchmark entries are grouped by the systems they evaluate. Do not assign duplicate paper IDs.

- **Task and method topics:** In-hand manipulation, VLA, reinforcement learning, and touch/contact feedback provide cross-category browsing. Topics automatically match tags without changing primary placement or copying records. Matching tags are shown; using or evaluating a method does not necessarily make it the main contribution. Touch/contact feedback includes measured touch and proprioceptive contact estimation, distinguished in each record. Up to three bilingual display_tags appear directly on homepages and maps; full tags remain on detail pages.

- **Agent architectures:** Organize runtime cooperation between high-level agents and low-level policies, currently with Agent + WAM under gripper manipulation. Record how tasks become target/operation commands, where planning and memory reside, feedback triggers and recovery; WAM identifies the underlying policy family. Agent use during data generation remains classified by that contribution under robot demonstration data generation.

- **Human hand motion and manipulation video modeling:** Supporting research on human hand/camera trajectories and manipulation videos, including reconstruction, future prediction and instruction-conditioned generation. P³-WAM belongs here with a visible unified perception/prediction/planning label. Retargeting and open-loop demonstrations are distinct from directly learned closed-loop robot control; link related demonstration-generation work without duplicating records.

## Classification Rationale and Related Surveys

These references document the classification rationale and are not assigned specific action-model paper IDs. The second level is this map's retrieval structure informed by the surveys; hardware, learning methods, and model functions can be organized along separate dimensions.

| Survey | Relevant organization |
|---|---|
| [Dexterous Manipulation through Imitation Learning: A Survey (2025 version)](https://arxiv.org/html/2504.03515v1) | Section IV distinguishes traditional two-finger grippers, multi-finger anthropomorphic hands, and three-finger robotic claws; Section III separately organizes imitation learning methods. |
| [A Review of Embodied Grasping (2025)](https://pmc.ncbi.nlm.nih.gov/articles/PMC11819895/) | Section 2.2 discusses two-finger grippers, dexterous hands, and other effectors; the algorithm discussion covers embodied perception, strategy, and agents. |
| [The Developments and Challenges towards Dexterous and Embodied Robotic Manipulation: A Survey (2025 version)](https://arxiv.org/html/2507.11840v1) | Section III compares grippers and multi-fingered hands; subsequent sections separately examine data collection and imitation or reinforcement learning frameworks. |
| [Survey of learning-based approaches for robotic in-hand manipulation (2024)](https://www.frontiersin.org/journals/robotics-and-ai/articles/10.3389/frobt.2024.1455431/full) | Discusses model-based methods, reinforcement learning and imitation learning, informing method tags in the in-hand manipulation topic. These approaches may be combined and are not strictly exclusive. |
