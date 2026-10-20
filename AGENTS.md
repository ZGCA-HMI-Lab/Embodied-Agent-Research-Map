# Repository working rules

Read CONTRIBUTING.md before adding or changing research content.

- Canonical records: data/papers/<slug>.json. Taxonomy: taxonomy.json. Do not put paper lists back into taxonomy.
- Preserve existing IDs and slugs. Primary category is an explicit field; record retired IDs rather than reusing them.
- Keep English and Chinese facts consistent. Use primary sources and record verified_on. Retain explicit uncertainty.
- Benchmark summaries must include hands, tasks, same-task cross-hand reuse, release status and distinguishing features.
- Add detailed notes only when useful. Never overwrite user reading notes or docs as a side effect of generation.
- Generated catalog pages and maps are not edited by hand. On homepages, only the GENERATED:CATALOG block is generated.
- show_on_map is opt-in. Index every paper; show selected representatives on the overview map.
- Run python3 scripts/build_catalog.py, then --check, unittest discovery and git diff --check.
- Preserve unrelated user changes. Keep the standard-library implementation; avoid adding a framework for routine reading updates.
- Do not commit or push without task authorization. Report local viewing links, changes, checks and push status.
