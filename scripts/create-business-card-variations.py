from pathlib import Path
from math import cos, pi, sin

from PIL import Image
from pypdf import PdfReader, PdfWriter
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import Color, HexColor
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "output" / "pdf" / "business-card-variations"
PRINT_DIR = OUT / "print"
PREVIEW_PDF_DIR = OUT / "preview-pdf"
TEMP_DIR = ROOT / "tmp" / "pdfs" / "business-card-variations"
for directory in (OUT, PRINT_DIR, PREVIEW_PDF_DIR, TEMP_DIR):
    directory.mkdir(parents=True, exist_ok=True)

ASSETS = ROOT / "assets" / "img"
LOGO = ASSETS / "logo" / "logo.png"
BARBER_PHOTO = ASSETS / "gallery" / "real-cuts" / "real-barber-portrait.jpg"
WORK_PHOTO = ASSETS / "gallery" / "real-cuts" / "real-barber-at-work.png"
CHAIR_PHOTO = ASSETS / "bobi-real" / "barber-chair.png"
INTERIOR_PHOTO = ASSETS / "bobi-real" / "shop-interior.png"

pdfmetrics.registerFont(TTFont("BobiRegular", "C:/Windows/Fonts/arial.ttf"))
pdfmetrics.registerFont(TTFont("BobiBold", "C:/Windows/Fonts/arialbd.ttf"))
pdfmetrics.registerFont(TTFont("BobiCondensed", "C:/Windows/Fonts/bahnschrift.ttf"))
pdfmetrics.registerFont(TTFont("BobiSerif", "C:/Windows/Fonts/georgia.ttf"))
pdfmetrics.registerFont(TTFont("BobiSerifBold", "C:/Windows/Fonts/georgiab.ttf"))

TRIM_W = 85 * mm
TRIM_H = 55 * mm
BLEED = 3 * mm
PAGE_W = TRIM_W + 2 * BLEED
PAGE_H = TRIM_H + 2 * BLEED
X0 = BLEED
Y0 = BLEED

BLACK = HexColor("#07090C")
INK = HexColor("#11151B")
CHARCOAL = HexColor("#1D2434")
CREAM = HexColor("#F2EEE6")
PAPER = HexColor("#E8E2DB")
WHITE = HexColor("#FFFFFF")
GOLD = HexColor("#D19F68")
GOLD_DARK = HexColor("#8F6434")
RED = HexColor("#B9212D")
BLUE = HexColor("#194F8C")
NAVY = HexColor("#102B4E")
CYAN = HexColor("#25F4EE")
PINK = HexColor("#FE2C55")
SILVER = HexColor("#C5CBD3")
MID_SILVER = HexColor("#858C96")

PHONE = "0878 842 147"
ADDRESS_1 = "ул. „Александър Стамболийски“ 23А"
ADDRESS_2 = "5500 Ловеч"
MAP_URL = "https://maps.google.com/?q=Aleksandar+Stamboliyski+23A,+5500+Lovech,+Bulgaria"
SOCIALS = "FACEBOOK  /  INSTAGRAM  /  TIKTOK"


def rect(c, color, x=0, y=0, width=PAGE_W, height=PAGE_H):
    c.setFillColor(color)
    c.rect(x, y, width, height, stroke=0, fill=1)


def spaced(c, text, x, y, font="BobiBold", size=7, color=INK, tracking=0.55, centered=False):
    widths = [pdfmetrics.stringWidth(ch, font, size) for ch in text]
    total = sum(widths) + max(0, len(text) - 1) * tracking
    cursor = x - total / 2 if centered else x
    c.setFillColor(color)
    c.setFont(font, size)
    for ch, width in zip(text, widths):
        c.drawString(cursor, y, ch)
        cursor += width + tracking


