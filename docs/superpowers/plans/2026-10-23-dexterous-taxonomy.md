# Dexterous taxonomy and visible topics implementation plan

> **For agentic workers:** Execute inline using superpowers:executing-plans; preserve the existing uncommitted paper additions.

**Goal:** Implement the user-approved four dexterous branches with visible paper labels and cross-category topic browsing.

**Architecture:** Keep one JSON per paper. Taxonomy owns primary placement; optional bilingual display_tags owns up to three short visible labels; data/topics.json maps controlled topic names to existing machine tags. Generate bilingual topic pages linking to canonical category anchors, without copying paper summaries.

**Tech Stack:** Python standard library, JSON, Markdown, existing SVG renderer.

**Spec:** User-approved conversation: datasets/benchmarks; robot demonstration generation; robot policy/control (policy learning and execution feedback/action correction); human hand motion and manipulation video modeling. Show paper name plus up to three labels in README and map; provide VLA/RL/tactile/in-hand topic entrances.

## Global constraints

- Preserve paper IDs/slugs, notes, summaries, source URLs and verification dates.
- Preserve old category routes through aliases; update category references explicitly.
- Use existing workspace so the user's pending papers are included; no commit or push authorized.
- New fields remain optional for backwards compatibility; no external dependencies.

## Review focus

- Hidden-map papers must still appear in topic indexes; representative lists stay opt-in.
- Multiple matching tags must not duplicate a paper in a topic or inflate counts.
- Topic links must reach current category anchors after migration.
- Old entries and notes must survive generation.
- Both languages and long map labels must render correctly.

## Task 1: Label and topic generation

- [x] Add tests for bilingual visible labels, topic deduplication/hidden papers/current links, malformed label/topic data, reserved route conflicts.
- [x] Run tests and confirm feature-related failures.
- [x] Add optional display_tags validation and paper_label(paper, language) in research_data.py; add load_topics(root) validation.
- [x] Extend build_catalog.py with topic pages/navigation and visible representative labels. Retain unconfigured tags as plain code labels.
- [x] Run the complete unit suite.

## Task 2: Taxonomy and content migration

- [x] Flatten demonstration and human-modeling branches, merge RL and tactile-VLA under policy learning, move feedback under policy/control. Preserve old routes with aliases.
- [x] Update paper category/related references and bilingual display tags; define four topic mappings.
- [x] Update scope docs, README introduction and CONTRIBUTING rules in both languages where applicable.
- [x] Build catalog; check generation, all tests, diff whitespace, local links and SVG rendering.
- [x] Review changes, then report viewing links and unpushed status.

## Execution record

Plan follows the already approved design; no second approval loop. Work remains in the current workspace to preserve pending edits. Canonical paper facts are not re-researched in this organizational change.

Task 1 complete: new feature tests failed before implementation; full suite now passes 25 tests.
Task 2 migration complete: 12 records, 10 primary leaf categories, 4 cross-category topics. Generator check and diff whitespace check passed; 92 local paper anchors validated. English and Chinese SVGs rendered and inspected. Existing tracked paper facts and stable identifiers preserved. Final independent review found no important defects and independently confirmed 25 tests and generation consistency. No commit or push performed.
