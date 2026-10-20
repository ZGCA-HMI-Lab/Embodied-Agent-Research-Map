"""Canonical taxonomy and paper records. Uses only the Python standard library."""
import json
import re
from datetime import date
from pathlib import Path
from urllib.parse import urlsplit

LANGUAGES = ("en", "zh")
CODE_RE = re.compile(r"^[A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+$")
ID_RE = re.compile(r"^[A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+\.[1-9]\d*$")
SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
ROUTE_RE = re.compile(r"^[a-z0-9-]+(?:/[a-z0-9-]+)*$")
BENCHMARK_FIELDS = ("hands", "tasks", "cross_hand", "release", "highlight")
LINK_KEYS = ("paper", "project", "code", "data", "assets", "hand_catalog")
READING_STATUSES = ("indexed", "skimmed", "read", "reproduced")


def text(value, context):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{context}: must be a non-empty string")
    return value.strip()


def localized(value, context):
    if not isinstance(value, dict) or set(value) != set(LANGUAGES):
        raise ValueError(f"{context}: en and zh are required")
    for language in LANGUAGES:
        text(value[language], f"{context}.{language}")


def read_json(path):
    def unique_pairs(pairs):
        result = {}
        for key, value in pairs:
            if key in result:
                raise ValueError(f"{path}: duplicate JSON key {key}")
            result[key] = value
        return result
    return json.loads(Path(path).read_text(encoding="utf-8"), object_pairs_hook=unique_pairs)


def url(value, context):
    value = text(value, context)
    parsed = urlsplit(value)
    if parsed.scheme not in ("http", "https") or not parsed.netloc or any(c.isspace() for c in value):
        raise ValueError(f"{context}: must be an HTTP(S) URL")


def categories(taxonomy):
    result = {}
    def walk(nodes):
        for node in nodes:
            if node.get("code"):
                result[node["code"]] = node
            walk(node["children"])
    walk(taxonomy["children"])
    return result


def load_taxonomy(path):
    data = read_json(path)
    if not isinstance(data, dict) or set(data) != {"title", "title_zh", "children"}:
        raise ValueError("taxonomy: expected title, title_zh and children")
    text(data["title"], "title")
    text(data["title_zh"], "title_zh")
    if not isinstance(data["children"], list) or not data["children"]:
        raise ValueError("taxonomy.children must be a non-empty list")
    codes, routes = set(), set()
    allowed = {"name", "name_zh", "children", "code", "catalog_path", "description", "description_zh"}

    def visit(nodes):
        for node in nodes:
            if not isinstance(node, dict) or set(node) - allowed:
                raise ValueError("taxonomy node has unknown fields; paper lists belong in data/papers")
            text(node.get("name"), "name")
            text(node.get("name_zh"), "name_zh")
            children = node.get("children")
            if not isinstance(children, list):
                raise ValueError("taxonomy node children must be a list")
            code = node.get("code")
            if children:
                if code is not None or any(k in node for k in ("catalog_path", "description", "description_zh")):
                    raise ValueError("Only leaf categories may define codes, routes and descriptions")
            else:
                if not isinstance(code, str) or not CODE_RE.fullmatch(code) or code in codes:
                    raise ValueError(f"Invalid or duplicate category code: {code}")
                codes.add(code)
                route = node.get("catalog_path")
                if not isinstance(route, str) or not ROUTE_RE.fullmatch(route) or route.split("/")[-1] == "readme":
                    raise ValueError(f"Invalid catalog_path: {route}")
                if route in routes:
                    raise ValueError(f"Duplicate catalog_path: {route}")
                routes.add(route)
                text(node.get("description"), "description")
                text(node.get("description_zh"), "description_zh")
            visit(children)
    visit(data["children"])
    return data


