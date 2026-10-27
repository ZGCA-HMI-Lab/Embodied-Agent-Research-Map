import copy
import json
import sys
import tempfile
import unittest
from pathlib import Path
from xml.etree import ElementTree as ET

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from research_data import load_taxonomy, load_papers, render_tree
from build_catalog import build_outputs, generate, GENERATED
import build_mindmap as renderer


class CatalogTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name).resolve()
        (self.root / "data/papers").mkdir(parents=True)
        self.category = {
            "name": "Benchmarks", "name_zh": "评测基准",
            "code": "AM.MAN.DEX.BENCH", "children": [],
            "catalog_path": "manipulation/dexterous/benchmarks",
            "description": "Evaluation protocols.", "description_zh": "评测协议。",
        }
        self.taxonomy = {"title": "Actions", "title_zh": "动作", "children": [
            {"name": "Manipulation", "name_zh": "操作", "children": [
                {"name": "Dexterous hands", "name_zh": "灵巧手", "children": [self.category]}
            ]}
        ]}
        self.write_taxonomy()
        for name in ("README.md", "README_cn.md"):
            (self.root / name).write_text(
                "# Keep my introduction\n\n<!-- BEGIN GENERATED:CATALOG -->\nold\n<!-- END GENERATED:CATALOG -->\n"
            )
        self.paper = {
            "schema_version": 1, "id": "AM.MAN.DEX.BENCH.1", "slug": "work-1",
            "short_name": "Work One", "title": "A benchmark", "authors": "A. Author",
            "year": 2026, "venue": "arXiv", "kind": "benchmark",
            "category": "AM.MAN.DEX.BENCH", "related_categories": [],
            "tags": ["benchmark"], "benchmark": {
                field: {"en": value, "zh": translated}
                for field, value, translated in [
                    ("hands", "One named hand.", "一种明确手型。"),
                    ("tasks", "Two tasks.", "两个任务。"),
                    ("cross_hand", "Not evaluated.", "未验证。"),
                    ("release", "Code available.", "代码已公开。"),
                    ("highlight", "Matched evaluation.", "配对评测。"),
                ]
            },
            "links": {"paper": "https://example.org/paper"},
            "sources": ["https://example.org/paper"], "verified_on": "2026-10-20",
            "reading_status": "skimmed", "notes": {}, "show_on_map": True,
        }
        self.write_paper(self.paper)

    def write_taxonomy(self):
        (self.root / "taxonomy.json").write_text(json.dumps(self.taxonomy, ensure_ascii=False))

    def write_paper(self, paper, filename=None):
        path = self.root / "data/papers" / (filename or (paper["slug"] + ".json"))
        path.write_text(json.dumps(paper, ensure_ascii=False))

    def load(self):
        taxonomy = load_taxonomy(self.root / "taxonomy.json")
        return taxonomy, load_papers(self.root, taxonomy)

    def test_one_record_generates_both_indexes_and_preserves_home_intro(self):
        outputs = build_outputs(self.root)
        en = outputs[self.root / "catalog/manipulation/dexterous/benchmarks.md"]
        zh = outputs[self.root / "catalog/manipulation/dexterous/benchmarks_cn.md"]
        self.assertIn("[AM.MAN.DEX.BENCH.1]", en)
        self.assertIn("[AM.MAN.DEX.BENCH.1]", zh)
        self.assertIn("One named hand.", en)
        self.assertIn("一种明确手型。", zh)
        self.assertIn("# Keep my introduction", outputs[self.root / "README.md"])

    def test_interactive_export_keeps_hidden_paper_current_category_and_benchmark_facts(self):
        self.category.update(code="AM.NEW", catalog_path="new-category")
        self.write_taxonomy()
        self.paper.update(category="AM.NEW", show_on_map=False, publication_date={
            "value": "2025-08", "source": "https://arxiv.org/abs/2508.01234", "basis": "arxiv-id-month"})
        self.write_paper(self.paper)
        outputs = build_outputs(self.root)
        path = self.root / "site/map.json"
        self.assertIn(path, outputs)
        data = json.loads(outputs[path])
        self.assertEqual(data["schema_version"], 1)
        paper = data["papers"][0]
        self.assertEqual(paper["id"], "AM.MAN.DEX.BENCH.1")
        self.assertEqual(paper["category"], "AM.NEW")
        self.assertEqual(paper["publication_date"]["value"], "2025-08")
        self.assertEqual(paper["benchmark"]["hands"]["zh"], "一种明确手型。")
        self.assertTrue(paper["catalog_urls"]["zh"].endswith("/catalog/new-category_cn.md#am-man-dex-bench-1"))

    def test_publication_dates_preserve_precision_and_do_not_use_verification_date(self):
        for value in ("2024", "2024-02", "2024-02-29"):
            with self.subTest(value=value):
                self.paper["publication_date"] = {"value": value, "basis": "source", "source": "https://example.org/date"}
                self.write_paper(self.paper)
                _, papers = self.load()
                self.assertEqual(papers[0]["publication_date"]["value"], value)
        del self.paper["publication_date"]
        self.write_paper(self.paper)
        outputs = build_outputs(self.root)
        self.assertIn(self.root / "site/map.json", outputs)
        paper = json.loads(outputs[self.root / "site/map.json"])["papers"][0]
        self.assertEqual(paper["publication_date"], {"value": "2026", "basis": "year-only", "source": None})

    def test_invalid_publication_dates_and_unjustified_identifier_dates_are_rejected(self):
        for record in (
            {"value": "2026-02-30", "source": "https://example.org", "basis": "source"},
            {"value": "2026-13", "source": "https://example.org", "basis": "source"},
            {"value": "2026-1", "source": "https://example.org", "basis": "source"},
            {"value": "2026-01", "basis": "source"},
            {"value": "2026-01-01", "source": "https://arxiv.org/abs/2601.12345", "basis": "arxiv-id-month"},
            {"value": "2026-02", "source": "https://arxiv.org/abs/2601.12345", "basis": "arxiv-id-month"},
            {"value": "2026-01", "source": "https://evil.example/2601.12345", "basis": "arxiv-id-month"},
        ):
            with self.subTest(record=record):
                self.paper["publication_date"] = record
                self.write_paper(self.paper)
                with self.assertRaises(ValueError):
                    self.load()

    def test_site_payload_escapes_script_end_and_staleness_is_checked_read_only(self):
        self.paper["short_name"] = "</script><script>alert(1)</script>"
        self.write_paper(self.paper)
        outputs = build_outputs(self.root)
        path = self.root / "site/map-data.js"
        self.assertIn(path, outputs)
        self.assertNotIn("</script>", outputs[path])
        generate(self.root)
        page = self.root / "site/index.html"
        page.write_text(page.read_text() + "\nchanged\n")
        with self.assertRaises(ValueError):
            generate(self.root, check=True)
        self.assertTrue(page.read_text().endswith("changed\n"))

    def test_home_and_category_show_the_full_classification_path(self):
        outputs = build_outputs(self.root)
        for suffix, path in [
            ("", "Manipulation → Dexterous hands → Benchmarks"),
            ("_cn", "操作 → 灵巧手 → 评测基准"),
        ]:
            with self.subTest(language=suffix):
                self.assertIn(path, outputs[self.root / f"README{suffix}.md"])
                self.assertIn(path, outputs[
                    self.root / f"catalog/manipulation/dexterous/benchmarks{suffix}.md"])

    def test_category_move_keeps_old_entry_links_and_paper_id(self):
        generate(self.root)
        old_route = self.category["catalog_path"]
        self.category.update(code="AM.MOVED", catalog_path="renamed-benchmarks",
                             catalog_aliases=[old_route])
        self.paper["category"] = "AM.MOVED"
        self.write_taxonomy()
        self.write_paper(self.paper)
        generate(self.root)
        for suffix in ("", "_cn"):
            old = self.root / f"catalog/manipulation/dexterous/benchmarks{suffix}.md"
            new = self.root / f"catalog/renamed-benchmarks{suffix}.md"
            self.assertIn(f"../../renamed-benchmarks{suffix}.md#am-man-dex-bench-1", old.read_text())
            self.assertIn('id="am-man-dex-bench-1"', old.read_text())
            self.assertIn("[AM.MAN.DEX.BENCH.1]", new.read_text())
        generate(self.root, check=True)

    def test_invalid_or_colliding_catalog_aliases_are_rejected(self):
        for aliases in ("old-page", ["../outside"], ["readme"],
                        [self.category["catalog_path"]], ["old-page", "old-page"]):
            with self.subTest(aliases=aliases):
                self.category["catalog_aliases"] = aliases
                self.write_taxonomy()
                with self.assertRaises(ValueError):
                    load_taxonomy(self.root / "taxonomy.json")

    def test_notes_are_optional_and_existing_notes_are_never_rewritten(self):
        (self.root / "notes").mkdir()
        note = self.root / "notes/work-1_cn.md"
        note.write_text("# My own analysis\n")
        self.paper["notes"] = {"zh": "notes/work-1_cn.md"}
        self.write_paper(self.paper)
        generate(self.root)
        self.assertEqual(note.read_text(), "# My own analysis\n")
        self.assertIn("../../../notes/work-1_cn.md",
                      (self.root / "catalog/manipulation/dexterous/benchmarks_cn.md").read_text())

    def test_paper_tags_are_visible_in_both_category_indexes(self):
        self.paper["tags"] = ["dexterous", "retargeting"]
        self.write_paper(self.paper)
        outputs = build_outputs(self.root)
        for suffix, label in [("", "Tags"), ("_cn", "标签")]:
            with self.subTest(language=suffix):
                page = outputs[self.root / f"catalog/manipulation/dexterous/benchmarks{suffix}.md"]
                self.assertIn(f"**{label}:** `dexterous` `retargeting`", page)

    def test_optional_evaluation_scope_is_visible_for_benchmarks_and_models(self):
        for kind in ("benchmark", "model"):
            with self.subTest(kind=kind):
                paper = copy.deepcopy(self.paper)
                paper["kind"] = kind
                if kind == "model":
                    del paper["benchmark"]
                    paper["tldr"] = {"en": "Policy summary.", "zh": "策略简介。"}
                paper["evaluation_scope"] = {
                    "en": "Evaluated with one robot only.", "zh": "仅在一种机器人上评测。"}
                self.write_paper(paper)
                outputs = build_outputs(self.root)
                self.assertIn("Evaluated with one robot only.", outputs[
                    self.root / "catalog/manipulation/dexterous/benchmarks.md"])
                self.assertIn("仅在一种机器人上评测。", outputs[
                    self.root / "catalog/manipulation/dexterous/benchmarks_cn.md"])

    def test_display_labels_reach_home_category_and_svg_in_both_languages(self):
        self.paper["display_tags"] = [{"en": "In-hand", "zh": "手内操作"},
                                      {"en": "RL", "zh": "RL"}]
        self.write_paper(self.paper)
        outputs = build_outputs(self.root)
        for suffix, label in [("", "Work One｜In-hand · RL"),
                              ("_cn", "Work One｜手内操作 · RL")]:
            self.assertIn(label, outputs[self.root / f"README{suffix}.md"])
            self.assertIn(label, outputs[self.root / f"catalog/manipulation/dexterous/benchmarks{suffix}.md"])
            labels = ["".join(n.itertext()) for n in ET.fromstring(outputs[
                self.root / f"mindmap{suffix}.svg"]).findall("{http://www.w3.org/2000/svg}text")]
            self.assertIn(label, labels)

    def test_bold_display_tag_preserves_plain_text_and_syncs_formatted_views(self):
        self.paper["display_tags"] = [
            {"en": "Agent-built simulation", "zh": "Agent构建仿真", "bold": True},
            {"en": "Video", "zh": "视频", "bold": False}]
        self.write_paper(self.paper)
        outputs = build_outputs(self.root)
        exported = json.loads(outputs[self.root / "site/map.json"])["papers"][0]
        self.assertEqual(exported["labels"]["en"], "Work One｜Agent-built simulation · Video")
        self.assertTrue(exported["display_tags"][0]["bold"])
        for suffix, label in [("", "Agent-built simulation"), ("_cn", "Agent构建仿真")]:
            self.assertIn(f"**{label}**", outputs[self.root / f"README{suffix}.md"])
            svg = ET.fromstring(outputs[self.root / f"mindmap{suffix}.svg"])
            bold = [span.text for span in svg.findall(".//{http://www.w3.org/2000/svg}tspan")
                    if span.get("font-weight") == "700"]
            self.assertEqual(bold, [label])
            texts = ["".join(node.itertext()) for node in svg.findall("{http://www.w3.org/2000/svg}text")]
            self.assertIn(exported["labels"]["zh" if suffix else "en"], texts)

    def test_topics_include_hidden_papers_once_and_link_to_current_category(self):
        (self.root / "data/topics.json").write_text(json.dumps({
            "reinforcement-learning": {"en": "Reinforcement learning", "zh": "强化学习",
                                       "tags": ["reinforcement-learning", "residual-rl"]}}))
        self.paper.update(tags=["reinforcement-learning", "residual-rl"], show_on_map=False)
        self.write_paper(self.paper)
        self.category["catalog_path"] = "new-policy"
        self.write_taxonomy()
        outputs = build_outputs(self.root)
        for suffix, name in [("", "Reinforcement learning"), ("_cn", "强化学习")]:
            topic = self.root / f"catalog/topics/reinforcement-learning{suffix}.md"
            self.assertIn(topic, outputs)
            self.assertEqual(outputs[topic].count("#am-man-dex-bench-1"), 1)
            self.assertIn(f"../new-policy{suffix}.md#am-man-dex-bench-1", outputs[topic])
            self.assertIn(name, outputs[topic])
            self.assertIn(f"topics/reinforcement-learning{suffix}.md", outputs[
                self.root / f"catalog/new-policy{suffix}.md"])
            self.assertIn(f"{name} (1)", outputs[self.root / f"README{suffix}.md"])
            self.assertNotIn("Work One", outputs[self.root / f"README{suffix}.md"])
        generate(self.root)
        generate(self.root, check=True)

    def test_invalid_display_labels_are_rejected(self):
        for value in ("RL", [{"zh": "触觉"}], [{"en": "", "zh": "触觉"}],
                      [{"en": "RL", "zh": "RL"}] * 4,
                      [{"en": "Agent", "zh": "Agent", "bold": "true"}],
                      [{"en": "Agent", "zh": "Agent", "bold": 1}],
                      [{"en": "Agent", "zh": "Agent", "unknown": True}]):
            with self.subTest(value=value):
                self.paper["display_tags"] = value
                self.write_paper(self.paper)
                with self.assertRaises(ValueError):
                    self.load()

    def test_invalid_topic_definitions_and_route_collisions_are_rejected(self):
        for topics in ({"../outside": {"en": "RL", "zh": "RL", "tags": ["rl"]}},
                       {"rl": {"en": "RL", "tags": ["rl"]}},
                       {"rl": {"en": "RL", "zh": "RL", "tags": []}},
                       {"rl": {"en": "RL", "zh": "RL", "tags": ["Bad tag"]}}):
            with self.subTest(topics=topics):
                (self.root / "data/topics.json").write_text(json.dumps(topics))
                with self.assertRaises(ValueError):
                    build_outputs(self.root)
        (self.root / "data/topics.json").write_text(json.dumps({
            "rl": {"en": "RL", "zh": "RL", "tags": ["rl"]}}))
        self.category["catalog_path"] = "topics/rl"
        self.write_taxonomy()
        with self.assertRaises(ValueError):
            build_outputs(self.root)

    def test_missing_generated_file_and_edited_index_fail_read_only_check(self):
        generate(self.root)
        target = self.root / "catalog/manipulation/dexterous/benchmarks.md"
        expected = target.read_text()
        target.write_text(expected + "\nmanual edit\n")
        with self.assertRaises(ValueError):
            generate(self.root, check=True)
        self.assertEqual(target.read_text(), expected + "\nmanual edit\n")
        target.unlink()
        with self.assertRaises(ValueError):
            generate(self.root, check=True)
        self.assertFalse(target.exists())

    def test_duplicate_id_is_rejected(self):
        other = copy.deepcopy(self.paper)
        other["slug"] = "work-2"
        self.write_paper(other)
        with self.assertRaises(ValueError):
            self.load()

    def test_unknown_category_and_related_category_are_rejected(self):
        for key, value in [("category", "AM.UNKNOWN"), ("related_categories", ["AM.UNKNOWN"])]:
            with self.subTest(key=key):
                bad = copy.deepcopy(self.paper)
                bad[key] = value
                self.write_paper(bad)
                with self.assertRaises(ValueError):
                    self.load()

    def test_missing_translation_and_benchmark_fact_are_rejected(self):
        for mutation in ("translation", "field"):
            with self.subTest(mutation=mutation):
                bad = copy.deepcopy(self.paper)
                if mutation == "translation":
                    del bad["benchmark"]["hands"]["zh"]
                else:
                    del bad["benchmark"]["cross_hand"]
                self.write_paper(bad)
                with self.assertRaises(ValueError):
                    self.load()

    def test_invalid_dates_urls_and_unsafe_note_paths_are_rejected(self):
        for key, value in [
            ("verified_on", "2026-02-30"),
            ("links", {"paper": "javascript:alert(1)"}),
            ("notes", {"zh": "../outside.md"}),
        ]:
            with self.subTest(key=key):
                bad = copy.deepcopy(self.paper)
                bad[key] = value
                self.write_paper(bad)
                with self.assertRaises(ValueError):
                    self.load()

    def test_note_reference_must_exist(self):
        self.paper["notes"] = {"zh": "notes/missing.md"}
        self.write_paper(self.paper)
        with self.assertRaises(ValueError):
            self.load()

    def test_category_route_collisions_and_legacy_paper_lists_are_rejected(self):
        self.taxonomy["children"].append(dict(self.category, code="AM.OTHER"))
        self.write_taxonomy()
        with self.assertRaises(ValueError):
            load_taxonomy(self.root / "taxonomy.json")
        self.taxonomy["children"].pop()
        self.category["papers"] = []
        self.write_taxonomy()
        with self.assertRaises(ValueError):
            load_taxonomy(self.root / "taxonomy.json")

    def test_three_hundred_records_are_indexed_but_only_selected_names_are_mapped(self):
        for i in range(2, 301):
            paper = copy.deepcopy(self.paper)
            paper.update(id=f"AM.MAN.DEX.BENCH.{i}", slug=f"work-{i}",
                         short_name=f"Work {i}", title=f"Benchmark {i}", show_on_map=(i == 2))
            self.write_paper(paper)
        taxonomy, papers = self.load()
        self.assertEqual(len(papers), 300)
        title, tree, _ = render_tree(taxonomy, papers, "en")
        svg, _ = renderer.svg_document(title, tree)
        labels = ["".join(n.itertext()) for n in ET.fromstring(svg).findall("{http://www.w3.org/2000/svg}text")]
        self.assertIn("Work One", labels)
        self.assertIn("Work 2", labels)
        self.assertNotIn("Work 300", labels)
        index = build_outputs(self.root)[self.root / "catalog/manipulation/dexterous/benchmarks.md"]
        self.assertEqual(sum(line.startswith("| [AM.MAN.DEX.BENCH.") for line in index.splitlines()), 300)

    def test_missing_home_marker_fails_without_writing_files(self):
        (self.root / "README.md").write_text("# My page without markers\n")
        with self.assertRaises(ValueError):
            generate(self.root)
        self.assertFalse((self.root / "catalog").exists())

    def test_manual_catalog_file_is_not_overwritten(self):
        path = self.root / "catalog/manipulation/dexterous/benchmarks.md"
        path.parent.mkdir(parents=True)
        path.write_text("# My manual notes\n")
        with self.assertRaises(ValueError):
            generate(self.root)
        self.assertEqual(path.read_text(), "# My manual notes\n")

    def test_orphan_generated_catalog_is_reported_without_deleting_it(self):
        generate(self.root)
        orphan = self.root / "catalog/retired.md"
        orphan.write_text(GENERATED + "\n# Retired page\n")
        with self.assertRaises(ValueError):
            generate(self.root, check=True)
        self.assertTrue(orphan.exists())

    def test_stable_id_survives_category_move(self):
        self.taxonomy["children"].append(dict(
            self.category, code="AM.NEW", catalog_path="new-category"))
        self.write_taxonomy()
        self.paper["category"] = "AM.NEW"
        self.write_paper(self.paper)
        _, papers = self.load()
        self.assertEqual(papers[0]["id"], "AM.MAN.DEX.BENCH.1")
        self.assertIn("[AM.MAN.DEX.BENCH.1]",
                      build_outputs(self.root)[self.root / "catalog/new-category.md"])

    def test_taxonomy_rename_and_reparent_sync_all_views(self):
        self.taxonomy["children"].clear()
        self.category.update(name="Shared Evaluation", name_zh="共同评测")
        self.taxonomy["children"].append({
            "name": "New Direction", "name_zh": "新方向", "children": [self.category]})
        self.write_taxonomy()
        outputs = build_outputs(self.root)
        exported = json.loads(outputs[self.root / "site/map.json"])
        self.assertEqual(exported["taxonomy"], self.taxonomy)
        self.assertEqual(exported["papers"][0]["category"], self.category["code"])
        taxonomy, papers = self.load()
        _, tree, _ = render_tree(taxonomy, papers, "zh")
        self.assertEqual(tree[-1]["name"], "新方向")
        self.assertEqual(tree[-1]["children"][0]["name"], "共同评测")
        self.assertIn("Work One", str(tree[-1]["children"][0]["children"]))
        for filename in ("README_cn.md", "catalog/README_cn.md", "mindmap_cn.svg", "site/mindmap_cn.svg"):
            self.assertIn("共同评测", outputs[self.root / filename])
            self.assertNotIn("评测基准", outputs[self.root / filename])

    def test_deep_paper_nodes_clear_parent_labels(self):
        taxonomy, papers = self.load()
        title, tree, _ = render_tree(taxonomy, papers, "en")
        renderer.prepare_positions(title, tree)
        def inspect(node):
            for child in node["children"]:
                self.assertLess(child["x"], node["x"] - renderer.label_width(node) - 28)
                inspect(child)
        inspect(tree[0])

    def test_seventh_map_leaf_does_not_leave_excessive_bottom_whitespace(self):
        tree = [{"name": "Branch", "code": None, "depth": 1, "children": [
            {"name": f"Work {i}", "code": None, "depth": 2, "children": []}
            for i in range(7)
        ]}]
        _, height, _, _, leaves = renderer.prepare_positions("Actions", tree)
        self.assertLessEqual(height - max(node["y"] for node in leaves), 120)


if __name__ == "__main__":
    unittest.main()