def cover_image(c, path, x, y, width, height, focus_x=0.5, focus_y=0.5):
    with Image.open(path) as image:
        image_w, image_h = image.size
    scale = max(width / image_w, height / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    draw_x = x - (draw_w - width) * focus_x
    draw_y = y - (draw_h - height) * focus_y
    # The image intentionally extends beyond the target rectangle for a true
    # proportional cover crop. Opaque layout panels mask any overflow.
    c.drawImage(str(path), draw_x, draw_y, draw_w, draw_h, preserveAspectRatio=True, mask="auto")


def logo_fit(c, x, y, width, height):
    with Image.open(LOGO) as image:
        image_w, image_h = image.size
    scale = min(width / image_w, height / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    c.drawImage(str(LOGO), x + (width - draw_w) / 2, y + (height - draw_h) / 2, draw_w, draw_h, mask="auto")


def barber_band(c, x, y, width, height, horizontal=False):
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0, fill=0)
    rect(c, CREAM, x, y, width, height)
    stripe = 8 * mm
    if horizontal:
        for index, sx in enumerate(range(int(x - height), int(x + width + height), int(stripe))):
            c.setFillColor(RED if index % 2 == 0 else BLUE)
            p = c.beginPath()
            p.moveTo(sx, y - height)
            p.lineTo(sx + stripe * .68, y - height)
            p.lineTo(sx + height + stripe * .68, y + height * 2)
            p.lineTo(sx + height, y + height * 2)
            p.close()
            c.drawPath(p, stroke=0, fill=1)
    else:
        for index, sy in enumerate(range(int(y - width), int(y + height + width), int(stripe))):
            c.setFillColor(RED if index % 2 == 0 else BLUE)
            p = c.beginPath()
            p.moveTo(x - width, sy)
            p.lineTo(x + width * 2, sy + stripe)
            p.lineTo(x + width * 2, sy + stripe * 1.65)
            p.lineTo(x - width, sy + stripe * .65)
            p.close()
            c.drawPath(p, stroke=0, fill=1)
    c.restoreState()


def qr_box(c, x, y, size, fg=BLACK, bg=CREAM, radius=2 * mm):
    c.setFillColor(bg)
    c.roundRect(x - 1.4 * mm, y - 1.4 * mm, size + 2.8 * mm, size + 2.8 * mm, radius, stroke=0, fill=1)
    widget = qr.QrCodeWidget(MAP_URL)
    widget.barFillColor = fg
    bounds = widget.getBounds()
    qr_w = bounds[2] - bounds[0]
    qr_h = bounds[3] - bounds[1]
    drawing = Drawing(size, size, transform=[size / qr_w, 0, 0, size / qr_h, 0, 0])
    drawing.add(widget)
    renderPDF.draw(drawing, c, x, y)


def draw_scissors(c, cx, cy, scale, color, width=1.2):
    c.saveState()
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.circle(cx - 6 * scale, cy - 2.8 * scale, 4.2 * scale, stroke=1, fill=0)
    c.circle(cx + 6 * scale, cy - 2.8 * scale, 4.2 * scale, stroke=1, fill=0)
    c.circle(cx, cy + 2 * scale, 1.3 * scale, stroke=1, fill=0)
    c.line(cx - 2 * scale, cy + 1 * scale, cx - 19 * scale, cy + 20 * scale)
    c.line(cx + 2 * scale, cy + 1 * scale, cx + 19 * scale, cy + 20 * scale)
    c.line(cx - 18 * scale, cy + 20 * scale, cx - 4 * scale, cy + 5 * scale)
    c.line(cx + 18 * scale, cy + 20 * scale, cx + 4 * scale, cy + 5 * scale)
    c.restoreState()


def tiny_contact(c, color=CREAM, accent=GOLD, x=X0 + 6 * mm, y=Y0 + 6 * mm):
    c.setFillColor(accent)
    c.setFont("BobiBold", 6.2)
    c.drawString(x, y + 11.2 * mm, "ЗАПАЗИ ЧАС")
    c.setFillColor(color)
    c.setFont("BobiBold", 12.5)
    c.drawString(x, y + 5.7 * mm, PHONE)
    c.setFont("BobiRegular", 6.7)
    c.drawString(x, y + 1.5 * mm, ADDRESS_1)
    c.drawString(x, y - 2.0 * mm, ADDRESS_2)


def heritage_front(c):
    rect(c, BLACK)
    c.saveState()
    c.setFillAlpha(.16)
    for i in range(10):
        c.setFillColor(CHARCOAL)
        p = c.beginPath()
        x = (-18 + i * 13) * mm
        p.moveTo(x, 0); p.lineTo(x + 20 * mm, 0); p.lineTo(x + 51 * mm, PAGE_H); p.lineTo(x + 31 * mm, PAGE_H); p.close()
        c.drawPath(p, stroke=0, fill=1)
    c.restoreState()
    barber_band(c, 0, 0, BLEED + 2.8 * mm, PAGE_H)
    c.setStrokeColor(GOLD_DARK); c.setLineWidth(.4)
    c.rect(X0 + 1.4 * mm, Y0 + 1.4 * mm, TRIM_W - 2.8 * mm, TRIM_H - 2.8 * mm, stroke=1, fill=0)
    logo_fit(c, X0 + 17 * mm, Y0 + 8.8 * mm, 51 * mm, 42 * mm)
    spaced(c, "ФРИЗЬОР  •  БРЪСНАРНИЦА  •  ЛОВЕЧ", X0 + TRIM_W / 2, Y0 + 4.9 * mm, size=6.3, color=GOLD, centered=True)


def heritage_back(c):
    rect(c, CHARCOAL)
    barber_band(c, PAGE_W - BLEED - 2.8 * mm, 0, BLEED + 2.8 * mm, PAGE_H)
    c.setStrokeColor(GOLD_DARK); c.setLineWidth(.4)
    c.rect(X0 + 1.4 * mm, Y0 + 1.4 * mm, TRIM_W - 2.8 * mm, TRIM_H - 2.8 * mm, stroke=1, fill=0)
    c.setFillColor(GOLD); c.rect(X0 + 6 * mm, Y0 + 41.5 * mm, 1.2 * mm, 8 * mm, stroke=0, fill=1)
    c.setFillColor(WHITE); c.setFont("BobiBold", 16); c.drawString(X0 + 9.5 * mm, Y0 + 44.5 * mm, "БОБИ СТИЛ")
    spaced(c, "ЗАПАЗИ СВОЯ ЧАС", X0 + 9.7 * mm, Y0 + 40.3 * mm, size=6.7, color=GOLD)
    tiny_contact(c, x=X0 + 6 * mm, y=Y0 + 11 * mm)
    qr_box(c, X0 + 60 * mm, Y0 + 17.6 * mm, 18.8 * mm)
    spaced(c, "СКАНИРАЙ ЗА АДРЕС", X0 + 69.4 * mm, Y0 + 12.1 * mm, size=5.0, color=GOLD, centered=True)


def pole_front(c):
    rect(c, CREAM)
    barber_band(c, 0, 0, 27 * mm, PAGE_H)
    rect(c, INK, X0 + 21 * mm, 0, PAGE_W - X0 - 21 * mm, PAGE_H)
    c.setFillColor(WHITE); c.setFont("BobiCondensed", 24)
    c.drawString(X0 + 28 * mm, Y0 + 32 * mm, "БОБИ")
    c.drawString(X0 + 28 * mm, Y0 + 20.5 * mm, "СТИЛ")
    c.setFillColor(RED); c.rect(X0 + 28 * mm, Y0 + 16.8 * mm, 17 * mm, 1.5 * mm, stroke=0, fill=1)
    spaced(c, "BARBER  •  LOVECH", X0 + 28 * mm, Y0 + 11.5 * mm, size=6.5, color=SILVER)


def pole_back(c):
    rect(c, CREAM)
    barber_band(c, 0, PAGE_H - BLEED - 5.2 * mm, PAGE_W, BLEED + 5.2 * mm, horizontal=True)
    c.setFillColor(INK); c.setFont("BobiBold", 7); c.drawString(X0 + 6 * mm, Y0 + 42 * mm, "ЗАПАЗИ ЧАС")
    c.setFont("BobiCondensed", 18.5); c.drawString(X0 + 6 * mm, Y0 + 33 * mm, PHONE)
    c.setStrokeColor(RED); c.setLineWidth(2); c.line(X0 + 6 * mm, Y0 + 29 * mm, X0 + 47 * mm, Y0 + 29 * mm)
    c.setFillColor(INK); c.setFont("BobiRegular", 7.2)
    c.drawString(X0 + 6 * mm, Y0 + 23.2 * mm, ADDRESS_1); c.drawString(X0 + 6 * mm, Y0 + 18.5 * mm, ADDRESS_2)
    c.setFont("BobiBold", 5.8); c.drawString(X0 + 6 * mm, Y0 + 9 * mm, SOCIALS)
    rect(c, INK, X0 + 59 * mm, Y0 + 12.8 * mm, 21.7 * mm, 21.7 * mm)
    qr_box(c, X0 + 61.8 * mm, Y0 + 15.6 * mm, 16.1 * mm, fg=INK, bg=WHITE, radius=0)


def editorial_front(c):
    cover_image(c, BARBER_PHOTO, 0, 0, PAGE_W, PAGE_H, .57, .43)
    rect(c, BLACK, 0, 0, 28 * mm, PAGE_H)
    rect(c, BLACK, 28 * mm, 0, PAGE_W - 28 * mm, Y0 + 12.5 * mm)
    c.setFillColor(GOLD); c.rect(X0 + 4.5 * mm, Y0 + 6 * mm, 1.2 * mm, 42 * mm, stroke=0, fill=1)
    c.saveState(); c.translate(X0 + 12.5 * mm, Y0 + 7 * mm); c.rotate(90)
    spaced(c, "БОБИ СТИЛ", 0, 0, font="BobiCondensed", size=17, color=WHITE, tracking=.8)
    c.restoreState()
    c.setFillColor(WHITE); c.setFont("BobiBold", 7); c.drawRightString(X0 + 79 * mm, Y0 + 9 * mm, "ПРЕЦИЗНОСТ ВЪВ ВСЕКИ ДЕТАЙЛ")
    c.setFillColor(GOLD); c.setFont("BobiBold", 7); c.drawRightString(X0 + 79 * mm, Y0 + 5.3 * mm, "ЛОВЕЧ")


def editorial_back(c):
    cover_image(c, WORK_PHOTO, 0, 0, 29 * mm, PAGE_H, .64, .5)
    rect(c, CREAM, 29 * mm, 0, PAGE_W - 29 * mm, PAGE_H)
    c.setFillColor(INK); c.setFont("BobiCondensed", 16); c.drawString(X0 + 29 * mm, Y0 + 43 * mm, "ЗАПАЗИ ЧАС")
    c.setFillColor(GOLD_DARK); c.setFont("BobiBold", 13); c.drawString(X0 + 29 * mm, Y0 + 35.7 * mm, PHONE)
    c.setStrokeColor(GOLD); c.setLineWidth(1); c.line(X0 + 29 * mm, Y0 + 31.8 * mm, X0 + 78 * mm, Y0 + 31.8 * mm)
    c.setFillColor(INK); c.setFont("BobiRegular", 6.8)
    c.drawString(X0 + 29 * mm, Y0 + 27 * mm, ADDRESS_1); c.drawString(X0 + 29 * mm, Y0 + 23.2 * mm, ADDRESS_2)
    qr_box(c, X0 + 62.3 * mm, Y0 + 5.6 * mm, 15.3 * mm, fg=INK, bg=WHITE)
    c.setFont("BobiBold", 5.3); c.setFillColor(INK); c.drawString(X0 + 29 * mm, Y0 + 8.3 * mm, "FACEBOOK / INSTAGRAM / TIKTOK")


def neon_front(c):
    rect(c, BLACK)
    c.saveState(); c.setFillAlpha(.18)
    for radius, color, cx in [(32, CYAN, X0 + 20 * mm), (37, PINK, X0 + 66 * mm)]:
        c.setFillColor(color); c.circle(cx, Y0 + 28 * mm, radius * mm / 4, stroke=0, fill=1)
    c.restoreState()
    c.setStrokeColor(CYAN); c.setLineWidth(1.5); c.line(0, Y0 + 12 * mm, PAGE_W, Y0 + 35 * mm)
    c.setStrokeColor(PINK); c.line(0, Y0 + 15 * mm, PAGE_W, Y0 + 38 * mm)
    logo_fit(c, X0 + 26 * mm, Y0 + 10 * mm, 34 * mm, 34 * mm)
    spaced(c, "BOBI STYLE / AFTER DARK", X0 + TRIM_W / 2, Y0 + 5.3 * mm, size=6.2, color=WHITE, centered=True)


def neon_back(c):
    rect(c, BLACK)
    c.saveState(); c.setFillAlpha(.15); rect(c, CYAN, 0, 0, 38 * mm, PAGE_H); rect(c, PINK, 53 * mm, 0, 38 * mm, PAGE_H); c.restoreState()
    c.setFillColor(WHITE); c.setFont("BobiCondensed", 13.5); c.drawString(X0 + 6 * mm, Y0 + 42.5 * mm, "ЗАПАЗИ ЧАС")
    c.setFont("BobiCondensed", 22); c.drawString(X0 + 6 * mm, Y0 + 31.5 * mm, PHONE)
    c.setStrokeColor(CYAN); c.setLineWidth(1.4); c.line(X0 + 6 * mm, Y0 + 27.5 * mm, X0 + 51 * mm, Y0 + 27.5 * mm)
    c.setStrokeColor(PINK); c.line(X0 + 7 * mm, Y0 + 26.4 * mm, X0 + 52 * mm, Y0 + 26.4 * mm)
    c.setFillColor(WHITE); c.setFont("BobiRegular", 6.7); c.drawString(X0 + 6 * mm, Y0 + 21.5 * mm, ADDRESS_1); c.drawString(X0 + 6 * mm, Y0 + 17.7 * mm, ADDRESS_2)
    c.setFillColor(WHITE); c.setFont("BobiBold", 5.5); c.drawString(X0 + 6 * mm, Y0 + 8 * mm, SOCIALS)
    qr_box(c, X0 + 62 * mm, Y0 + 16.8 * mm, 17.5 * mm, fg=BLACK, bg=WHITE)


def blueprint_grid(c, color=GOLD):
    c.saveState(); c.setStrokeColor(color); c.setLineWidth(.22); c.setStrokeAlpha(.3)
    for x in range(0, 92, 5): c.line(x * mm, 0, x * mm, PAGE_H)
    for y in range(0, 62, 5): c.line(0, y * mm, PAGE_W, y * mm)
    c.restoreState()


def blueprint_front(c):
    rect(c, NAVY); blueprint_grid(c, PAPER)
    draw_scissors(c, X0 + 61 * mm, Y0 + 20 * mm, 1.15 * mm, GOLD, 1.1)
    c.setFillColor(GOLD); c.setFont("BobiSerifBold", 30); c.drawString(X0 + 6 * mm, Y0 + 24 * mm, "BS")
    c.setFillColor(PAPER); c.setFont("BobiBold", 9); c.drawString(X0 + 6 * mm, Y0 + 16.5 * mm, "BOBI STYLE")
    spaced(c, "CRAFT / PRECISION / LOVECH", X0 + 6 * mm, Y0 + 11.5 * mm, size=5.7, color=GOLD)
    c.setStrokeColor(GOLD); c.setLineWidth(.7); c.rect(X0 + 3 * mm, Y0 + 3 * mm, TRIM_W - 6 * mm, TRIM_H - 6 * mm, stroke=1, fill=0)


def blueprint_back(c):
    rect(c, NAVY); blueprint_grid(c, PAPER)
    c.setFillColor(GOLD); c.setFont("BobiBold", 7); c.drawString(X0 + 6 * mm, Y0 + 44 * mm, "PROJECT: НОВАТА ТИ ВИЗИЯ")
    c.setFillColor(PAPER); c.setFont("BobiCondensed", 18.5); c.drawString(X0 + 6 * mm, Y0 + 34.5 * mm, PHONE)
    c.setStrokeColor(GOLD); c.setLineWidth(1); c.line(X0 + 6 * mm, Y0 + 31 * mm, X0 + 51 * mm, Y0 + 31 * mm)
    c.setFont("BobiRegular", 6.6); c.drawString(X0 + 6 * mm, Y0 + 25 * mm, ADDRESS_1); c.drawString(X0 + 6 * mm, Y0 + 21.2 * mm, ADDRESS_2)
    c.setFillColor(GOLD); c.setFont("BobiBold", 5.5); c.drawString(X0 + 6 * mm, Y0 + 10 * mm, SOCIALS)
    qr_box(c, X0 + 61 * mm, Y0 + 17 * mm, 18 * mm, fg=NAVY, bg=PAPER, radius=0)


def ticket_edge(c, color):
    c.setFillColor(color)
    for y in range(-2, 66, 7):
        c.circle(0, y * mm, 2.2 * mm, stroke=0, fill=1)
        c.circle(PAGE_W, y * mm, 2.2 * mm, stroke=0, fill=1)


def ticket_front(c):
    rect(c, PAPER); ticket_edge(c, BLACK)
    c.setStrokeColor(GOLD_DARK); c.setLineWidth(.8); c.setDash(2, 2); c.line(X0 + 17 * mm, 0, X0 + 17 * mm, PAGE_H); c.setDash()
    c.saveState(); c.translate(X0 + 9 * mm, Y0 + 8 * mm); c.rotate(90); spaced(c, "ADMIT ONE / LOVECH", 0, 0, size=7, color=GOLD_DARK); c.restoreState()
    c.setFillColor(INK); c.setFont("BobiCondensed", 22); c.drawString(X0 + 24 * mm, Y0 + 34 * mm, "БОБИ СТИЛ")
    spaced(c, "APPOINTMENT TICKET", X0 + 24 * mm, Y0 + 28.4 * mm, size=6.5, color=RED)
    c.setStrokeColor(INK); c.setLineWidth(.6); c.line(X0 + 24 * mm, Y0 + 22 * mm, X0 + 76 * mm, Y0 + 22 * mm)
    c.setFillColor(INK); c.setFont("BobiBold", 6.3); c.drawString(X0 + 24 * mm, Y0 + 16.5 * mm, "КОСА  [  ]     БРАДА  [  ]     СТАЙЛИНГ  [  ]")
    c.setFont("BobiRegular", 5.6); c.drawString(X0 + 24 * mm, Y0 + 9.5 * mm, "SERIES BS-5500   /   VALID FOR A FRESH LOOK")


def ticket_back(c):
    rect(c, INK); ticket_edge(c, PAPER)
    c.setStrokeColor(GOLD); c.setLineWidth(.8); c.setDash(2, 2); c.line(X0 + 55 * mm, 0, X0 + 55 * mm, PAGE_H); c.setDash()
    c.setFillColor(GOLD); c.setFont("BobiBold", 6.8); c.drawString(X0 + 6 * mm, Y0 + 43.5 * mm, "ЗАПАЗИ СВОЯ ЧАС")
    c.setFillColor(WHITE); c.setFont("BobiCondensed", 20); c.drawString(X0 + 6 * mm, Y0 + 33.5 * mm, PHONE)
    c.setFont("BobiRegular", 6.5); c.drawString(X0 + 6 * mm, Y0 + 26 * mm, ADDRESS_1); c.drawString(X0 + 6 * mm, Y0 + 22 * mm, ADDRESS_2)
    c.setFillColor(GOLD); c.setFont("BobiBold", 5.5); c.drawString(X0 + 6 * mm, Y0 + 10.5 * mm, SOCIALS)
    qr_box(c, X0 + 62 * mm, Y0 + 17.5 * mm, 17 * mm, fg=INK, bg=PAPER, radius=0)
    c.setFillColor(GOLD); c.setFont("BobiBold", 4.9); c.drawCentredString(X0 + 70.5 * mm, Y0 + 12.8 * mm, "MAP / LOCATION")


def modern_front(c):
    rect(c, INK)
    c.setFillColor(GOLD); p = c.beginPath(); p.moveTo(0, 0); p.lineTo(48 * mm, 0); p.lineTo(30 * mm, PAGE_H); p.lineTo(0, PAGE_H); p.close(); c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(CREAM); p = c.beginPath(); p.moveTo(22 * mm, 0); p.lineTo(43 * mm, 0); p.lineTo(61 * mm, PAGE_H); p.lineTo(40 * mm, PAGE_H); p.close(); c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(INK); c.setFont("BobiCondensed", 24); c.drawString(X0 + 7 * mm, Y0 + 34 * mm, "БОБИ")
    c.setFillColor(WHITE); c.drawString(X0 + 52 * mm, Y0 + 20 * mm, "СТИЛ")
    c.setFillColor(GOLD); c.setFont("BobiBold", 7); c.drawRightString(X0 + 79 * mm, Y0 + 10 * mm, "ЛОВЕЧ / 5500")


def modern_back(c):
    rect(c, CREAM)
    c.setFillColor(INK); p = c.beginPath(); p.moveTo(0, 0); p.lineTo(58 * mm, 0); p.lineTo(42 * mm, PAGE_H); p.lineTo(0, PAGE_H); p.close(); c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(WHITE); c.setFont("BobiBold", 6.8); c.drawString(X0 + 6 * mm, Y0 + 43 * mm, "ЗАПАЗИ ЧАС")
    c.setFont("BobiCondensed", 17.8); c.drawString(X0 + 6 * mm, Y0 + 33.4 * mm, PHONE)
    c.setFont("BobiRegular", 6.3); c.drawString(X0 + 6 * mm, Y0 + 25.4 * mm, ADDRESS_1); c.drawString(X0 + 6 * mm, Y0 + 21.5 * mm, ADDRESS_2)
    c.setFillColor(GOLD); c.setFont("BobiBold", 5.3); c.drawString(X0 + 6 * mm, Y0 + 10 * mm, SOCIALS)
    qr_box(c, X0 + 62.2 * mm, Y0 + 17.2 * mm, 17.5 * mm, fg=INK, bg=WHITE, radius=0)
    barber_band(c, PAGE_W - BLEED - 3 * mm, 0, BLEED + 3 * mm, PAGE_H)


def chrome_front(c):
    rect(c, SILVER)
    for i, color in enumerate([HexColor("#F5F6F8"), MID_SILVER, HexColor("#E0E4E9"), HexColor("#6F7680")]):
        c.setFillColor(color)
        p = c.beginPath(); x = (-20 + i * 30) * mm; p.moveTo(x, 0); p.lineTo(x + 23 * mm, 0); p.lineTo(x + 55 * mm, PAGE_H); p.lineTo(x + 32 * mm, PAGE_H); p.close(); c.drawPath(p, stroke=0, fill=1)
    c.saveState(); c.setFillAlpha(.92); rect(c, BLACK, X0 + 13 * mm, Y0 + 6 * mm, 59 * mm, 43 * mm); c.restoreState()
    logo_fit(c, X0 + 28 * mm, Y0 + 10 * mm, 29 * mm, 29 * mm)
    spaced(c, "PRECISION / CRAFT / STYLE", X0 + TRIM_W / 2, Y0 + 8 * mm, size=6.1, color=SILVER, centered=True)
    c.setStrokeColor(RED); c.setLineWidth(1.2); c.line(X0 + 18 * mm, Y0 + 44.5 * mm, X0 + 39 * mm, Y0 + 44.5 * mm)
    c.setStrokeColor(BLUE); c.line(X0 + 46 * mm, Y0 + 44.5 * mm, X0 + 67 * mm, Y0 + 44.5 * mm)


def chrome_back(c):
    rect(c, HexColor("#262B32"))
    c.setStrokeColor(SILVER); c.setLineWidth(.5); c.rect(X0 + 2 * mm, Y0 + 2 * mm, TRIM_W - 4 * mm, TRIM_H - 4 * mm, stroke=1, fill=0)
    c.setFillColor(SILVER); c.setFont("BobiCondensed", 14); c.drawString(X0 + 6 * mm, Y0 + 43 * mm, "BOBI STYLE / LOVECH")
    c.setFillColor(WHITE); c.setFont("BobiCondensed", 20); c.drawString(X0 + 6 * mm, Y0 + 32 * mm, PHONE)
    c.setFillColor(SILVER); c.setFont("BobiRegular", 6.5); c.drawString(X0 + 6 * mm, Y0 + 25 * mm, ADDRESS_1); c.drawString(X0 + 6 * mm, Y0 + 21 * mm, ADDRESS_2)
    c.setStrokeColor(RED); c.setLineWidth(1); c.line(X0 + 6 * mm, Y0 + 17 * mm, X0 + 28 * mm, Y0 + 17 * mm)
    c.setStrokeColor(BLUE); c.line(X0 + 29 * mm, Y0 + 17 * mm, X0 + 51 * mm, Y0 + 17 * mm)
    c.setFillColor(SILVER); c.setFont("BobiBold", 5.2); c.drawString(X0 + 6 * mm, Y0 + 9 * mm, SOCIALS)
    qr_box(c, X0 + 62 * mm, Y0 + 17 * mm, 17.8 * mm, fg=BLACK, bg=WHITE, radius=.5 * mm)


def street_grid(c, color, alpha=.24):
    lines = [
        [(0, 12), (25, 18), (43, 13), (67, 30), (91, 24)],
        [(4, 58), (18, 40), (37, 45), (58, 25), (88, 42)],
        [(16, 0), (27, 20), (22, 38), (42, 61)],
        [(55, 0), (49, 16), (68, 39), (62, 61)],
        [(78, 0), (71, 18), (84, 38), (89, 61)],
    ]
    c.saveState(); c.setStrokeAlpha(alpha); c.setStrokeColor(color); c.setLineWidth(1)
    for points in lines:
        p = c.beginPath(); p.moveTo(points[0][0] * mm, points[0][1] * mm)
        for x, y in points[1:]: p.lineTo(x * mm, y * mm)
        c.drawPath(p, stroke=1, fill=0)
    c.restoreState()


def map_pin(c, x, y, radius, color):
    c.setFillColor(color); c.circle(x, y + radius, radius, stroke=0, fill=1)
    p = c.beginPath(); p.moveTo(x - radius * .7, y + radius * .5); p.lineTo(x, y - radius * 1.15); p.lineTo(x + radius * .7, y + radius * .5); p.close(); c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(CREAM); c.circle(x, y + radius, radius * .38, stroke=0, fill=1)


def lovech_front(c):
    rect(c, HexColor("#18130F")); street_grid(c, GOLD, .32)
    map_pin(c, X0 + 65 * mm, Y0 + 26 * mm, 6 * mm, GOLD)
    c.setFillColor(CREAM); c.setFont("BobiSerifBold", 20); c.drawString(X0 + 6 * mm, Y0 + 34 * mm, "БОБИ СТИЛ")
    c.setFillColor(GOLD); c.setFont("BobiSerifBold", 13); c.drawString(X0 + 6 * mm, Y0 + 25 * mm, "ЛОВЕЧ")
    c.setFillColor(CREAM); c.setFont("BobiRegular", 6.2); c.drawString(X0 + 6 * mm, Y0 + 17.5 * mm, "МЯСТО ЗА ПРЕЦИЗНА МЪЖКА ВИЗИЯ")
    c.setStrokeColor(GOLD_DARK); c.line(X0 + 6 * mm, Y0 + 13 * mm, X0 + 46 * mm, Y0 + 13 * mm)


def lovech_back(c):
    rect(c, PAPER); street_grid(c, GOLD_DARK, .2)
    c.setFillColor(INK); c.setFont("BobiSerifBold", 12.5); c.drawString(X0 + 6 * mm, Y0 + 43 * mm, "НАМЕРИ НИ В ЛОВЕЧ")
    c.setFillColor(GOLD_DARK); c.setFont("BobiBold", 15.5); c.drawString(X0 + 6 * mm, Y0 + 33.5 * mm, PHONE)
    c.setFillColor(INK); c.setFont("BobiRegular", 6.7); c.drawString(X0 + 6 * mm, Y0 + 26.3 * mm, ADDRESS_1); c.drawString(X0 + 6 * mm, Y0 + 22.2 * mm, ADDRESS_2)
    c.setFont("BobiBold", 5.4); c.drawString(X0 + 6 * mm, Y0 + 10 * mm, SOCIALS)
    qr_box(c, X0 + 62 * mm, Y0 + 17 * mm, 18 * mm, fg=INK, bg=WHITE)
    map_pin(c, X0 + 76 * mm, Y0 + 42 * mm, 2.5 * mm, GOLD_DARK)


def luxury_front(c):
    rect(c, CREAM)
    c.setStrokeColor(GOLD); c.setLineWidth(.55); c.circle(X0 + TRIM_W / 2, Y0 + 29 * mm, 14 * mm, stroke=1, fill=0)
    c.setFillColor(INK); c.setFont("BobiSerif", 27); c.drawCentredString(X0 + TRIM_W / 2, Y0 + 23.8 * mm, "BS")
    spaced(c, "BOBI STYLE", X0 + TRIM_W / 2, Y0 + 11.5 * mm, font="BobiSerifBold", size=8, color=INK, tracking=1.2, centered=True)
    spaced(c, "BARBER / LOVECH", X0 + TRIM_W / 2, Y0 + 7.2 * mm, size=5.4, color=GOLD_DARK, centered=True)
    c.setFillColor(RED); c.rect(X0 + 39 * mm, Y0 + 3.5 * mm, 2.2 * mm, .8 * mm, stroke=0, fill=1)
    c.setFillColor(CREAM); c.rect(X0 + 41.2 * mm, Y0 + 3.5 * mm, 2.2 * mm, .8 * mm, stroke=0, fill=1)
    c.setFillColor(BLUE); c.rect(X0 + 43.4 * mm, Y0 + 3.5 * mm, 2.2 * mm, .8 * mm, stroke=0, fill=1)


def luxury_back(c):
    rect(c, CREAM)
    c.setFillColor(INK); c.setFont("BobiSerifBold", 12); c.drawCentredString(X0 + TRIM_W / 2, Y0 + 43.5 * mm, "ЗАПАЗИ СВОЯ ЧАС")
    c.setStrokeColor(GOLD); c.setLineWidth(.7); c.line(X0 + 23 * mm, Y0 + 39.5 * mm, X0 + 62 * mm, Y0 + 39.5 * mm)
    c.setFont("BobiSerif", 18); c.drawCentredString(X0 + TRIM_W / 2, Y0 + 31 * mm, PHONE)
    c.setFont("BobiRegular", 6.4); c.drawCentredString(X0 + TRIM_W / 2, Y0 + 25 * mm, ADDRESS_1); c.drawCentredString(X0 + TRIM_W / 2, Y0 + 21 * mm, ADDRESS_2)
    c.setFillColor(GOLD_DARK); c.setFont("BobiBold", 5.3); c.drawCentredString(X0 + 34 * mm, Y0 + 10 * mm, SOCIALS)
    qr_box(c, X0 + 66.5 * mm, Y0 + 5.4 * mm, 12.5 * mm, fg=INK, bg=WHITE, radius=0)


CONCEPTS = [
    (1, "heritage-gold", "Heritage Gold", "Емблематичен премиум стил", heritage_front, heritage_back),
    (2, "classic-pole", "Classic Pole", "Класическа бръснарска идентичност", pole_front, pole_back),
    (3, "editorial-barber", "Editorial Barber", "Фотографски и модерен", editorial_front, editorial_back),
    (4, "midnight-neon", "Midnight Neon", "Динамичен градски характер", neon_front, neon_back),
    (5, "craftsman-blueprint", "Craftsman Blueprint", "Техника, умение и прецизност", blueprint_front, blueprint_back),
    (6, "appointment-ticket", "Appointment Ticket", "Запомняща се карта-билет", ticket_front, ticket_back),
    (7, "modern-cut", "Modern Cut", "Смела геометрична композиция", modern_front, modern_back),
    (8, "chrome-edge", "Chrome Edge", "Метален и технологичен стил", chrome_front, chrome_back),
    (9, "lovech-local", "Lovech Local", "Локална идентичност и адрес", lovech_front, lovech_back),
    (10, "quiet-luxury", "Quiet Luxury", "Минимален и елегантен", luxury_front, luxury_back),
]


def write_raw(path, front, back):
    c = canvas.Canvas(str(path), pagesize=(PAGE_W, PAGE_H), pageCompression=1)
    front(c); c.showPage(); back(c); c.showPage(); c.save()


def write_print_and_preview(raw_path, print_path, preview_path, title):
    reader = PdfReader(str(raw_path))
    print_writer = PdfWriter()
    preview_writer = PdfWriter()
    for source_page in reader.pages:
        source_page.mediabox.lower_left = (0, 0)
        source_page.mediabox.upper_right = (PAGE_W, PAGE_H)
        source_page.bleedbox.lower_left = (0, 0)
        source_page.bleedbox.upper_right = (PAGE_W, PAGE_H)
        source_page.trimbox.lower_left = (BLEED, BLEED)
        source_page.trimbox.upper_right = (PAGE_W - BLEED, PAGE_H - BLEED)
        print_writer.add_page(source_page)
    print_writer.add_metadata({"/Title": title, "/Author": "Bobi Style", "/Subject": "85 x 55 mm business card with 3 mm bleed"})
    with print_path.open("wb") as handle: print_writer.write(handle)

    fresh_reader = PdfReader(str(print_path))
    for page in fresh_reader.pages:
        page.mediabox.lower_left = (BLEED, BLEED)
        page.mediabox.upper_right = (PAGE_W - BLEED, PAGE_H - BLEED)
        page.cropbox.lower_left = (BLEED, BLEED)
        page.cropbox.upper_right = (PAGE_W - BLEED, PAGE_H - BLEED)
        preview_writer.add_page(page)
    preview_writer.add_metadata({"/Title": title + " Preview", "/Author": "Bobi Style"})
    with preview_path.open("wb") as handle: preview_writer.write(handle)


def write_collection():
    writer = PdfWriter()
    for number, slug, name, _, _, _ in CONCEPTS:
        preview = PdfReader(str(PREVIEW_PDF_DIR / f"{number:02d}-{slug}.pdf"))
        for page in preview.pages: writer.add_page(page)
    writer.add_metadata({"/Title": "Bobi Style - 10 Business Card Variations", "/Author": "Bobi Style"})
    with (OUT / "bobi-style-10-business-card-variations.pdf").open("wb") as handle: writer.write(handle)


def write_overview():
    width, height = landscape(A4)
    c = canvas.Canvas(str(OUT / "bobi-style-10-business-card-overview.pdf"), pagesize=(width, height), pageCompression=1)
    scale = .55
    card_w = PAGE_W * scale
    card_h = PAGE_H * scale
    for page_index in range(2):
        rect(c, HexColor("#ECEEF1"), 0, 0, width, height)
        c.setFillColor(INK); c.setFont("BobiBold", 18); c.drawString(12 * mm, height - 14 * mm, "BOBI STYLE / 10 BUSINESS CARD CONCEPTS")
        c.setFillColor(GOLD_DARK); c.setFont("BobiBold", 8); c.drawRightString(width - 12 * mm, height - 13 * mm, f"COLLECTION {page_index + 1} / 2")
        for row, concept in enumerate(CONCEPTS[page_index * 5:(page_index + 1) * 5]):
            number, _, name, description, front, back = concept
            center_y = height - (34 + row * 36) * mm
            c.setFillColor(INK); c.setFont("BobiBold", 10); c.drawString(12 * mm, center_y + 4 * mm, f"{number:02d}  {name}")
            c.setFillColor(HexColor("#626A74")); c.setFont("BobiRegular", 6.5); c.drawString(12 * mm, center_y - 1 * mm, description)
            for x, label, draw in [(92 * mm, "FRONT", front), (154 * mm, "BACK", back)]:
                c.setFillColor(HexColor("#626A74")); c.setFont("BobiBold", 5.5); c.drawString(x, center_y + card_h / 2 + 2 * mm, label)
                c.saveState(); c.translate(x, center_y - card_h / 2); c.scale(scale, scale); draw(c); c.restoreState()
                c.setStrokeColor(HexColor("#A9AFB7")); c.setLineWidth(.35); c.rect(x, center_y - card_h / 2, card_w, card_h, stroke=1, fill=0)
        c.showPage()
    c.save()


def main():
    for number, slug, name, _, front, back in CONCEPTS:
        raw = TEMP_DIR / f"{number:02d}-{slug}-raw.pdf"
        print_path = PRINT_DIR / f"{number:02d}-{slug}.pdf"
        preview_path = PREVIEW_PDF_DIR / f"{number:02d}-{slug}.pdf"
        write_raw(raw, front, back)
        write_print_and_preview(raw, print_path, preview_path, f"Bobi Style - {number:02d} {name}")
    write_collection()
    write_overview()
    print(OUT)


if __name__ == "__main__":
    main()
