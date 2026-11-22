#!/usr/bin/env python3
"""Extract numbered textbook figures ('N-rasm.') at 4x resolution from a PDF.

Usage:
  python3 scripts/render_fig.py fizika_7_uzb.pdf public/books/grade7 2 3 4
  python3 scripts/render_fig.py fizika_7_uzb.pdf public/books/grade7        # all figures
"""

from __future__ import annotations

import os
import re
import sys
import pymupdf

CAPTION_START_RE = re.compile(r"^(\d+)-rasm\.")


def is_decorative_frame_or_icon(img: dict) -> bool:
    w, h = img["width"], img["height"]
    # Callout / definition box border (~1503x224) and small section icons (86x86, 43x43, 91x68)
    if w <= 95 and h <= 95:
        return True
    if w >= 1200 and h <= 300:
        return True
    return False


def find_caption_rects(page: pymupdf.Page) -> list[tuple[int, pymupdf.Rect]]:
    """Return list of (fig_number, caption_rect) on the page."""
    d = page.get_text("dict")
    lines: list[tuple[pymupdf.Rect, str, float, bool]] = []
    for b in d["blocks"]:
        if b["type"] != 0:
            continue
        for line in b["lines"]:
            spans = [s for s in line["spans"] if s["text"].strip()]
            if not spans:
                continue
            text = "".join(s["text"] for s in spans).strip()
            rect = pymupdf.Rect(line["bbox"])
            first_size = spans[0]["size"]
            first_bold = bool(spans[0]["flags"] & 16)
            lines.append((rect, text, first_size, first_bold))

    lines.sort(key=lambda item: (round(item[0].y0, 1), round(item[0].x0, 1)))

    captions: list[tuple[int, pymupdf.Rect]] = []
    i = 0
    while i < len(lines):
        rect, text, size, is_bold = lines[i]
        m = CAPTION_START_RE.match(text)
        if m and size <= 11.8 and (is_bold or text.startswith(f"{m.group(1)}-rasm.")):
            fig_num = int(m.group(1))
            cap_rect = pymupdf.Rect(rect)
            j = i + 1
            while j < len(lines):
                nrect, ntext, nsize, _ = lines[j]
                if CAPTION_START_RE.match(ntext):
                    break
                # Continuation line of same caption: directly below (or overlapping leading), similar size, overlapping x range
                if (
                    nsize <= 11.8
                    and -4.0 <= (nrect.y0 - cap_rect.y1) <= 6.0
                    and nrect.x0 < cap_rect.x1 + 25
                    and nrect.x1 > cap_rect.x0 - 25
                ):
                    cap_rect |= nrect
                    j += 1
                else:
                    break
            captions.append((fig_num, cap_rect))
            i = j
        else:
            i += 1
    return captions


def pick_anchor_image(
    page: pymupdf.Page, cap_rect: pymupdf.Rect
) -> pymupdf.Rect | None:
    candidates = [
        pymupdf.Rect(im["bbox"])
        for im in page.get_image_info(xrefs=True)
        if not is_decorative_frame_or_icon(im)
    ]
    if not candidates:
        return None

    cap_cx = (cap_rect.x0 + cap_rect.x1) / 2.0

    def score(r: pymupdf.Rect) -> tuple[int, float]:
        # Prefer images whose bottom sits above (or within 12pt of) the caption top
        above_penalty = 0 if r.y1 <= cap_rect.y0 + 12.0 else 1
        img_cx = (r.x0 + r.x1) / 2.0
        dx = abs(img_cx - cap_cx)
        dy = max(0.0, cap_rect.y0 - r.y1) if r.y1 <= cap_rect.y0 else (r.y0 - cap_rect.y1 + 200.0)
        return (above_penalty, dy + dx * 0.6)

    return min(candidates, key=score)


