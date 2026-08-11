#!/usr/bin/env python3
"""Generate CodeArc branded quotation PDF for Wild Ridge (Dasun Marasinghe)."""

from __future__ import annotations

import os
from datetime import date, timedelta
from pathlib import Path

from reportlab.lib.colors import Color, HexColor, white, black
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    Image,
    KeepTogether,
    HRFlowable,
    ListFlowable,
    ListItem,
    Flowable,
    PageBreak,
)
from reportlab.lib.utils import ImageReader
from reportlab.pdfgen import canvas as pdfcanvas

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "exports" / "quotations"
OUT_PDF = OUT_DIR / "CodeArc_Quotation_Wild_Ridge.pdf"
LOGO = ROOT / "public" / "brand" / "codearc-icon-512.jpg"
MARK = ROOT / "public" / "brand" / "codearc-mark-app.jpg"

# Brand colours
CREAM = HexColor("#F7F2EA")
CREAM_DARK = HexColor("#F3F0E8")
INK = HexColor("#0B0C0B")
INK_SOFT = HexColor("#171917")
MUTED = HexColor("#5C5A55")
LINE = HexColor("#E6E1D6")
ACCENT = HexColor("#C83A21")
ACCENT_SOFT = HexColor("#E85A2F")
GREEN = HexColor("#2F7A52")
PANEL = HexColor("#FAF8F3")
HEADER_BG = HexColor("#0B0C0B")

PAGE_W, PAGE_H = A4
MARGIN_L = 16 * mm
MARGIN_R = 16 * mm
MARGIN_T = 28 * mm
MARGIN_B = 18 * mm

QUOTE_NO = "CA-QT-2026-WR-001"
QUOTE_DATE = date(2026, 8, 11)
VALID_UNTIL = QUOTE_DATE + timedelta(days=21)

# Pricing (recommended competitive open)
CORE = 139_000
OPT_BOOKING = 30_000
OPT_PAYMENT = 15_000
OPT_LANG = 20_000
OPT_ENGINE = 25_000
HOSTING = 10_000
MAINT = 5_000

INR_TO_LKR = 3.52
INR_TO_USD = 1 / 95.4


def inr(n: int) -> str:
    s = f"{n:,}"
    # Indian grouping for display when possible
    s = f"{n:n}" if False else format_inr(n)
    return s


def format_inr(n: int) -> str:
    """Format with Indian-style grouping: INR 1,39,000 (Helvetica-safe; no ₹ glyph)."""
    sign = "-" if n < 0 else ""
    n = abs(n)
    s = str(n)
    if len(s) <= 3:
        return f"{sign}INR {s}"
    last3 = s[-3:]
    rest = s[:-3]
    parts = []
    while rest:
        parts.append(rest[-2:])
        rest = rest[:-2]
    grouped = ",".join(reversed(parts)) + "," + last3
    return f"{sign}INR {grouped}"


def approx_usd(n: int) -> str:
    return f"${n * INR_TO_USD:,.0f}"


def approx_lkr(n: int) -> str:
    v = int(round(n * INR_TO_LKR))
    return f"LKR {v:,}"


class ColoredBox(Flowable):
    def __init__(self, width, height, fill, radius=4):
        super().__init__()
        self.width = width
        self.height = height
        self.fill = fill
        self.radius = radius

    def draw(self):
        self.canv.setFillColor(self.fill)
        self.canv.roundRect(0, 0, self.width, self.height, self.radius, fill=1, stroke=0)


