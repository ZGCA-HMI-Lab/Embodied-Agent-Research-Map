# Repository working rules

Read CONTRIBUTING.md before adding or changing research content.

- Canonical records: data/papers/<slug>.json. Taxonomy: taxonomy.json. Do not put paper lists back into taxonomy. Optional additional_entries contain only category, bilingual tldr and display_tags; never duplicate a paper JSON for a second display entry. Nonempty additional_entries are supported only for non-benchmark records.
- Interactive Map: web/ is maintained view code; site/ is generated. Never edit site/map.json, map-data.js or copied assets. One build_catalog.py invocation updates all views.
- Date evidence: publication_date contains value (YYYY, YYYY-MM or YYYY-MM-DD), source and basis. Preserve uncertainty; arxiv-id-month only supports the identifier's month, never an invented day or verified earliest release. verified_on is not publication time.
- Browser contract and maintenance procedure: read docs/interactive-map.md before changing the interactive map or its export. Group entries by explicit category and optional additional_entries, never ID prefix. Additional display nodes share one canonical record; ancestor/list/export totals deduplicate papers. related_categories remain document-only links. Export every paper regardless of show_on_map; preserve all bilingual benchmark facts.
- Preserve existing IDs and slugs. Primary category is an explicit field; record retired IDs rather than reusing them.
- Keep English and Chinese facts consistent. Use primary sources and record verified_on. Retain explicit uncertainty.
- Benchmark summaries must include hands, tasks, same-task cross-hand reuse, release status and distinguishing features.
- Add detailed notes only when useful. Never overwrite user reading notes or docs as a side effect of generation.
- Generated catalog pages and maps are not edited by hand. On homepages, only the GENERATED:CATALOG block is generated.
- show_on_map is opt-in. Index every paper; show selected representatives on the overview map.
- Run python3 scripts/build_catalog.py, then --check, unittest discovery and git diff --check.
- Also run node --test tests/test_map_core.cjs. For web UI changes, verify search, topic intersection, bilingual details, empty results and a mobile viewport in a browser.
- Preserve unrelated user changes. Keep the standard-library implementation; avoid adding a framework for routine reading updates.
- Do not commit or push without task authorization. Report local viewing links, changes, checks and push status.

- Routine paper maintenance: read/analyze on a paper URL; edit canonical data after confirmation, regenerate and run necessary checks. Do not turn a paper update into a feature-development workflow or browser-control session. Propose any required new interface separately before changing it.
