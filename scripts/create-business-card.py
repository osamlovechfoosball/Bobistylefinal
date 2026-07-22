from pathlib import Path

from PIL import Image
from pypdf import PdfReader, PdfWriter
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode import qr
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor
from reportlab.lib.pagesizes import landscape
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
TEMP_DIR = ROOT / "tmp" / "pdfs"
LOGO_PATH = ROOT / "assets" / "img" / "logo" / "logo.png"

OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
TEMP_DIR.mkdir(parents=True, exist_ok=True)

PRINT_PDF = OUTPUT_DIR / "bobi-style-business-card-print.pdf"
PREVIEW_PDF = OUTPUT_DIR / "bobi-style-business-card-preview.pdf"
TEMP_PDF = TEMP_DIR / "bobi-style-business-card-raw.pdf"
PRINT_READY_DIR = OUTPUT_DIR / "print-ready"
FRONT_PRINT_PDF = PRINT_READY_DIR / "Bobi-Style-Business-Card-90x50mm-FRONT.pdf"
BACK_PRINT_PDF = PRINT_READY_DIR / "Bobi-Style-Business-Card-90x50mm-BACK.pdf"
BOTH_SIDES_PRINT_PDF = PRINT_READY_DIR / "Bobi-Style-Business-Card-90x50mm-BOTH-SIDES.pdf"
PRINT_INSTRUCTIONS = PRINT_READY_DIR / "PRINT-INSTRUCTIONS.txt"

FONT_REGULAR = Path("C:/Windows/Fonts/arial.ttf")
FONT_BOLD = Path("C:/Windows/Fonts/arialbd.ttf")
FONT_DISPLAY = Path("C:/Windows/Fonts/bahnschrift.ttf")
FONT_HEADLINE = Path("C:/Windows/Fonts/impact.ttf")
FONT_ICONS = ROOT / "assets" / "fonts" / "fa-solid-900.ttf"
pdfmetrics.registerFont(TTFont("BobiRegular", str(FONT_REGULAR)))
pdfmetrics.registerFont(TTFont("BobiBold", str(FONT_BOLD)))
pdfmetrics.registerFont(TTFont("BobiDisplay", str(FONT_DISPLAY)))
pdfmetrics.registerFont(TTFont("BobiHeadline", str(FONT_HEADLINE)))
pdfmetrics.registerFont(TTFont("BobiIcons", str(FONT_ICONS)))

# Classic Bulgarian business-card format: 90 x 50 mm, plus 2 mm bleed.
TRIM_W = 90 * mm
TRIM_H = 50 * mm
BLEED = 2 * mm
PAGE_W = TRIM_W + (2 * BLEED)
PAGE_H = TRIM_H + (2 * BLEED)

BLACK = HexColor("#07090C")
CHARCOAL = HexColor("#12161D")
CHARCOAL_2 = HexColor("#1B2029")
CREAM = HexColor("#F2EEE6")
WHITE = HexColor("#FFFFFF")
GOLD = HexColor("#D5A15F")
GOLD_DARK = HexColor("#8F6434")
RED = HexColor("#B9212D")
NAVY = HexColor("#194F8C")

PHONE_DISPLAY = "0878 842 147"
WEBSITE_DISPLAY = "www.bobi.style"
WEBSITE_URL = "https://www.bobi.style"


def draw_spaced_text(c, text, x, y, font_name, font_size, color, tracking=0.7, centered=False):
    widths = [pdfmetrics.stringWidth(char, font_name, font_size) for char in text]
    total = sum(widths) + max(0, len(text) - 1) * tracking
    cursor = x - total / 2 if centered else x
    c.setFont(font_name, font_size)
    c.setFillColor(color)
    for char, width in zip(text, widths):
        c.drawString(cursor, y, char)
        cursor += width + tracking


def draw_barber_band(c, x, y, width, height):
    c.saveState()
    clip = c.beginPath()
    clip.rect(x, y, width, height)
    c.clipPath(clip, stroke=0, fill=0)
    c.setFillColor(CREAM)
    c.rect(x, y, width, height, stroke=0, fill=1)
    stripe_h = 9 * mm
    for index, stripe_y in enumerate(range(int(y - height), int(y + height * 2), int(stripe_h))):
        color = RED if index % 2 == 0 else NAVY
        c.setFillColor(color)
        path = c.beginPath()
        path.moveTo(x - width, stripe_y)
        path.lineTo(x + width * 2, stripe_y + stripe_h)
        path.lineTo(x + width * 2, stripe_y + stripe_h * 1.65)
        path.lineTo(x - width, stripe_y + stripe_h * 0.65)
        path.close()
        c.drawPath(path, stroke=0, fill=1)
    c.restoreState()


