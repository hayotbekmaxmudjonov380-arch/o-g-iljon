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
        if m and size <= 11.2 and (is_bold or text.startswith(f"{m.group(1)}-rasm.")):
            fig_num = int(m.group(1))
            cap_rect = pymupdf.Rect(rect)
            j = i + 1
            while j < len(lines):
                nrect, ntext, nsize, _ = lines[j]
                if CAPTION_START_RE.match(ntext):
                    break
                # Continuation line of same caption: directly below, similar size, overlapping x range
                if (
                    nsize <= 11.2
                    and 0 <= (nrect.y0 - cap_rect.y1) <= 6.0
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
) -> pymupdf.Rect:
    clip = pymupdf.Rect(anchor)
    search_pad = pymupdf.Rect(
        anchor.x0 - 22.0,
        anchor.y0 - 22.0,
        anchor.x1 + 22.0,
        min(anchor.y1 + 12.0, cap_rect.y0 - 0.5),
    )

    # Include nearby vector drawings (axes, arrows, arcs), skip full-width horizontal rules
    for d in page.get_drawings():
        r = pymupdf.Rect(d["rect"])
        if r.width > 300 and r.height < 4:
            continue
        if r.intersects(search_pad) and r.y1 <= cap_rect.y0:
            clip |= r

    # Include small figure labels (x, y, z, o, A, B, etc. with size <= 11.5)
    text_dict = page.get_text("dict")
    for b in text_dict["blocks"]:
        if b["type"] != 0:
            continue
        for line in b["lines"]:
            for s in line["spans"]:
                if not s["text"].strip():
                    continue
                if s["size"] > 11.55:
                    continue
                sr = pymupdf.Rect(s["bbox"])
                # Skip running headers/footers and caption region itself
                if sr.y0 < 63.0 or sr.y1 > 645.0:
                    continue
                if sr.intersects(pymupdf.Rect(cap_rect.x0 - 2, cap_rect.y0 - 2, cap_rect.x1 + 2, cap_rect.y1 + 2)):
                    continue
                if sr.intersects(search_pad) and sr.y0 < cap_rect.y0 - 1.0:
                    clip |= sr

    clip.x0 = max(0.0, clip.x0 - 4.0)
    clip.y0 = max(0.0, clip.y0 - 4.0)
    clip.x1 = min(page.rect.width, clip.x1 + 4.0)
    clip.y1 = min(clip.y1 + 2.0, cap_rect.y0 - 0.5)
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
            clip = collect_small_labels_and_drawings(page, anchor, cap_rect)
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