def draw_header_footer(c: pdfcanvas.Canvas, doc):
    c.saveState()
    # Top dark bar
    c.setFillColor(HEADER_BG)
    c.rect(0, PAGE_H - 18 * mm, PAGE_W, 18 * mm, fill=1, stroke=0)
    # Accent stripe
    c.setFillColor(ACCENT)
    c.rect(0, PAGE_H - 19.2 * mm, PAGE_W, 1.2 * mm, fill=1, stroke=0)

    # Logo mark
    logo_path = str(MARK if MARK.exists() else LOGO)
    if Path(logo_path).exists():
        try:
            c.drawImage(
                logo_path,
                MARGIN_L,
                PAGE_H - 15.5 * mm,
                width=10 * mm,
                height=10 * mm,
                mask="auto",
                preserveAspectRatio=True,
            )
        except Exception:
            pass

    c.setFillColor(CREAM)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(MARGIN_L + 12 * mm, PAGE_H - 10.5 * mm, "CodeArc")
    c.setFont("Helvetica", 7.5)
    c.setFillColor(HexColor("#B8B4AA"))
    c.drawString(MARGIN_L + 12 * mm, PAGE_H - 14.5 * mm, "Websites · Apps · Business Software")

    c.setFillColor(CREAM)
    c.setFont("Helvetica", 7.5)
    right = PAGE_W - MARGIN_R
    c.drawRightString(right, PAGE_H - 9 * mm, "www.codearc.co.in")
    c.drawRightString(right, PAGE_H - 12.5 * mm, "hello@codearc.co.in  ·  +91 99837 21179")
    c.setFillColor(HexColor("#B8B4AA"))
    c.drawRightString(right, PAGE_H - 16 * mm, "Rajasthan, India  ·  Remote international projects")

    # Footer
    c.setStrokeColor(LINE)
    c.setLineWidth(0.5)
    c.line(MARGIN_L, 12 * mm, PAGE_W - MARGIN_R, 12 * mm)
    c.setFillColor(MUTED)
    c.setFont("Helvetica", 7)
    c.drawString(MARGIN_L, 7 * mm, f"Quotation {QUOTE_NO}  ·  Confidential")
    c.drawCentredString(PAGE_W / 2, 7 * mm, "CodeArc  ·  codearc.co.in")
    c.drawRightString(PAGE_W - MARGIN_R, 7 * mm, f"Page {doc.page}")
    c.restoreState()


def styles():
    ss = getSampleStyleSheet()
    styles = {
        "h1": ParagraphStyle(
            "h1",
            fontName="Helvetica-Bold",
            fontSize=16,
            textColor=INK,
            spaceAfter=2 * mm,
            leading=20,
        ),
        "h2": ParagraphStyle(
            "h2",
            fontName="Helvetica-Bold",
            fontSize=10.5,
            textColor=INK,
            spaceBefore=3 * mm,
            spaceAfter=2 * mm,
            leading=14,
        ),
        "label": ParagraphStyle(
            "label",
            fontName="Helvetica",
            fontSize=7.5,
            textColor=MUTED,
            leading=10,
        ),
        "body": ParagraphStyle(
            "body",
            fontName="Helvetica",
            fontSize=8.5,
            textColor=INK_SOFT,
            leading=12,
            alignment=TA_JUSTIFY,
        ),
        "body_sm": ParagraphStyle(
            "body_sm",
            fontName="Helvetica",
            fontSize=8,
            textColor=INK_SOFT,
            leading=11,
        ),
        "muted": ParagraphStyle(
            "muted",
            fontName="Helvetica",
            fontSize=8,
            textColor=MUTED,
            leading=11,
        ),
        "cell": ParagraphStyle(
            "cell",
            fontName="Helvetica",
            fontSize=8,
            textColor=INK_SOFT,
            leading=11,
        ),
        "cell_b": ParagraphStyle(
            "cell_b",
            fontName="Helvetica-Bold",
            fontSize=8,
            textColor=INK,
            leading=11,
        ),
        "th": ParagraphStyle(
            "th",
            fontName="Helvetica-Bold",
            fontSize=7.5,
            textColor=CREAM,
            leading=10,
        ),
        "price": ParagraphStyle(
            "price",
            fontName="Helvetica-Bold",
            fontSize=8.5,
            textColor=INK,
            leading=11,
            alignment=TA_RIGHT,
        ),
        "price_accent": ParagraphStyle(
            "price_accent",
            fontName="Helvetica-Bold",
            fontSize=11,
            textColor=ACCENT,
            leading=13,
            alignment=TA_RIGHT,
        ),
        "note": ParagraphStyle(
            "note",
            fontName="Helvetica",
            fontSize=7.5,
            textColor=MUTED,
            leading=10,
        ),
        "bullet": ParagraphStyle(
            "bullet",
            fontName="Helvetica",
            fontSize=8,
            textColor=INK_SOFT,
            leading=11,
            leftIndent=2 * mm,
        ),
        "center_muted": ParagraphStyle(
            "center_muted",
            fontName="Helvetica",
            fontSize=7.5,
            textColor=MUTED,
            alignment=TA_CENTER,
            leading=10,
        ),
        "rec": ParagraphStyle(
            "rec",
            fontName="Helvetica-Bold",
            fontSize=8,
            textColor=GREEN,
            leading=11,
        ),
        "toclient": ParagraphStyle(
            "toclient",
            fontName="Helvetica",
            fontSize=8.5,
            textColor=INK_SOFT,
            leading=12,
        ),
    }
    return styles


