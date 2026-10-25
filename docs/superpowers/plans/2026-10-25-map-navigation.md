# Map navigation implementation plan

> **For agentic workers:** Use superpowers:executing-plans; implement the tasks in order.

**Goal:** Deliver the six approved navigation/display improvements while preserving the research taxonomy and records.
**Architecture:** Pure data/state helpers in map-core.js; a shared state controller drives compact timeline, list, details, history and export. Existing Python build copies the maintained web assets into site/.
**Tech Stack:** Vanilla JavaScript, CSS, HTML, standard-library Python, Node test runner.
**Spec:** ../specs/2026-10-25-map-navigation-design.md (approved 2026-10-25).

## Global constraints
- Preserve all research JSON and taxonomy; no framework or independent web data source.
- Keep bilingual facts, date precision, direct paper links, offline support and safe HTML rendering.
- Commit/push only when separately requested; work in feature branch in the user's existing checkout so IDE previews show the changes.

## Review focus
- A valid paper link outside active filters remains readable.
- Parent category links cannot silently refer to another branch after reorder.
- Preview/list truncation must not truncate export or detail navigation.
- Unknown dates, empty categories and empty results remain explicit.
- Browser back/forward and mobile defaults must not overwrite explicit shared state.

### Task 1: Shared view logic
Files: web/map-core.js, tests/test_map_core.cjs.
Interfaces: categoryIndex(taxonomy), filterPapers(data,state), sortPapers(papers,sort), preview(papers,expanded), readState(search,data,defaults), stateQuery(state), exportResults(data,state,format).
- [x] Add failing behavior tests for parent/leaf filtering, stable parent identity, URL validation/round-trip, complete export and CSV escaping, deterministic sort and three-paper previews.
- [x] Run Node tests and confirm the new cases fail.
- [x] Implement helpers; verify all Node tests pass.

### Task 2: Shared UI and compact views
Files: web/index.html, web/app.js, web/style.css.
Consumes Task 1 interfaces. Produces compact timeline with per-cell overflow, focused category, list with pagination, visible filter removals, and unchanged bilingual detail facts.
- [x] Implement compact header, categories, timeline and list with shared query result.
- [x] Add history and detail navigation, filter-excluded paper notice, share-link fallback and downloads.
- [x] Generate site and inspect actual desktop/mobile browser states, including empty filters, benchmark details and navigation/history.

### Task 3: Verification and maintenance
Files: docs/interactive-map.md, CONTRIBUTING.md; generated site/ assets.
- [x] Document state URL, export contract and agent update/verification procedure.
- [x] Run build, --check, Python and Node suites, git diff --check.
- [x] Fresh read-only review, fix material findings, then re-run affected checks.
- [x] Deliver local preview and exact push status.

## Execution ledger
- Baseline aa9ce72. Design approved; initial source working tree clean except design document.
- Ruling: use feature branch in existing checkout to preserve IDE paths; no commits or publication in this turn.
- Pre-flight: UI consumes pure helper interfaces; export and details consume the entire sorted filtered set, never visible slices.

- Implemented all six approved features; 12 Node behavior tests (new tests observed failing before helpers), 30 Python tests pass.
- Independent read-only review found one material keyboard-focus issue. Fixed capture before rerender and restrict restoration to visible controls; Chrome verified Escape returns focus to the original Coordi-π details button.
- Browser QA: desktop compact overview and list; VLA + tactile gives 2 results, Back restores 5 VLA results; valid FACT deep link outside Navigation filter remains readable; invalid category safely resets; English BiDex-100 retains all five benchmark fields; 390px responsive layout defaults to readable list; direct file URL works; light/dark and share-copy work; empty search disables exports, reset restores 19; parent focus shows 18 manipulation works.
- Download QA: actual Chrome JSON download to /private/tmp/research-map-navigation-qa.json compared by slug against site/map.json; all 19 complete records and taxonomy match, including papers hidden behind the three-paper preview.
- No source research data, taxonomy, README navigation, catalog, static mind map or browser data payload changed. Maintained web files and generated site assets only, plus tests and maintenance/design documents.
- Publication remains separate: no commit/push/deployment performed. Local preview: http://127.0.0.1:8765/ (existing server), or site/index.html.
- Additional browser checks: overflow reveals all 14 October manipulation papers; next-paper navigation and Escape preserve the expanded cell and return focus to FACT; oldest-first list begins with TTP (2026-07). Final build consistency and whitespace checks pass.
- Publication authorization: user requested 推送吧 on 2026-10-25. Fresh check: 30 Python and 12 Node tests pass; generated assets match; remote main and local main both at aa9ce72 before integration. Integrate feature into main by fast-forward, then push and verify Actions/hosted assets.