def draw_background(c, side):
    c.setFillColor(BLACK)
    c.rect(0, 0, PAGE_W, PAGE_H, stroke=0, fill=1)

    c.saveState()
    c.setFillAlpha(0.16)
    c.setFillColor(CHARCOAL_2)
    for index in range(10):
        x = (-18 + index * 13) * mm
        path = c.beginPath()
        path.moveTo(x, 0)
        path.lineTo(x + 21 * mm, 0)
        path.lineTo(x + 52 * mm, PAGE_H)
        path.lineTo(x + 31 * mm, PAGE_H)
        path.close()
        c.drawPath(path, stroke=0, fill=1)
    c.restoreState()

    # Extend through the 3 mm bleed and 2.8 mm into the finished card.
    band_w = BLEED + (2.8 * mm)
    if side == "front":
        draw_barber_band(c, 0, 0, band_w, PAGE_H)
    else:
        draw_barber_band(c, PAGE_W - band_w, 0, band_w, PAGE_H)

    c.setStrokeColor(GOLD_DARK)
    c.setLineWidth(0.35)
    c.rect(BLEED + 1.4 * mm, BLEED + 1.4 * mm, TRIM_W - 2.8 * mm, TRIM_H - 2.8 * mm, stroke=1, fill=0)

    c.setStrokeColor(GOLD)
    c.setLineWidth(1.1)
    if side == "front":
        c.line(BLEED + 6 * mm, BLEED + 2.8 * mm, BLEED + 26 * mm, BLEED + 2.8 * mm)
    else:
        c.line(BLEED + TRIM_W - 26 * mm, BLEED + TRIM_H - 2.8 * mm, BLEED + TRIM_W - 6 * mm, BLEED + TRIM_H - 2.8 * mm)


def draw_logo(c):
    with Image.open(LOGO_PATH) as logo:
        image_w, image_h = logo.size
    max_w = 52 * mm
    max_h = 35.5 * mm
    scale = min(max_w / image_w, max_h / image_h)
    draw_w = image_w * scale
    draw_h = image_h * scale
    x = BLEED + (TRIM_W - draw_w) / 2
    y = BLEED + 9.2 * mm
    c.drawImage(str(LOGO_PATH), x, y, draw_w, draw_h, preserveAspectRatio=True, mask="auto")


def draw_phone_icon(c, cx, cy):
    c.setFillColor(GOLD)
    c.circle(cx, cy, 2.7 * mm, stroke=0, fill=1)
    c.setFillColor(WHITE)
    c.setFont("BobiIcons", 9.2)
    c.drawCentredString(cx, cy - 1.25 * mm, "\uf095")


def draw_front(c):
    draw_background(c, "front")
    left = BLEED + 6.5 * mm

    c.setFillColor(GOLD)
    c.rect(left, BLEED + 38.9 * mm, 1.2 * mm, 7.7 * mm, stroke=0, fill=1)
    draw_spaced_text(c, "BOBI STYLE", left + 3.3 * mm, BLEED + 40.8 * mm, "BobiHeadline", 15.2, WHITE, tracking=0.75)
    draw_spaced_text(c, "ФРИЗЬОР - БРЪСНАР", left + 3.4 * mm, BLEED + 37.4 * mm, "BobiBold", 5.6, GOLD, tracking=0.45)

    c.setFillColor(WHITE)
    c.setFont("BobiDisplay", 12.0)
    c.drawString(left, BLEED + 29.2 * mm, WEBSITE_DISPLAY)

    c.setStrokeColor(GOLD_DARK)
    c.setLineWidth(0.6)
    c.line(left, BLEED + 24.0 * mm, left + 51 * mm, BLEED + 24.0 * mm)

    draw_phone_icon(c, left + 2.8 * mm, BLEED + 17.3 * mm)
    c.setFillColor(WHITE)
    c.setFont("BobiDisplay", 10.8)
    c.drawString(left + 7.2 * mm, BLEED + 15.3 * mm, PHONE_DISPLAY)

    c.setFillColor(CREAM)
    c.setFont("BobiRegular", 6.2)
    c.drawString(left, BLEED + 9.8 * mm, "ул. „Александър Стамболийски“ 23А")
    c.drawString(left, BLEED + 6.2 * mm, "5500 Ловеч")

    qr_size = 21.0 * mm
    qr_x = BLEED + 64.0 * mm
    qr_y = BLEED + 14.2 * mm
    draw_qr(c, qr_x, qr_y, qr_size)
    draw_spaced_text(c, "Сканирай ме", qr_x + qr_size / 2, BLEED + 9.9 * mm, "BobiBold", 6.0, GOLD, tracking=0.32, centered=True)


def draw_qr(c, x, y, size):
    c.setFillColor(WHITE)
    c.rect(x, y, size, size, stroke=0, fill=1)

    widget = qr.QrCodeWidget(WEBSITE_URL)
    widget.barFillColor = BLACK
    widget.barBorder = 2
    bounds = widget.getBounds()
    qr_w = bounds[2] - bounds[0]
    qr_h = bounds[3] - bounds[1]
    drawing = Drawing(size, size, transform=[size / qr_w, 0, 0, size / qr_h, 0, 0])
    drawing.add(widget)
    renderPDF.draw(drawing, c, x, y)

