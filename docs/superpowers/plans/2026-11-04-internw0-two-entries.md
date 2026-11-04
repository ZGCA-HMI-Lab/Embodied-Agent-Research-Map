# InternW0 Two Entries Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One canonical InternW0 record appears in tactile post-training and asynchronous WAM branches with separate summaries/tags and unique paper counts.

**Architecture:** Optional additional_entries contain category/tldr/display_tags, with the existing category remaining primary. Python and JavaScript provide equivalent placement helpers; category renderers use placement views while lists/exports retain unique canonical records. Existing related_categories keep document-link-only semantics.

**Tech Stack:** Python standard library, existing vanilla JavaScript UMD modules, unittest, node:test.

**Spec:** ../specs/2026-11-04-internw0-two-entries-design.md (approved by user 2026-11-04, including WAM架构 / AE侧触觉输入 / 动作—接触联合预测 tags).

## Global Constraints

- Preserve all existing 67 records byte-for-byte; add one internw0.json, total 68 records and 21 categories.
- No dependencies/frameworks, no manual generated-file edits, no commits/pushes.
- Keep bilingual text, unique IDs/slugs, 3 display tags maximum, bold first two tactile labels.
- related_categories never imply extra tree nodes; benchmark five-field facts cannot be replaced by an entry summary.
- Ruling: execute inline in the existing working directory, as the user's modification request targets this pending local state; snapshot pre-existing files and preserve them. Do not create a worktree that omits pending approved content.
- Ruling: user's approval to implement the reviewed design authorizes this plan's execution; no further plan/dispatch selection question.

## Review Focus

- A paper appearing in sibling categories must count once at their common ancestor.
- Additional-entry-only search text must find the paper without losing that entry in a focused list.
- Same-slug tree nodes need distinct keys and focus restoration tokens.
- A benchmark cannot use an additional-entry summary to hide its five canonical facts.
- Category changes or clearing a filter must not persist a transformed view into exported canonical data.

### Task 1: Canonical placement interface and Python generation

**Files:** scripts/research_data.py, scripts/build_catalog.py, scripts/build_interactive.py, tests/test_build_mindmap.py.

**Interfaces:** paper_entries(paper) -> list of category/tldr/display_tags; paper_view(paper, category) -> shallow display view, preserving canonical category; papers_in_category(papers, code) -> matching unique records. Canonical export retains additional_entries unchanged.

- [x] Add failing unittest cases for validation (unknown, duplicate, primary category, invalid tags, invalid bilingual fields, benchmark rejection) and two generated category pages/static-tree entries with independent labels/summaries.
- [x] Run focused tests and observe expected schema rejection/missing placement behavior.
- [x] Add strict optional additional_entries validation; implement helpers and use them for homepage/index/category/static-tree rendering, retaining unique topic records and explicit per-category counts.
- [x] Verify unittest suite passes and browser export retains one record with original primary category and additional entry.

### Task 2: Browser membership, presentation, unique counts and exports

**Files:** web/map-core.js, web/tree-view.js, web/app.js, tests/test_map_core.cjs.

**Interfaces:** entries(paper), paperView(paper, category), inCategory(paper, codes), scopedPaper(paper, codes). buildTree uses per-leaf placement views but unique canonical ancestor members; filterPapers and JSON/CSV always return one canonical record.

- [x] Add failing Node cases for secondary category filtering, entry-only search, ancestor/list/export de-duplication, distinct tree keys and per-entry labels in both languages, and related_categories unchanged.
- [x] Run tests to observe failures.
- [x] Implement pure membership/view helpers, canonical tree aggregation and explicit display views; use them for controls/map/list/details. Details show all entries and canonical facts. Preserve stable deep links; make duplicate display buttons focus-safe.
- [x] Verify Node suite passes. Existing tests prove ordinary papers, filters, benchmarks and tree exports remain compatible.

### Task 3: InternW0, maintenance contract and end-to-end verification

**Files:** data/papers/internw0.json, taxonomy.json, AGENTS.md, CONTRIBUTING.md, docs/scope*.md, docs/interactive-map.md, generated outputs.

- [x] Add the two approved leaf categories and one bilingual paper record based on verified primary sources; primary tactile post-training, additional asynchronous WAM entry.
- [x] Document schema, display-vs-canonical identity, counting, filtering, detail and export behavior for future agents. Mark design implemented after checks.
- [x] Build once and run --check, Python tests, Node tests, git diff --check. Expected 68 unique papers, 21 categories, InternW0 twice on overview trees and once per focused leaf/list/export.
- [x] Verify local desktop/map/list/tree/details, bilingual views, empty-filter/reset, actual SVG/PNG downloads, 390px viewport and offline entry in the browser (completed before user requested stopping browser control). History, entry-only search and JSON/CSV contracts are covered by automated tests; no further browser interactions. Refresh the dexterous preview artifact.
- [x] Request one independent whole-change review of working-tree diff, including untracked files; address important issues with regression tests and preserve original record snapshot.
- [x] Provide local category/preview links, exact test results and uncommitted/unpushed status.

## Execution ledger

- Setup: design approved; execute directly in existing workspace; pending paper changes preserved by SHA-256 snapshot in /tmp/internw0-records-before.json. No commit/push authorization.

- Task 1: complete — new schema/generation tests observed RED, implemented, Python suite 35/35 passed.
- Task 2: pure helpers complete — membership/search/tree/export tests observed RED, Node suite 29/29 passed; browser acceptance pending.

- Final independent review: review_internw0_entries found no Important/Critical issue; verified 67 original records intact and both test suites/build checks passed. Minor duplicate primary labels in details corrected during final cleanup by showing per-entry tag groups only.
- Browser evidence before interruption: native Chrome file:// map/list/tree, both category entries, bilingual text, global one-paper search, zero-result/reset, 390px viewport; real SVG and PNG downloads verified on disk. Browser control stopped at user request; no further browser actions.
- Final scope: no commits, pushes or new features. Existing implementation completed; routine paper work boundary documented in AGENTS.md.