def collect_small_labels_and_drawings(
    page: pymupdf.Page,
    anchor: pymupdf.Rect,
    cap_rect: pymupdf.Rect,
    all_captions: list[tuple[int, pymupdf.Rect]],
) -> pymupdf.Rect:
    clip = pymupdf.Rect(anchor)
    min_y0 = 63.0
    for _, other_cap in all_captions:
        # Prevent expanding upward into an earlier caption above this figure
        if other_cap.y1 <= anchor.y0 + 2.0 and other_cap.intersects(
            pymupdf.Rect(anchor.x0 - 40.0, 0.0, anchor.x1 + 40.0, page.rect.height)
        ):
            min_y0 = max(min_y0, other_cap.y1 + 1.5)

    search_pad = pymupdf.Rect(
        anchor.x0 - 12.0,
        max(min_y0, anchor.y0 - 14.0),
        anchor.x1 + 12.0,
        min(anchor.y1 + 14.0, cap_rect.y0 - 0.5),
    )

    # Include nearby vector drawings (axes, arrows, arcs), skip full-width horizontal rules
    for d in page.get_drawings():
        r = pymupdf.Rect(d["rect"])
        if r.width > 300 and r.height < 4:
            continue
        if r.intersects(search_pad) and r.y1 <= cap_rect.y0 and r.y0 >= min_y0 - 1.0:
            clip |= r

    # Include figure labels (x, y, z, o, A, B, C, F1, s1, v2, etc.), excluding captions & prose blocks
    text_dict = page.get_text("dict")
    for b in text_dict["blocks"]:
        if b["type"] != 0:
            continue
        block_text = " ".join(
            "".join(s["text"] for s in line["spans"]).strip()
            for line in b["lines"]
        ).strip()
        # Skip body paragraphs and multi-word captions
        if len(block_text) > 22:
            continue
        for line in b["lines"]:
            lrect = pymupdf.Rect(line["bbox"])
            ltext = "".join(s["text"] for s in line["spans"]).strip()
            if not ltext or lrect.y0 < min_y0 or lrect.y1 > 645.0:
                continue
            if any(
                lrect.intersects(pymupdf.Rect(cr.x0 - 2, cr.y0 - 2, cr.x1 + 2, cr.y1 + 2))
                for _, cr in all_captions
            ):
                continue
            lwidth = lrect.width
            for s in line["spans"]:
                stext = s["text"].strip()
                if not stext:
                    continue
                is_small_label = s["size"] <= 11.55 and lwidth <= 55.0
                is_math_token = (
                    s["size"] <= 13.0
                    and lwidth <= 22.0
                    and len(ltext) <= 6
                    and not any(ch in ltext for ch in (".", ",", ";", ":"))
                )
                if not (is_small_label or is_math_token):
                    continue
                sr = pymupdf.Rect(s["bbox"])
                if sr.intersects(search_pad) and sr.y0 < cap_rect.y0 - 0.5:
                    clip |= sr

    # Avoid padding into adjacent body text columns outside the figure
    pad_left = 4.0
    pad_right = 4.0
    pad_top = 2.0
    for b in text_dict["blocks"]:
        if b["type"] != 0:
            continue
        for line in b["lines"]:
            lr = pymupdf.Rect(line["bbox"])
            ltext = "".join(s["text"] for s in line["spans"]).strip()
            if not ltext or lr.y1 < clip.y0 - 4.0 or lr.y0 > clip.y1 + 4.0:
                continue
            if lr.width > 40.0 and lr.x0 >= clip.x1 - 1.0 and lr.x0 <= clip.x1 + 5.0:
                pad_right = min(pad_right, max(0.0, lr.x0 - clip.x1 - 0.5))
            if lr.width > 40.0 and lr.x1 <= clip.x0 + 1.0 and lr.x1 >= clip.x0 - 5.0:
                pad_left = min(pad_left, max(0.0, clip.x0 - lr.x1 - 0.5))

    clip.x0 = max(0.0, clip.x0 - pad_left)
    clip.y0 = max(min_y0 + 1.0 if min_y0 > 63.0 else 0.0, clip.y0 - pad_top)
    clip.x1 = min(page.rect.width, clip.x1 + pad_right)
    clip.y1 = min(clip.y1 + 2.5, cap_rect.y0 - 0.5)
    return clip


def render_figures(
    pdf_path: str,
    out_dir: str,
    target_figs: set[int] | None = None,
) -> list[tuple[int, str, int]]:
    os.makedirs(out_dir, exist_ok=True)
    doc = pymupdf.open(pdf_path)
    rendered: list[tuple[int, str, int]] = []

    for pno in range(len(doc)):
        page = doc[pno]
        captions = find_caption_rects(page)
        for fig_num, cap_rect in captions:
            if target_figs is not None and fig_num not in target_figs:
                continue
            anchor = pick_anchor_image(page, cap_rect)
            if anchor is None:
                continue
            clip = collect_small_labels_and_drawings(page, anchor, cap_rect, captions)
            if clip.width <= 1 or clip.height <= 1:
                continue
            pix = page.get_pixmap(
                matrix=pymupdf.Matrix(4, 4),
                clip=clip,
                alpha=False,
            )
            out_path = os.path.join(out_dir, f"rasm-{fig_num}.png")
            pix.save(out_path)
            rendered.append((fig_num, out_path, pno + 1))
            print(
                f"Rendered rasm-{fig_num}.png (page {pno+1}) clip={[round(v,1) for v in clip]} size={pix.width}x{pix.height}"
            )

    return rendered


def main() -> None:
    if len(sys.argv) < 3:
        print("Usage: render_fig.py <pdf_path> <out_dir> [fig_nums...]", file=sys.stderr)
        sys.exit(1)
    pdf_path = sys.argv[1]
    out_dir = sys.argv[2]
    target_figs = {int(x) for x in sys.argv[3:]} if len(sys.argv) > 3 else None
    render_figures(pdf_path, out_dir, target_figs)


if __name__ == "__main__":
    main()