def load_papers(root, taxonomy):
    root = Path(root)
    known = categories(taxonomy)
    directory = root / "data/papers"
    if not directory.is_dir():
        raise ValueError("Missing data/papers directory")
    required = {"schema_version", "id", "slug", "short_name", "title", "authors", "year", "venue",
                "kind", "category", "related_categories", "tags", "links", "sources", "verified_on",
                "reading_status", "notes", "show_on_map"}
    optional = {"benchmark", "tldr", "evaluation_scope"}
    records, ids, slugs, identities = [], set(), set(), set()
    retired_path = root / "data/retired_ids.json"
    retired = read_json(retired_path) if retired_path.exists() else []
    if not isinstance(retired, list) or any(not isinstance(i, str) or not ID_RE.fullmatch(i) for i in retired):
        raise ValueError("retired_ids must be a list of paper IDs")
    if len(set(retired)) != len(retired):
        raise ValueError("Duplicate retired ID")
    for path in sorted(directory.glob("*.json")):
        record = read_json(path)
        if not isinstance(record, dict) or not required <= set(record) or set(record) - required - optional:
            raise ValueError(f"{path.name}: missing or unknown fields")
        if type(record["schema_version"]) is not int or record["schema_version"] != 1:
            raise ValueError(f"{path.name}: unsupported schema_version")
        paper_id, slug = record["id"], record["slug"]
        if not isinstance(paper_id, str) or not ID_RE.fullmatch(paper_id) or paper_id in ids or paper_id in retired:
            raise ValueError(f"Invalid, duplicate or retired paper ID: {paper_id}")
        if not isinstance(slug, str) or not SLUG_RE.fullmatch(slug) or slug in slugs or path.stem != slug:
            raise ValueError(f"Invalid, duplicate or filename-mismatched slug: {slug}")
        ids.add(paper_id)
        slugs.add(slug)
        for key in ("short_name", "title", "authors", "venue"):
            text(record[key], f"{slug}.{key}")
        identity = re.sub(r"\s+", " ", record["title"]).strip().casefold()
        if identity in identities:
            raise ValueError(f"Duplicate paper title: {record['title']}")
        identities.add(identity)
        if type(record["year"]) is not int or not 1 <= record["year"] <= 9999:
            raise ValueError(f"{slug}: invalid year")
        if record["category"] not in known:
            raise ValueError(f"{slug}: unknown primary category")
        related = record["related_categories"]
        if (not isinstance(related, list) or any(not isinstance(c, str) or c not in known for c in related)
                or len(set(related)) != len(related) or record["category"] in related):
            raise ValueError(f"{slug}: invalid related_categories")
        tags = record["tags"]
        if (not isinstance(tags, list) or any(not isinstance(t, str) or not SLUG_RE.fullmatch(t) for t in tags)
                or len(set(tags)) != len(tags)):
            raise ValueError(f"{slug}: invalid tags")
        if record["kind"] not in ("benchmark", "model", "dataset", "tool", "survey"):
            raise ValueError(f"{slug}: invalid kind")
        if record["kind"] == "benchmark":
            facts = record.get("benchmark")
            if not isinstance(facts, dict) or set(facts) != set(BENCHMARK_FIELDS) or "tldr" in record:
                raise ValueError(f"{slug}: benchmark requires exactly five fact fields")
            for field in BENCHMARK_FIELDS:
                localized(facts[field], f"{slug}.benchmark.{field}")
        else:
            if "benchmark" in record:
                raise ValueError(f"{slug}: benchmark fields require kind=benchmark")
            localized(record.get("tldr"), f"{slug}.tldr")
        if "evaluation_scope" in record:
            localized(record["evaluation_scope"], f"{slug}.evaluation_scope")
        links = record["links"]
        if not isinstance(links, dict) or "paper" not in links or set(links) - set(LINK_KEYS):
            raise ValueError(f"{slug}: invalid links")
        for key, value in links.items():
            url(value, f"{slug}.links.{key}")
        sources = record["sources"]
        if not isinstance(sources, list) or not sources:
            raise ValueError(f"{slug}: sources must not be empty")
        for value in sources:
            url(value, f"{slug}.sources")
        try:
            if date.fromisoformat(record["verified_on"]).isoformat() != record["verified_on"]:
                raise ValueError()
        except (TypeError, ValueError):
            raise ValueError(f"{slug}: verified_on must be YYYY-MM-DD")
        if record["reading_status"] not in READING_STATUSES or type(record["show_on_map"]) is not bool:
            raise ValueError(f"{slug}: invalid reading status or show_on_map")
        notes = record["notes"]
        if not isinstance(notes, dict) or set(notes) - set(LANGUAGES):
            raise ValueError(f"{slug}: invalid notes")
        for language, note_path in notes.items():
            if not isinstance(note_path, str):
                raise ValueError(f"{slug}: invalid note path")
            note = Path(note_path)
            if (note.is_absolute() or ".." in note.parts or not note.parts or note.parts[0] != "notes"
                    or note.suffix != ".md" or not (root / note).is_file()
                    or not (root / note).resolve().is_relative_to((root / "notes").resolve())):
                raise ValueError(f"{slug}: note must be an existing file inside notes/")
        records.append(record)
    return sorted(records, key=lambda p: (-p["year"], p["id"].rsplit(".", 1)[0], int(p["id"].rsplit(".", 1)[1])))


def render_tree(taxonomy, records, language):
    if language not in LANGUAGES:
        raise ValueError("Unknown language")
    def visit(nodes, depth=1):
        rendered = []
        for node in nodes:
            code = node.get("code")
            children = visit(node["children"], depth + 1)
            if code:
                for paper in records:
                    if paper["category"] == code and paper["show_on_map"]:
                        children.append({"name": paper["short_name"], "code": None, "paper_id": paper["id"],
                                         "depth": depth + 1, "children": []})
            rendered.append({"name": node["name" if language == "en" else "name_zh"],
                             "code": code, "depth": depth, "children": children})
        return rendered
    return taxonomy["title" if language == "en" else "title_zh"], visit(taxonomy["children"]), set(categories(taxonomy))
