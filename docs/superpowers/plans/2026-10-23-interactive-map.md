# Interactive Map Implementation Plan

> Execute inline with superpowers:executing-plans; use TDD for behavior and one independent final review.

**Goal:** A maintainable category/time map from canonical research records.
**Architecture:** Python emits a versioned data payload and copies web assets into site/. Plain JS renders and filters it. Existing build_catalog.py remains the only generation command.
**Tech Stack:** Python stdlib, browser HTML/CSS/JS, node:test, GitHub Pages.
**Spec:** ../specs/2026-10-23-interactive-map-design.md

## Global constraints

Preserve IDs, slugs, summaries, benchmark facts, notes and verified_on. No inferred references. No hand-maintained aggregate paper list. No third-party browser dependencies. No commit or push in this task without authorization.

## Review focus

Date provenance and missing-month buckets; category relocation independent of ID; zero search results and mixed filters; safe bilingual detail rendering; generated data and asset consistency under Pages subpaths and offline opening.

## Tasks

- [x] 1. Add failing Python tests for date validation, complete export, current-category URLs and stale site detection. Implement publication_date validation and scripts/build_interactive.py; integrate into build_catalog.py.
- [x] 2. Add failing node:test cases for topic intersection, text/kind filtering, imprecise dates, stable timeline bounds, category identity/aggregation, and escaping. Implement web/map-core.js pure helpers and web/app.js, index.html, style.css.
- [x] 3. Add provenance-labeled months to canonical paper records. Update templates, AGENTS.md, CONTRIBUTING.md, data/README.md, docs/interactive-map.md and homepage entry links. Add CI tests and gated Pages deployment workflow.
- [x] 4. Generate all outputs; run Python tests, Node tests, --check and diff checks. Preview desktop/mobile, test search/topic/language/details and inspect screenshots. Obtain independent review, fix material findings, report viewing links and deployment status.

## Execution record

User approved the design in conversation and said to start. Work happens in the current clean workspace for immediate IDE visibility; no separate approval loop or commit required. Existing arXiv URLs supply identifier months per the official identifier specification; no dates or citations are invented.

Completed: 29 Python tests, 5 Node tests, generation consistency and whitespace checks passed. Independent review found no important defects. Browser verified TTP search/details, RL+touch intersection, English benchmark five fields and notes, empty results, responsive 390px viewport and desktop. Temporary viewport reset. HTTP preview is running at 127.0.0.1:8765. Browser security policy disallowed automated file:// navigation; no workaround attempted. Offline export data equals JSON and has no fetch dependency, but direct file opening was not browser-verified.

Content correction: Evo-DexBench display tag changed from dexterous hands/grippers to dexterous manipulation because its existing benchmark hands field states Shadow Hand only. All original factual summaries, IDs, categories, sources and verification dates preserved.

Publishing: workflow prepared with contents:read/pages:write/id-token:write and validation dependency. No commit, push or live Pages deployment performed.
