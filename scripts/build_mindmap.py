#!/usr/bin/env python3
"""Validate taxonomy and render the repository's XMind-style SVG map."""

import argparse
import html
import json
import re
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "taxonomy.json"
README = ROOT / "README.md"
README_CN = ROOT / "README_cn.md"
SVG = ROOT / "mindmap.svg"
SVG_CN = ROOT / "mindmap_cn.svg"
PAGE = ROOT / "mindmap.md"
PAGE_CN = ROOT / "mindmap_cn.md"
PALETTE = ["#05a6c7", "#ff7b50", "#b1c91e", "#ff9f24", "#a96ab1", "#7d7bc5", "#13a98b"]
CODE_RE = re.compile(r"^[A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+$")
PAPER_ID_RE = re.compile(r"^\|\s*\[([A-Z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+\.\d+)\]\s*\|")


def clean_text(value, context):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{context}必须是非空字符串")
    return " ".join(value.split())


def load_taxonomy(language="en"):
    data = json.loads(SOURCE.read_text(encoding="utf-8"))
    if not isinstance(data, dict):
        raise ValueError("taxonomy.json 最外层必须是对象")
    title = clean_text(data.get("title" if language == "en" else "title_zh"), "title ")
    branches = data.get("children")
    if not isinstance(branches, list) or not branches:
        raise ValueError("根节点 children 必须是非空列表")
    codes = set()

    def visit(nodes, depth=1):
        out = []
        for node in nodes:
            if not isinstance(node, dict):
                raise ValueError("每个分类节点都必须是对象")
            name = clean_text(node.get("name" if language == "en" else "name_zh"), "分类 name ")
            children = node.get("children", [])
            if not isinstance(children, list):
                raise ValueError(f"分类“{name}”的 children 必须是列表")
            code = node.get("code")
            if code is not None:
                if not isinstance(code, str) or not CODE_RE.fullmatch(code):
                    raise ValueError(f"分类“{name}”的 code 格式无效：{code!r}")
                if children:
                    raise ValueError(f"带 code 的分类“{name}”必须是论文分类末端节点")
                if code in codes:
                    raise ValueError(f"分类 code 重复：{code}")
                codes.add(code)
            elif not children:
                raise ValueError(f"末端分类“{name}”必须填写 code")
            out.append({"name": name, "code": code, "depth": depth, "children": visit(children, depth + 1)})
        return out

    tree = visit(branches)
    return title, tree, codes


def check_paper_ids(codes):
    counts = {}
    id_sets = {}
    for readme in (README, README_CN):
        paper_ids = []
        for line_number, line in enumerate(readme.read_text(encoding="utf-8").splitlines(), 1):
            match = PAPER_ID_RE.match(line)
            if not match:
                continue
            paper_id = match.group(1)
            category_code = paper_id.rsplit(".", 1)[0]
            if category_code not in codes:
                raise ValueError(f"{readme.name} 第 {line_number} 行使用了未定义的分类 code：{category_code}")
            if paper_id in paper_ids:
                raise ValueError(f"{readme.name} 中论文编号重复：{paper_id}")
            paper_ids.append(paper_id)
        counts[readme.name] = len(paper_ids)
        id_sets[readme.name] = set(paper_ids)
    if id_sets[README.name] != id_sets[README_CN.name]:
        missing_cn = sorted(id_sets[README.name] - id_sets[README_CN.name])
        missing_en = sorted(id_sets[README_CN.name] - id_sets[README.name])
        raise ValueError(f"中英文 README 的论文编号不一致；中文缺少 {missing_cn}，英文缺少 {missing_en}")
    return counts


def prepare_positions(title, tree):
    leaves = []

    def collect(node, top_index):
        node["top_index"] = top_index
        if not node["children"]:
            leaves.append(node)
            return [len(leaves) - 1]
        positions = []
        for child in node["children"]:
            positions.extend(collect(child, top_index))
        node["first_leaf"] = positions[0]
        node["last_leaf"] = positions[-1]
        return positions

    for i, branch in enumerate(tree):
        collect(branch, i)
    row_gap = 120 if len(leaves) <= 6 else 34
    min_height = 360 if len(leaves) <= 6 else 1040
    height = max(min_height, (len(leaves) - 1) * row_gap + 220)
    width, center_x = 3600, 1800

    def assign(node):
        node["side"] = -1 if node["top_index"] % 2 == 0 else 1
        if node["children"]:
            node["y"] = 110 + (node["first_leaf"] + node["last_leaf"]) * row_gap / 2
            for child in node["children"]:
                assign(child)
        else:
            node["y"] = 110 + leaves.index(node) * row_gap

    for branch in tree:
        assign(branch)
    for branch in tree:
        branch["side"] = -1 if branch["top_index"] % 2 == 0 else 1

    def set_x(node):
        node["x"] = center_x + node["side"] * min(450 * node["depth"], 1350)
        for child in node["children"]:
            set_x(child)

    for branch in tree:
        set_x(branch)
    return width, height, center_x, 110 + (len(leaves) - 1) * row_gap / 2, leaves


def label_width(node):
    text = node["name"] + (f" [{node['code']}]" if node["code"] else "")
    units = sum(1 if unicodedata.east_asian_width(char) in "WF" else 0.56 for char in text)
    return units * (21 if not node["children"] else 22)