def info_table(s):
    left = [
        [Paragraph("PREPARED FOR", s["label"])],
        [Paragraph("<b>Dasun Marasinghe</b>", s["toclient"])],
        [Paragraph("Wild Ridge", s["toclient"])],
        [Paragraph("Sri Lanka", s["toclient"])],
        [Paragraph("+94 77 447 6311", s["toclient"])],
        [Paragraph("Domain: <b>wildridge.lk</b> (client-owned)", s["toclient"])],
    ]
    right = [
        [Paragraph("QUOTATION DETAILS", s["label"])],
        [Paragraph(f"<b>Quote No:</b>  {QUOTE_NO}", s["toclient"])],
        [Paragraph(f"<b>Date:</b>  {QUOTE_DATE.strftime('%d %B %Y')}", s["toclient"])],
        [Paragraph(f"<b>Valid until:</b>  {VALID_UNTIL.strftime('%d %B %Y')}", s["toclient"])],
        [Paragraph("<b>Currency:</b>  INR (indicative USD / LKR shown)", s["toclient"])],
        [Paragraph("<b>Prepared by:</b>  CodeArc, Rajasthan, India", s["toclient"])],
    ]
    t_left = Table(left, colWidths=[88 * mm])
    t_right = Table(right, colWidths=[78 * mm])
    t_left.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PANEL),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, 0), 6),
        ("TOPPADDING", (0, 1), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -2), 1),
        ("BOTTOMPADDING", (0, -1), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    t_right.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), PANEL),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, 0), 6),
        ("TOPPADDING", (0, 1), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -2), 1),
        ("BOTTOMPADDING", (0, -1), (-1, -1), 7),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    wrap = Table([[t_left, t_right]], colWidths=[90 * mm, 80 * mm])
    wrap.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
    ]))
    return wrap


def section_title(text, s):
    return Paragraph(text, s["h2"])


def core_scope_table(s):
    items = [
        "Complete unique UI/UX design for Wild Ridge (premium hospitality quality; structure inspired by Leopard Trails, branding unique to Wild Ridge)",
        "Home, About Us",
        "Accommodation listing + individual accommodation pages",
        "Experiences listing + individual experience pages",
        "Dining page",
        "Gallery",
        "Special Offers & Packages listing + individual pages",
        "Blog listing + individual blog pages",
        "Contact / Enquiry form + WhatsApp integration",
        "FAQ, Terms & Conditions, Privacy Policy pages",
        "CMS / admin panel for easy content updates",
        "Fully responsive design (desktop, tablet, mobile)",
        "Basic on-page SEO + search-engine-friendly structure",
        "Performance optimization",
        "SSL & security implementation",
        "DNS configuration for wildridge.lk (domain already purchased — no registration fee)",
        "Production deployment & go-live support",
        "1 admin training session (remote)",
    ]
    rows = [[
        Paragraph("#", s["th"]),
        Paragraph("Core Website Deliverables", s["th"]),
    ]]
    for i, item in enumerate(items, 1):
        rows.append([
            Paragraph(str(i), s["cell"]),
            Paragraph(item, s["cell"]),
        ])
    t = Table(rows, colWidths=[10 * mm, 168 * mm])
    style_cmds = [
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("TEXTCOLOR", (0, 0), (-1, 0), CREAM),
        ("BACKGROUND", (0, 1), (-1, -1), white),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, PANEL]),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
        ("ALIGN", (0, 0), (0, -1), "CENTER"),
    ]
    t.setStyle(TableStyle(style_cmds))
    return t


