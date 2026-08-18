# 🌐 Sa'dullayev Azizbek - Web Portfolio va GitHub Pages Deployment Qo'llanmasi

Ushbu jildda (`D:\antigravity\portfolio`) yaratilgan web-saytni **GitHub Pages** orqali internetga bepul va ommaviy (**public**) joylashtirish bo'yicha bosqichma-bosqich yo'riqnoma.

---

## 📁 Jilddagi Fayllar:
- `index.html` — Veb-saytning asosiy sahifasi.
- `style.css` — Zamonaviy Glassmorphism dizayn va responsive stillar.
- `script.js` — Dark/Light mode, loyihalarni filtrlash va silliq scroll mantiqlari.
- `portfolio.md` — Portfolioning Markdown shakli (README uchun).

---

## 🚀 GitHub Pages'ga Joylashtirish Bosqichlari (1 daqiqa):

1. **GitHub'da yangi repozitoriy oching**:
   - [GitHub.com](https://github.com) ga kiring va **New Repository** tugmasini bosing.
   - Repozitoriy nomini **`portfolio`** yoki **`azizbekw.github.io`** deb qo'ying.
   - Repozitoriy holatini **Public** qilib belgilang va **Create repository** tugmasini bosing.

2. **Kodni GitHub'ga yuklang**:
   Terminall (PowerShell yoki Git Bash) orqali `D:\antigravity\portfolio` papkasida quyidagi buyruqlarni kiriting:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/azizbekw/portfolio.git
   git push -u origin main
   ```

3. **GitHub Pages'ni yoqing**:
   - GitHub repozitoriyangizdagi **Settings** bo'limiga o'ting.
   - Chap menyudan **Pages** bo'limini tanlang.
   - **Build and deployment** qismida **Source** ni `Deploy from a branch` qiling.
   - **Branch** qismida `main` (yoki `master`) va `/ (root)` papkasini tanlab, **Save** tugmasini bosing.

4. **Saytingiz tayyor! 🎉**:
   Bir necha soniyadan so'ng saytingiz quyidagi ommaviy manzilda faol bo'ladi:
   `https://azizbekw.github.io/portfolio/`
