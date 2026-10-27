#!/usr/bin/env python3
"""SVG renderer; running this file delegates to the complete catalog builder."""

import html
import unicodedata

PALETTE = ["#05a6c7", "#ff7b50", "#b1c91e", "#ff9f24", "#a96ab1", "#7d7bc5", "#13a98b"]


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
    row_gap = max(34, min(120, 900 / max(1, len(leaves) - 1)))
    height = max(360, (len(leaves) - 1) * row_gap + 220)
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

    def set_x(node, parent_edge=None):
        node["x"] = (center_x + node["side"] * 450 if parent_edge is None
                     else parent_edge + node["side"] * 120)
        text_edge = node["x"] + node["side"] * (label_width(node) + 28)
        for child in node["children"]:
            set_x(child, text_edge)

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
        '<desc id="desc">Research categories with category codes and named paper entries.</desc>' if language == "en" else '<desc id="desc">由分类数据自动生成的研究地图，显示分类码及已添加的工作名称。</desc>',
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
        if node.get("label_parts"):
            name = "".join(f'<tspan font-weight="700">{html.escape(part["text"])}</tspan>'
                           if part["bold"] else html.escape(part["text"])
                           for part in node["label_parts"])
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
            "本图由 `taxonomy.json` 自动生成。分类编码对应论文列表，总图仅显示选定代表工作；全部条目见分类索引。\n\n"
            "[![领域思维导图](mindmap_cn.svg)](mindmap_cn.svg)\n"
        )
    return (
        f"# {title}: Field Mind Map\n\n"
        "Generated from `taxonomy.json`. Category codes identify list sections; selected paper names appear on the overview map; the full collection is in the category indexes.\n\n"
        f"[![{title} field mind map](mindmap.svg)](mindmap.svg)\n"
    )


if __name__ == "__main__":
    from build_catalog import main
    raise SystemExit(main())