def pricing_table(s):
    rows = [[
        Paragraph("Item", s["th"]),
        Paragraph("Description", s["th"]),
        Paragraph("Amount (INR)", s["th"]),
        Paragraph("Approx. USD / LKR", s["th"]),
    ]]

    def add(name, desc, amount, bold=False):
        sty = s["cell_b"] if bold else s["cell"]
        rows.append([
            Paragraph(name, sty),
            Paragraph(desc, s["cell"]),
            Paragraph(format_inr(amount), s["price"] if not bold else s["price_accent"]),
            Paragraph(f"{approx_usd(amount)}  ·  {approx_lkr(amount)}", s["note"]),
        ])

    add(
        "A. Core Website",
        "Full Wild Ridge hospitality website as scoped above (Recommended package)",
        CORE,
        bold=True,
    )
    add(
        "B1. Online Booking",
        "Optional — custom online booking flow (availability / enquiry-to-booking)",
        OPT_BOOKING,
    )
    add(
        "B2. Payment Integration",
        "Optional — one payment gateway integration (e.g. PayHere / Stripe / bank)",
        OPT_PAYMENT,
    )
    add(
        "B3. Multi-language",
        "Optional — first additional language (UI + CMS fields; translation by client)",
        OPT_LANG,
    )
    add(
        "B4. Booking Engine Integration",
        "Optional — third-party PMS / booking engine API integration (confirm platform first)",
        OPT_ENGINE,
    )

    t = Table(rows, colWidths=[32 * mm, 78 * mm, 30 * mm, 38 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("BACKGROUND", (0, 1), (-1, 1), HexColor("#FFF5F2")),
        ("ROWBACKGROUNDS", (0, 2), (-1, -1), [white, PANEL]),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("LINEBELOW", (0, 1), (-1, 1), 1, ACCENT),
    ]))
    return t


def recurring_table(s):
    rows = [[
        Paragraph("Optional Recurring", s["th"]),
        Paragraph("Details", s["th"]),
        Paragraph("Amount", s["th"]),
    ]]
    data = [
        (
            "Managed Hosting",
            "Secure hosting suitable for hospitality website (annual)",
            f"{format_inr(HOSTING)} / year",
        ),
        (
            "Maintenance & Support",
            "Updates, backups, security patches, minor content changes (up to ~2 hrs/month). First month free after launch.",
            f"{format_inr(MAINT)} / month",
        ),
    ]
    for a, b, c in data:
        rows.append([
            Paragraph(a, s["cell_b"]),
            Paragraph(b, s["cell"]),
            Paragraph(c, s["price"]),
        ])
    t = Table(rows, colWidths=[38 * mm, 100 * mm, 40 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, PANEL]),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def packages_table(s):
    rows = [[
        Paragraph("Suggested Launch Package", s["th"]),
        Paragraph("Includes", s["th"]),
        Paragraph("Investment", s["th"]),
    ]]
    pkgs = [
        (
            "1. Launch Essential<br/><font color='#2F7A52'><b>Recommended start</b></font>",
            "Core website only — ideal first phase",
            f"<b>{format_inr(CORE)}</b><br/><font size='7' color='#5C5A55'>{approx_usd(CORE)} · {approx_lkr(CORE)}</font>",
        ),
        (
            "2. Launch + Bookings",
            "Core + Online Booking system",
            f"<b>{format_inr(CORE + OPT_BOOKING)}</b><br/><font size='7' color='#5C5A55'>{approx_usd(CORE + OPT_BOOKING)} · {approx_lkr(CORE + OPT_BOOKING)}</font>",
        ),
        (
            "3. Growth Launch",
            "Core + Online Booking + Payment + 1 extra language",
            f"<b>{format_inr(CORE + OPT_BOOKING + OPT_PAYMENT + OPT_LANG)}</b><br/><font size='7' color='#5C5A55'>{approx_usd(CORE + OPT_BOOKING + OPT_PAYMENT + OPT_LANG)} · {approx_lkr(CORE + OPT_BOOKING + OPT_PAYMENT + OPT_LANG)}</font>",
        ),
    ]
    for a, b, c in pkgs:
        rows.append([
            Paragraph(a, s["cell"]),
            Paragraph(b, s["cell"]),
            Paragraph(c, s["cell"]),
        ])
    t = Table(rows, colWidths=[48 * mm, 72 * mm, 58 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), ACCENT),
        ("BACKGROUND", (0, 1), (-1, 1), HexColor("#F0F7F3")),
        ("ROWBACKGROUNDS", (0, 2), (-1, -1), [white, PANEL]),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    return t