def svg_document(title, tree, language="en"):
    width, height, center_x, center_y, leaves = prepare_positions(title, tree)
    title_units = sum(1 if unicodedata.east_asian_width(char) in "WF" else 0.56 for char in title)
    title_width = max(360, round(title_units * 34 + 96))

    def horizontal_bounds(node):
        yield node["x"]
        yield node["x"] + node["side"] * (label_width(node) + 28)
        for child in node["children"]:
            yield from horizontal_bounds(child)

    bounds = [center_x - title_width / 2, center_x + title_width / 2]
    for branch in tree:
        bounds.extend(horizontal_bounds(branch))
    left = min(bounds) - 80
    width = max(bounds) - left + 80
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{left} 0 {width} {height}" role="img" aria-labelledby="title desc">',
        f'<title id="title">{html.escape(title)} Mind Map</title>' if language == "en" else f'<title id="title">{html.escape(title)} 领域思维导图</title>',
        '<desc id="desc">A colorful taxonomy map with a code for each leaf category.</desc>' if language == "en" else '<desc id="desc">由分类树自动生成的彩色分支图，叶节点显示论文分类标签。</desc>',
        f'<rect x="{left}" width="{width}" height="{height}" fill="#ffffff"/>',
        '<g fill="none" stroke-linecap="round" stroke-linejoin="round">',
    ]

    def draw_edges(node, parent_x, parent_y, color):
        x, y = node["x"], node["y"]
        mid = (parent_x + x) / 2
        parts.append(f'<path d="M {parent_x} {parent_y} C {mid} {parent_y}, {mid} {y}, {x} {y}" stroke="{color}" stroke-width="{5 if node["depth"] == 1 else 3}"/>')
        text_edge = x + node["side"] * (label_width(node) + 28)
        for child in node["children"]:
            draw_edges(child, text_edge, y, color)

    for index, branch in enumerate(tree):
        draw_edges(branch, center_x, center_y, PALETTE[index % len(PALETTE)])
    parts.append('</g>')

    def draw_nodes(node, color):
        name = html.escape(node["name"])
        side = node["side"]
        is_leaf = not node["children"]
        code = f'<tspan dx="6" fill="{color}" font-weight="650">[{html.escape(node["code"])}]</tspan>' if node["code"] else ""
        anchor = "end" if side < 0 else "start"
        dx = -16 if side < 0 else 16
        font_size = 21 if is_leaf else 22
        weight = 500 if is_leaf else 650
        parts.append(f'<circle cx="{node["x"]}" cy="{node["y"]}" r="{4 if is_leaf else 5}" fill="{color}"/>')
        parts.append(f'<text x="{node["x"] + dx}" y="{node["y"] + 7}" text-anchor="{anchor}" font-family="Arial, Noto Sans CJK SC, sans-serif" font-size="{font_size}" font-weight="{weight}" fill="#242424">{name}{code}</text>')
        for child in node["children"]:
            draw_nodes(child, color)

    for index, branch in enumerate(tree):
        draw_nodes(branch, PALETTE[index % len(PALETTE)])
    parts.append(f'<rect x="{center_x - title_width / 2}" y="{center_y - 54}" width="{title_width}" height="108" rx="54" fill="#ffffff" stroke="#ff6674" stroke-width="5"/>')
    parts.append(f'<text x="{center_x}" y="{center_y + 9}" text-anchor="middle" font-family="Arial, Noto Sans CJK SC, sans-serif" font-size="34" font-weight="700" fill="#171717">{html.escape(title)}</text>')
    parts.append('</svg>')
    return "\n".join(parts), len(leaves)


def mindmap_page(title, language="en"):
    if language == "zh":
        return (
            f"# {title}：领域思维导图\n\n"
            "本图由 `taxonomy.json` 自动生成。分类编码可供论文列表引用。\n\n"
            "[![领域思维导图](mindmap_cn.svg)](mindmap_cn.svg)\n"
        )
    return (
        f"# {title}: Field Mind Map\n\n"
        "Generated from `taxonomy.json`. Category codes are used to label papers in the list.\n\n"
        f"[![{title} field mind map](mindmap.svg)](mindmap.svg)\n"
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="只校验分类树和中英文 README 中的论文标签")
    args = parser.parse_args()
    try:
        title, tree, codes = load_taxonomy("en")
        title_zh, tree_zh, _ = load_taxonomy("zh")
        paper_counts = check_paper_ids(codes)
        svg, leaf_count = svg_document(title, tree, "en")
        svg_zh, _ = svg_document(title_zh, tree_zh, "zh")
        if args.check:
            generated = (
                (SVG, svg + "\n"),
                (SVG_CN, svg_zh + "\n"),
                (PAGE, mindmap_page(title, "en")),
                (PAGE_CN, mindmap_page(title_zh, "zh")),
            )
            for path, expected in generated:
                if path.exists() and path.read_text(encoding="utf-8") != expected:
                    raise ValueError(f"{path.name} 已过期；请运行 python3 scripts/build_mindmap.py 并提交生成文件")
            counts = "，".join(f"{name} {count} 篇" for name, count in paper_counts.items())
            print(f"分类树正确：{len(codes)} 个论文分类标签；论文编号有效：{counts}")
            return 0
        SVG.write_text(svg + "\n", encoding="utf-8")
        SVG_CN.write_text(svg_zh + "\n", encoding="utf-8")
        PAGE.write_text(mindmap_page(title, "en"), encoding="utf-8")
        PAGE_CN.write_text(mindmap_page(title_zh, "zh"), encoding="utf-8")
        print(f"已生成中英文思维导图和独立页面（{leaf_count} 个末端分类）")
        return 0
    except (OSError, json.JSONDecodeError, ValueError) as exc:
        print(f"错误：{exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
