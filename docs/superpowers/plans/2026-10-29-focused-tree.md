# Focused Tree Implementation Record

**Goal:** Add a compact mind-map view that re-roots at any research category and exports the complete current subtree.
**Spec:** [Focused tree design](../specs/2026-10-29-focused-tree-design.md)
**Architecture:** Reuse canonical taxonomy, papers and MapCore filters/identity. TreeView builds a scoped model and balanced SVG layout. The browser preview and standalone SVG export share the same renderer; PNG rasterizes that SVG.
**Stack:** Standard-library Python builder, vanilla JS/HTML/CSS/SVG, Node tests. No runtime dependency, data migration or default-view change.

## Delivered work

- [x] Add view=tree to shared URL state without changing existing map/list behavior.
- [x] Re-root at any category, retain all descendant levels and place each matching paper once by its explicit primary category.
- [x] Add ancestor breadcrumbs, child shortcuts, up/overview navigation, current-language labels and existing paper links/details.
- [x] Preserve search, topics, time range, type, representatives, sorting, language and history contracts.
- [x] Balance root branches by height, preserve source order within each side, and compute compact sizes from the selected language.
- [x] Retain 13px/10.5px typography; use 4px side insets, 30px ordinary two-line paper nodes, 4px row gaps and 16px column gaps. Long labels wrap and grow rather than being truncated.
- [x] Add zoom, 100% reset and fit-tree, including automatic fit below the manual zoom minimum.
- [x] Export all current-scope nodes as standalone white-background SVG with links and bold tags, independent of viewport cropping.
- [x] Add PNG export from the same SVG, preferring 2× resolution with a 16MP/8192px allocation cap.
- [x] Include tree-view.js in generated assets and content-based cache versioning; update maintenance documentation.

## Verification

- [x] Test-first coverage for subtree scope, unique placement, empty/filtered cases, share-state roundtrip, layout bounds/non-overlap, compactness, language-aware sizing, XML escaping, full SVG export, raster bounds and fit scale.
- [x] Python 32/32; Node 26/26; generated-file consistency, JS syntax and git diff checks pass.
- [x] Bounds/non-overlap checks pass for all 50 real-data bilingual category scopes.
- [x] Complete 51-paper Chinese sample is 1234×900. SVG parses as XML; PNG rendered with the system SVG rasterizer and visually inspected. Preview samples remain outside the Git repository in the workspace outputs/tree-preview directory.
- [x] Independent review of the feature and export logic reported no outstanding actionable findings. Same-category detail navigation and shortcut focus regressions were reproduced and corrected.
- [x] Initial HTML-tree browser checks covered navigation, history, shared filters, benchmark facts, language, keyboard focus, 390px layout and theme. The subsequent compact SVG preview was displayed in Chrome with all 51 scoped papers.
- [ ] Final browser download acceptance and repeat mobile/history/details checks for the final SVG renderer. A download-event wait timed out; the browser provider was unavailable after runtime reset. These checks are not claimed as passing.
- [ ] file:// browser acceptance. The browser tool blocks this protocol; security settings were not changed. Relative script/data loading and generated asset order are covered by tests.

## Change boundaries and publication

Canonical paper JSON, taxonomy, README, original static maps and exported map.json/map-data.js are unchanged. This feature adds no second research data source. Source code, generated website assets, tests and maintenance/design documentation belong in one commit. Local preview images are review artifacts and are excluded from the repository commit.

The user accepted the current layout and requested preparation for push on 2026-10-30. Prepare the local commit; do not claim an upstream push or Pages deployment until those actions have actually completed.