def client_inputs_table(s, title, rows_data, header_color=None):
    """rows_data: list of (item, details, required) tuples."""
    header_color = header_color or INK
    rows = [[
        Paragraph("#", s["th"]),
        Paragraph(title, s["th"]),
        Paragraph("What we need from you", s["th"]),
        Paragraph("Required?", s["th"]),
    ]]
    for i, (item, details, req) in enumerate(rows_data, 1):
        req_style = s["rec"] if req.lower().startswith("yes") else s["note"]
        rows.append([
            Paragraph(str(i), s["cell"]),
            Paragraph(f"<b>{item}</b>", s["cell"]),
            Paragraph(details, s["cell"]),
            Paragraph(req, req_style),
        ])
    t = Table(rows, colWidths=[8 * mm, 38 * mm, 105 * mm, 27 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), header_color),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, PANEL]),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3.5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 3.5),
        ("ALIGN", (0, 0), (0, -1), "CENTER"),
        ("ALIGN", (3, 1), (3, -1), "CENTER"),
    ]))
    return t


def build():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    s = styles()
    content_w = PAGE_W - MARGIN_L - MARGIN_R

    doc = SimpleDocTemplate(
        str(OUT_PDF),
        pagesize=A4,
        leftMargin=MARGIN_L,
        rightMargin=MARGIN_R,
        topMargin=MARGIN_T,
        bottomMargin=MARGIN_B + 4 * mm,
        title=f"CodeArc Quotation — Wild Ridge ({QUOTE_NO})",
        author="CodeArc",
        subject="Website development quotation for Wild Ridge",
    )

    story = []

    # Title block
    story.append(Paragraph("PROJECT QUOTATION", s["label"]))
    story.append(Paragraph("Website Development — Wild Ridge", s["h1"]))
    story.append(
        Paragraph(
            "Premium hospitality website with unique branding, CMS, enquiry & WhatsApp, "
            "SEO foundations, security, and deployment on <b>wildridge.lk</b>.",
            s["body"],
        )
    )
    story.append(Spacer(1, 3 * mm))
    story.append(info_table(s))
    story.append(Spacer(1, 3.5 * mm))

    # Intro
    story.append(section_title("1. Project Overview", s))
    story.append(
        Paragraph(
            "Thank you for sharing the requirements for <b>Wild Ridge</b>. CodeArc proposes a modern, "
            "conversion-focused hospitality website with a quality bar comparable to leading Sri Lankan "
            "safari/hospitality brands (structure and UX inspired by sites such as Leopard Trails), "
            "while the design and brand expression remain unique to Wild Ridge.",
            s["body"],
        )
    )
    story.append(Spacer(1, 1.5 * mm))
    story.append(
        Paragraph(
            "<b>Domain note:</b> You have already purchased <b>wildridge.lk</b>. Domain registration is "
            "<b>not charged</b>. DNS configuration, SSL certificate setup, and production deployment are "
            "included in the core development fee.",
            s["body_sm"],
        )
    )

    story.append(section_title("2. Core Scope of Work", s))
    story.append(core_scope_table(s))

    story.append(section_title("3. Investment Summary", s))
    story.append(
        Paragraph(
            "Prices below are fixed for the stated scope. Optional features are priced separately so you can choose what to include at launch.",
            s["muted"],
        )
    )
    story.append(Spacer(1, 1.5 * mm))
    story.append(pricing_table(s))
    story.append(Spacer(1, 1.5 * mm))
    story.append(
        Paragraph(
            f"<b>Core website total:</b> {format_inr(CORE)} INR  "
            f"(approx. {approx_usd(CORE)} USD  ·  {approx_lkr(CORE)})  "
            f"— exclusive of optional features B1–B4.",
            s["body_sm"],
        )
    )
    story.append(
        Paragraph(
            "Exchange rates are indicative only (approx. 1 INR = 3.52 LKR; 1 USD ≈ 95.4 INR as of Aug 2026) and may vary at the time of payment.",
            s["note"],
        )
    )

    story.append(section_title("4. Suggested Launch Packages", s))
    story.append(packages_table(s))
    story.append(Spacer(1, 1.5 * mm))
    story.append(
        Paragraph(
            "<b>Note:</b> Online Booking (custom) and Third-party Booking Engine Integration are alternative paths for phase-1. "
            "We recommend selecting one primary booking approach after confirming whether Wild Ridge already uses a PMS / booking platform.",
            s["note"],
        )
    )

    story.append(section_title("5. Hosting & Maintenance (Optional)", s))
    story.append(recurring_table(s))

    story.append(section_title("6. Timeline", s))
    story.append(
        Paragraph(
            "<b>Estimated delivery:</b> 6–8 weeks from project kickoff (after 40% advance, brand assets, and content schedule are confirmed).<br/>"
            "Typical phases: Discovery &amp; sitemap → UI/UX design &amp; approval → Development &amp; CMS → Content population → QA → Training → Go-live.",
            s["body_sm"],
        )
    )

    story.append(section_title("7. Payment Terms", s))
    pay_rows = [[
        Paragraph("Milestone", s["th"]),
        Paragraph("%", s["th"]),
        Paragraph("Amount (Core only)", s["th"]),
        Paragraph("When due", s["th"]),
    ]]
    milestones = [
        ("Advance / Kickoff", "40%", int(CORE * 0.40), "On acceptance of quotation & agreement"),
        ("Design / UI Approval", "30%", int(CORE * 0.30), "After homepage + key templates approved"),
        ("Pre Go-Live", "30%", int(CORE * 0.30), "After UAT, before final DNS / launch"),
    ]
    for name, pct, amt, when in milestones:
        pay_rows.append([
            Paragraph(name, s["cell_b"]),
            Paragraph(pct, s["cell"]),
            Paragraph(format_inr(amt), s["price"]),
            Paragraph(when, s["cell"]),
        ])
    pay_t = Table(pay_rows, colWidths=[42 * mm, 18 * mm, 38 * mm, 80 * mm])
    pay_t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), INK),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [white, PANEL]),
        ("BOX", (0, 0), (-1, -1), 0.5, LINE),
        ("INNERGRID", (0, 0), (-1, -1), 0.3, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("ALIGN", (1, 0), (1, -1), "CENTER"),
    ]))
    story.append(pay_t)
    story.append(Spacer(1, 1.5 * mm))
    story.append(
        Paragraph(
            "Optional features, if selected, follow the same milestone percentages. International payments can be arranged via bank transfer / agreed gateway. Final tax treatment (if applicable) will be confirmed on the invoice.",
            s["note"],
        )
    )

    # —— Formal client inputs annex (own page for clarity) ——
    story.append(PageBreak())
    story.append(Paragraph("ANNEX A", s["label"]))
    story.append(Paragraph("Client Inputs Required", s["h1"]))
    story.append(
        Paragraph(
            "CodeArc can deliver the full Wild Ridge scope in this quotation. To start on time and avoid delays, "
            "please share the items below. You may send content via Google Drive, email, or WhatsApp. "
            "Items marked <b>Yes</b> are required for core launch; optional-feature inputs are needed only if you select those add-ons.",
            s["body"],
        )
    )
    story.append(Spacer(1, 2 * mm))

    story.append(section_title("8. Brand, Domain & Access (Core)", s))
    story.append(client_inputs_table(s, "Item", [
        (
            "Logo & brand",
            "Logo files (PNG and/or SVG), brand colours, fonts if available, any brand guidelines.",
            "Yes",
        ),
        (
            "Domain access",
            "wildridge.lk registrar login, or ability to update DNS / nameservers when we send records.",
            "Yes",
        ),
        (
            "WhatsApp number",
            "Business WhatsApp number to show on the website contact button.",
            "Yes",
        ),
        (
            "Enquiry email",
            "Email address(es) that should receive Contact / Enquiry form submissions.",
            "Yes",
        ),
        (
            "Hosting choice",
            "Confirm CodeArc managed hosting OR provide your own hosting credentials.",
            "Yes",
        ),
        (
            "Admin users",
            "Name + email of 1–2 people who will manage the CMS after launch (for training).",
            "Yes",
        ),
        (
            "Social / map links",
            "Facebook, Instagram, TripAdvisor, Google Maps / Google Business link (if any).",
            "Preferred",
        ),
    ]))

    story.append(section_title("9. Website Content (Core)", s))
    story.append(client_inputs_table(s, "Content", [
        (
            "Home & About",
            "Short business intro, About Us story, team (optional), key highlights for homepage.",
            "Yes",
        ),
        (
            "Accommodations",
            "For each unit: name, description, amenities, capacity, public price (if any), photos.",
            "Yes",
        ),
        (
            "Experiences",
            "For each experience: name, description, duration, inclusions, photos, price notes.",
            "Yes",
        ),
        (
            "Dining",
            "Cuisine / dining story, meal overview, dietary notes, photos.",
            "Yes",
        ),
        (
            "Gallery",
            "High-resolution photos (and videos if any), ideally sorted by folder/theme.",
            "Yes",
        ),
        (
            "Offers & packages",
            "Offer title, validity dates, inclusions, price or “from” price, terms (if launching with offers).",
            "If applicable",
        ),
        (
            "Blog posts",
            "Initial articles (0–5 is fine at launch) with images and author name — or leave empty.",
            "Optional",
        ),
        (
            "FAQ",
            "Common guest questions and answers (check-in, location, wildlife, payments, etc.).",
            "Preferred",
        ),
        (
            "Terms & Privacy",
            "Legal text you provide, or written approval to publish standard template wording.",
            "Yes",
        ),
        (
            "Content volume",
            "Confirm approximate launch counts (e.g. how many rooms, experiences, offers, blogs).",
            "Yes",
        ),
        (
            "Reference notes",
            "What you like / dislike about Leopard Trails style (structure only — design will be unique to Wild Ridge).",
            "Preferred",
        ),
    ], header_color=HexColor("#1A3A2A")))

    story.append(section_title("10. Optional Features — Inputs (only if selected)", s))
    story.append(
        Paragraph(
            "Reply Yes/No for each optional. If Yes, provide the matching details so we can implement without rework.",
            s["muted"],
        )
    )
    story.append(Spacer(1, 1.5 * mm))
    story.append(client_inputs_table(s, "Optional", [
        (
            "B1. Online booking",
            "What can be booked (rooms / experiences / packages)? Instant confirm or request-only? "
            "Min nights, guest counts, rate list (Excel OK), cancellation / deposit policy.",
            "If B1 selected",
        ),
        (
            "B2. Payments",
            "Preferred gateway (e.g. PayHere / Stripe / bank), currency (LKR / USD), deposit % or full pay, "
            "merchant account + API/test keys after KYC with the provider.",
            "If B2 selected",
        ),
        (
            "B3. Multi-language",
            "Which language (Sinhala / Tamil / other)? Full translated text for all pages, or a translator. "
            "CodeArc builds the language system; you supply translations.",
            "If B3 selected",
        ),
        (
            "B4. Booking engine",
            "Exact PMS / engine name (e.g. Cloudbeds, Little Hotelier). Confirm API or embed widget access "
            "and admin credentials. Prefer one path: custom booking OR engine — not both for v1 unless agreed.",
            "If B4 selected",
        ),
    ], header_color=ACCENT))

    story.append(section_title("11. Delivery assumptions", s))
    assumptions = [
        "English is the primary language in the core package unless multi-language (B3) is purchased.",
        "Client provides final text and images; professional photography and full copywriting are not included unless quoted separately.",
        "Two (2) design revision rounds are included on agreed templates; further changes may be change requests.",
        "Launch content volume is confirmed at kickoff; large bulk migrations or hundreds of pages may be quoted separately.",
        "Timeline pauses if required content, approvals, or DNS access are delayed beyond agreed review windows.",
        "Optional booking / payment / engine work starts only after the related inputs above are confirmed.",
        "Design is unique to Wild Ridge (inspired by quality/structure of premium hospitality sites, not a pixel clone).",
    ]
    for a in assumptions:
        story.append(Paragraph(f"•  {a}", s["bullet"]))

    story.append(section_title("12. Out of Scope (unless added)", s))
    out = [
        "Professional photography / videography shoots",
        "Long-form copywriting of all pages (can be quoted separately)",
        "Ongoing digital marketing / paid ads management",
        "Native mobile apps",
        "Complex channel-manager / multi-property enterprise PMS customisation beyond agreed integration",
    ]
    for a in out:
        story.append(Paragraph(f"•  {a}", s["bullet"]))

    story.append(section_title("13. Next Steps", s))
    story.append(
        Paragraph(
            "1. Confirm preferred launch package (Essential / + Bookings / Growth) and any optionals B1–B4.<br/>"
            "2. Share brand assets, content, and Annex A inputs (or a timeline for when content will arrive).<br/>"
            "3. Confirm whether any booking/PMS platform is already in use.<br/>"
            "4. Confirm preferred languages (if multi-language is required).<br/>"
            "5. We issue a simple agreement and payment instructions for the 40% advance.<br/>"
            "6. Kickoff call → design begins.",
            s["body_sm"],
        )
    )

    story.append(Spacer(1, 4 * mm))
    story.append(HRFlowable(width="100%", thickness=0.6, color=LINE, spaceBefore=1, spaceAfter=3))
    story.append(
        Paragraph(
            "We look forward to building a distinctive digital home for <b>Wild Ridge</b>.",
            s["body"],
        )
    )
    story.append(Spacer(1, 3 * mm))

    # Signature block
    sig = Table(
        [[
            Paragraph(
                "<b>For CodeArc</b><br/><br/><br/>"
                "____________________________<br/>"
                "Authorised Signatory<br/>"
                "CodeArc · Rajasthan, India<br/>"
                "hello@codearc.co.in · +91 99837 21179<br/>"
                "www.codearc.co.in",
                s["body_sm"],
            ),
            Paragraph(
                "<b>Accepted by Client</b><br/><br/><br/>"
                "____________________________<br/>"
                "Name: Dasun Marasinghe<br/>"
                "Business: Wild Ridge<br/>"
                "Date: _______________<br/>"
                "Signature / Stamp",
                s["body_sm"],
            ),
        ]],
        colWidths=[89 * mm, 89 * mm],
    )
    sig.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("BOX", (0, 0), (0, 0), 0.5, LINE),
        ("BOX", (1, 0), (1, 0), 0.5, LINE),
        ("BACKGROUND", (0, 0), (-1, -1), PANEL),
        ("LEFTPADDING", (0, 0), (-1, -1), 8),
        ("RIGHTPADDING", (0, 0), (-1, -1), 8),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(sig)
    story.append(Spacer(1, 3 * mm))
    story.append(
        Paragraph(
            "This quotation is valid for 21 days from the date above. Prices apply to the described scope only. "
            "CodeArc reserves the right to requote if requirements change materially after acceptance.",
            s["center_muted"],
        )
    )

    doc.build(story, onFirstPage=draw_header_footer, onLaterPages=draw_header_footer)
    print(f"Wrote: {OUT_PDF}")
    return OUT_PDF


if __name__ == "__main__":
    build()