def draw_back(c):
    draw_background(c, "back")
    c.setStrokeColor(GOLD_DARK)
    c.setLineWidth(0.4)
    c.rect(BLEED + 1.4 * mm, BLEED + 1.4 * mm, TRIM_W - 2.8 * mm, TRIM_H - 2.8 * mm, stroke=1, fill=0)
    draw_logo(c)
    c.setFillColor(GOLD)
    c.setFont("BobiBold", 7.1)
    c.drawCentredString(BLEED + TRIM_W / 2, BLEED + 5.0 * mm, "Фризьор - Бръснар")


def write_raw_pdf():
    c = canvas.Canvas(str(TEMP_PDF), pagesize=landscape((PAGE_H, PAGE_W)), pageCompression=1)
    c.setTitle("Bobi Style - Business Card")
    c.setAuthor("Bobi Style")
    c.setSubject("90 x 50 mm two-sided print-ready business card with 2 mm bleed")
    draw_front(c)
    c.showPage()
    draw_back(c)
    c.showPage()
    c.save()


def add_print_boxes():
    reader = PdfReader(str(TEMP_PDF))
    writer = PdfWriter()
    for page in reader.pages:
        page.mediabox.lower_left = (0, 0)
        page.mediabox.upper_right = (PAGE_W, PAGE_H)
        page.bleedbox.lower_left = (0, 0)
        page.bleedbox.upper_right = (PAGE_W, PAGE_H)
        page.trimbox.lower_left = (BLEED, BLEED)
        page.trimbox.upper_right = (PAGE_W - BLEED, PAGE_H - BLEED)
        writer.add_page(page)
    writer.add_metadata({
        "/Title": "Bobi Style - Business Card",
        "/Author": "Bobi Style",
        "/Subject": "90 x 50 mm two-sided business card with 2 mm bleed",
    })
    with PRINT_PDF.open("wb") as handle:
        writer.write(handle)


def write_trimmed_preview():
    reader = PdfReader(str(PRINT_PDF))
    writer = PdfWriter()
    for page in reader.pages:
        page.mediabox.lower_left = (BLEED, BLEED)
        page.mediabox.upper_right = (PAGE_W - BLEED, PAGE_H - BLEED)
        page.cropbox.lower_left = (BLEED, BLEED)
        page.cropbox.upper_right = (PAGE_W - BLEED, PAGE_H - BLEED)
        writer.add_page(page)
    writer.add_metadata({
        "/Title": "Bobi Style - Business Card Preview",
        "/Author": "Bobi Style",
        "/Subject": "Trimmed 90 x 50 mm preview",
    })
    with PREVIEW_PDF.open("wb") as handle:
        writer.write(handle)


def write_print_ready_package():
    PRINT_READY_DIR.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(PRINT_PDF))

    for page_index, output_path in ((0, FRONT_PRINT_PDF), (1, BACK_PRINT_PDF)):
        writer = PdfWriter()
        writer.add_page(reader.pages[page_index])
        writer.add_metadata({
            "/Title": output_path.stem,
            "/Author": "Bobi Style",
            "/Subject": "90 x 50 mm trim; 2 mm bleed on every side; artwork size 94 x 54 mm",
        })
        with output_path.open("wb") as handle:
            writer.write(handle)

    writer = PdfWriter()
    for page in reader.pages:
        writer.add_page(page)
    writer.add_metadata({
        "/Title": "Bobi Style Business Card - Front and Back",
        "/Author": "Bobi Style",
        "/Subject": "90 x 50 mm trim; 2 mm bleed on every side; artwork size 94 x 54 mm",
    })
    with BOTH_SIDES_PRINT_PDF.open("wb") as handle:
        writer.write(handle)

    PRINT_INSTRUCTIONS.write_text(
        "BOBI STYLE - УКАЗАНИЯ ЗА ПЕЧАТ\n"
        "================================\n\n"
        "Краен размер след рязане: 90 x 50 mm\n"
        "Bleed: 2 mm от всяка страна\n"
        "Пълен размер на PDF файла: 94 x 54 mm\n"
        "Печат: двустранен (лице + гръб)\n"
        "Мащаб: 100% / Actual size (без Fit to page)\n"
        "Обръщане при двустранен печат: по дългата страна\n"
        "Адрес на QR кода: https://www.bobi.style\n\n"
        "Препоръчителен картон: 350 g/m², матов.\n"
        "За рязане печатницата да използва TrimBox 90 x 50 mm.\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    write_raw_pdf()
    add_print_boxes()
    write_trimmed_preview()
    write_print_ready_package()
    print(PRINT_PDF)
    print(PREVIEW_PDF)
    print(FRONT_PRINT_PDF)
    print(BACK_PRINT_PDF)
    print(BOTH_SIDES_PRINT_PDF)
    print(PRINT_INSTRUCTIONS)
