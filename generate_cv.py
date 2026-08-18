import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Top Accent Line
        self.setFillColor(colors.HexColor('#6366f1'))
        self.rect(0, A4[1] - 8, A4[0], 8, stroke=0, fill=1)
        
        # Bottom Footer
        self.setFont("Helvetica", 9)
        self.setFillColor(colors.HexColor('#64748b'))
        footer_text = f"Sa'dullayev Azizbek — Rezyume / CV | Sahifa {self._pageNumber} / {page_count}"
        self.drawCentredString(A4[0] / 2, 20, footer_text)
        self.restoreState()

def create_resume():
    pdf_path = "Azizbek_Sadullayev_CV.pdf"
    doc = SimpleDocTemplate(
        pdf_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=28,
        bottomMargin=36
    )

    styles = getSampleStyleSheet()
    
    # Custom Palette
    PRIMARY = colors.HexColor('#1e293b')    # Slate Navy
    ACCENT = colors.HexColor('#4f46e5')     # Indigo / Violet
    DARK_TEXT = colors.HexColor('#0f172a')  # Almost Black
    MUTED = colors.HexColor('#475569')      # Slate Gray
    LIGHT_BG = colors.HexColor('#f8fafc')   # Slate Light
    BORDER_COL = colors.HexColor('#e2e8f0')

    # Custom Paragraph Styles
    style_name = ParagraphStyle(
        'HeaderName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=PRIMARY
    )

    style_title = ParagraphStyle(
        'HeaderTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=ACCENT
    )

    style_contact = ParagraphStyle(
        'HeaderContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=MUTED
    )

    style_sec_heading = ParagraphStyle(
        'SecHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=PRIMARY
    )

    style_body = ParagraphStyle(
        'BodyTextCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=14,
        textColor=DARK_TEXT
    )

    style_bullet = ParagraphStyle(
        'BulletCustom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=DARK_TEXT
    )

    story = []

    # --- HEADER SECTION ---
    name_p = Paragraph("SA'DULLAYEV AZIZBEK", style_name)
    title_p = Paragraph("SOFTWARE & WEB DEVELOPER", style_title)
    
    contact_info = (
        "<b>Tel:</b> +998 95 817 0023 &nbsp;|&nbsp; "
        "<b>Telegram:</b> @azizbeky &nbsp;|&nbsp; "
        "<b>Email:</b> azizbeksadullayev0023@gmail.com<br/>"
        "<b>Portfolio:</b> azizbekw.github.io/portfolio &nbsp;|&nbsp; "
        "<b>GitHub:</b> github.com/azizbekw &nbsp;|&nbsp; "
        "<b>Instagram:</b> @azizbe.ky"
    )
    contact_p = Paragraph(contact_info, style_contact)

    header_table = Table(
        [[name_p, ''], [title_p, ''], [Spacer(1, 4), ''], [contact_p, '']],
        colWidths=[520]
    )
    header_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 10))
    story.append(HRFlowable(width="100%", thickness=1.5, color=ACCENT, spaceBefore=0, spaceAfter=12))

    # --- SUMMARY SECTION ---
    summary_title = Paragraph("📌 PROFESSONAL REZYUME / SUMMARY", style_sec_heading)
    summary_text = (
        "Dasturlash sohasida doimiy izlanishdagi va innovatsion dasturiy mahsulotlar yaratishga intiluvchi dasturchi. "
        "<b>Java</b>, <b>Python (aiogram 3 Telegram Bot)</b>, <b>PHP (Web Backend / SQLite / MySQL)</b> hamda "
        "<b>Android Studio</b> platformalarida yuqori sifatli, xavfsiz, optimal va moslashuvchan dasturiy yechimlar yaratish bo'yicha amaliy tajribaga ega. "
        "Har bir loyihaga mas'uliyat va individual yondashuv bilan yondashadi."
    )
    story.append(summary_title)
    story.append(Spacer(1, 4))
    story.append(Paragraph(summary_text, style_body))
    story.append(Spacer(1, 12))

    # --- SKILLS & TECHNOLOGIES ---
    skills_title = Paragraph("🛠 TEXNOLOGIK KO'NIKMALAR & SKILLS", style_sec_heading)
    story.append(skills_title)
    story.append(Spacer(1, 6))

    skills_data = [
        [
            Paragraph("<b>Backend & Web:</b>", style_body),
            Paragraph("PHP (OOP, Session Auth, API), Python 3 (aiogram 3 Bot Architecture, Automation, Scripting)", style_body)
        ],
        [
            Paragraph("<b>Mobile & Core Java:</b>", style_body),
            Paragraph("Java (Core, OOP), Android Studio (Mobile Apps Dev, XML Layouts, Emulator & Device Testing)", style_body)
        ],
        [
            Paragraph("<b>Frontend & UI/UX:</b>", style_body),
            Paragraph("HTML5, CSS3 (Flexbox, Grid, Glassmorphism, Dark/Light theme), JavaScript (ES6+)", style_body)
        ],
        [
            Paragraph("<b>Database & Tools:</b>", style_body),
            Paragraph("SQLite, MySQL, Git, GitHub, REST APIs, JSON data structures", style_body)
        ],
        [
            Paragraph("<b>AI & Automation:</b>", style_body),
            Paragraph("Google Gemini AI API Integration, AI Chatbot Widgets, Web Scrapers & Automation", style_body)
        ]
    ]

    skills_table = Table(skills_data, colWidths=[140, 380])
    skills_table.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COL),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COL),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(skills_table)
    story.append(Spacer(1, 14))

    # --- FEATURED PROJECTS ---
    proj_title = Paragraph("💼 AMALIY LOYIHALAR VA ISHLAR", style_sec_heading)
    story.append(proj_title)
    story.append(Spacer(1, 6))

    projects = [
        {
            "name": "1. Kitoblar & Kun Savoli Telegram Boti (Python / aiogram 3 / SQLite / Gemini AI)",
            "desc": "Elektron hamda offline kitoblar o'qish, kunlik viktorinalar (Kun Savoli), taymer va avtomatik yulduzlar mukofotlash tizimiga ega kompleks Telegram bot.",
            "points": [
                "<b>Do'kon (Shop & Stock)</b>: Yulduzlar evaziga sovg'alar almashtirish, qoldiq soni nazorati va Admin bildirishnomalari.",
                "<b>Admin Panel</b>: Sovg'alar qo'shish/tahrirlash/o'chirish, kitoblar pagination (10 tadan), broadcast xabarlar.",
                "<b>Gemini AI Widget</b>: Sun'iy intellekt maslahatchisi va real-vaqt rejimida savollarga javob berish integratsiyasi."
            ]
        },
        {
            "name": "2. Task & User Management System (PHP / SQLite)",
            "desc": "PHP va SQLite ma'lumotlar bazasida yaratilgan to'liq vazifalar va foydalanuvchilarni boshqarish tizimi.",
            "points": [
                "Ro'yxatdan o'tish (Register), Xavfsiz avtorizatsiya (Login / Session Logout).",
                "Vazifalarni yaratish, tahrirlash, o'chirish va holatlarini bir bosishda yangilash.",
                "Moslashuvchan va responsive zamonaviy web interfeys."
            ]
        },
        {
            "name": "3. Personal Interactive Web Portfolio (HTML5 / CSS3 / JavaScript)",
            "desc": "Shaxsiy interaktiv portfolio va rezyume sahifasi.",
            "points": [
                "Glassmorphism va Neumorphism uslubidagi zamonaviy dizayn, Dark / Light rejim.",
                "Google Gemini AI neyron tarmog'i bilan ishlaydigan 24/7 onlayn chat-bot vidjeti.",
                "GitHub Pages orqali ommaviy domeni va avtomatlashtirilgan CI/CD deploy."
            ]
        }
    ]

    for p in projects:
        p_name = Paragraph(f"<b>{p['name']}</b>", style_body)
        p_desc = Paragraph(f"<i>{p['desc']}</i>", style_body)
        story.append(p_name)
        story.append(Spacer(1, 2))
        story.append(p_desc)
        story.append(Spacer(1, 4))

        for pt in p['points']:
            bullet_p = Paragraph(f"• {pt}", style_bullet)
            story.append(bullet_p)
            story.append(Spacer(1, 2))

        story.append(Spacer(1, 6))

    # --- LANGUAGES & PERSONAL VALUES ---
    story.append(Spacer(1, 4))
    lang_title = Paragraph("🌐 TILLAR VA SHAXSIY SIFATLAR", style_sec_heading)
    story.append(lang_title)
    story.append(Spacer(1, 6))

    lang_data = [
        [
            Paragraph("<b>Tillar:</b> O'zbek tili (Ona tili), Rus tili (Texnik daraja), Ingliz tili (Texnik hujjatlar va koding)", style_body)
        ],
        [
            Paragraph("<b>Shaxsiy sifatlar:</b> Mas'uliyatlilik, Intizom, Yangi texnologiyalarni tez o'zlashtirish, Jamoada va mustaqil samarali ishlash", style_body)
        ]
    ]
    lang_table = Table(lang_data, colWidths=[520])
    lang_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), LIGHT_BG),
        ('BOX', (0,0), (-1,-1), 0.5, BORDER_COL),
        ('INNERGRID', (0,0), (-1,-1), 0.5, BORDER_COL),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(lang_table)

    # Build PDF
    doc.build(story, canvasmaker=NumberedCanvas)
    print("PDF Resume created successfully:", pdf_path)

if __name__ == "__main__":
    create_resume()
