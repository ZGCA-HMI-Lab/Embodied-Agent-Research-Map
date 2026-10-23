# Interactive Map design

Approved scope: the user accepted the preceding proposal and requested implementation. Add a category-by-time static interactive map, search, intersecting topic filters, kind filter, bilingual details and a single canonical build. Citation edges are deferred until evidence exists.

Approach: reuse the reference project's taxonomy/time-grid interaction pattern, with a small dependency-free frontend adapted to our contracts. A separate manually curated website data collection is rejected. A framework rewrite adds no required capability. Source inspiration: https://github.com/ZGCA-HMI-Lab/Memory-in-World-Models/tree/de81f14/docs .

Source records remain data/papers/*.json, taxonomy.json, data/topics.json. A new optional publication_date object holds value (YYYY, YYYY-MM or YYYY-MM-DD), source URL, basis (source or arxiv-id-month). Absent dates fall back to year, never verified_on. Identifier-derived dates are explicitly labeled as arXiv month, not independently verified earliest public appearance. Date evidence must not update the previous paper-fact verification date.

Frontend contract v1 exports all papers, explicit current category, stable identity, bilingual labels, canonical facts, computed topic membership, date precision/provenance and canonical catalog/notes URLs. Never infer classification from ID prefixes. Intermediate tree node IDs are path-derived, unique and unrelated to code prefixes.

web/ contains maintained HTML/CSS/JS. site/ contains only generated assets, map.json and map-data.js (the same payload for offline opening), plus static SVGs. The existing build_catalog.py invokes site generation and --check checks every artifact. Browser details reuse existing summaries and all five benchmark fields, safely render text, link resources, notes and canonical entries. All works are searchable regardless of show_on_map; a representative-only checkbox is optional UI filtering, not data exclusion.

Desktop: sticky category tree at left, newest-first month columns, foldable categories and older years, visible labels, detail dialog. Search covers names, authors, tags and bilingual summaries. Multiple topics intersect; each topic matches any configured tag. Time windows anchor to the newest date in the complete collection, not the filter result. Imprecise year dates remain in a clearly marked unknown-month bucket when their year overlaps the selected interval. Default range 12 months; categories initially expanded enough to expose dexterous research. Mobile supports horizontal timeline scrolling and a responsive detail dialog. Empty collection/filter results stay usable.

GitHub Actions validates Python/JS behavior and all generated artifacts. A separate Pages workflow validates before deploying the site directory on main pushes/manual dispatch. Repository Pages must be configured to GitHub Actions once. This task prepares code and workflow; it does not infer another push authorization from earlier completed pushes.

Acceptance: one record edit updates all generated views; old category IDs still map correctly after migration; missing and partial dates work; topic counts deduplicate; hidden static-map papers remain in interactive output; no unsafe HTML injection; bilingual benchmark details complete; local double-click and HTTP preview work; docs tell future models exactly what to edit and run.
