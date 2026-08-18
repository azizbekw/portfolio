/* =========================================================
   Sa'dullayev Azizbek - Web Portfolio JavaScript Logic
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 2. Dark / Light Theme Switcher
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    const savedTheme = localStorage.getItem('portfolioTheme');
    if (savedTheme === 'light') {
        body.classList.add('light-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        const isLight = body.classList.contains('light-theme');

        if (isLight) {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('portfolioTheme', 'light');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('portfolioTheme', 'dark');
        }
    });

    // 3. Dynamic Projects Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategories = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategories.includes(filterValue)) {
                    card.classList.remove('hide');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 4. Modal Window Data & Logic
    const projectDetails = {
        'php-task': {
            title: "Task & User Management System (PHP / SQLite)",
            category: "PHP & Web Backend Application",
            description: "Ushbu loyiha PHP va SQLite ma'lumotlar bazasida yaratilgan to'liq vazifalar va foydalanuvchilarni boshqarish tizimidir. Har bir foydalanuvchi tizimdan ro'yxatdan o'tishi, xavfsiz avtorizatsiya (Login/Logout) qilishi hamda o'z vazifalarini boshqarishi mumkin.",
            features: [
                "Foydalanuvchilar Avtorizatsiya tizimi (Register / Login / Session Logout)",
                "SQLite ma'lumotlar bazasi bilan tezkor va engil ishlash",
                "Vazifalarni yaratish, tahrirlash (Edit), o'chirish (Delete)",
                "Vazifa holatlarini (Bajarildi / Bajarilmadi) bir bosishda yangilash",
                "Foydalanuvchiga mos zamonaviy va responsive CSS interfeys"
            ],
            githubUrl: "https://github.com/azizbekw/php-task-manager",
            tgUrl: "https://t.me/azizbeky"
        },
        'web-portfolio': {
            title: "Personal Interactive Web Portfolio",
            category: "HTML5 / CSS3 / JavaScript",
            description: "Ushbu zamonaviy interaktiv rezyume va veb-portfolio sahifasi. Glassmorphism va Neumorphism uslubidagi dizaynga ega bo'lib, barcha mobil va kompyuter qurilmalariga 100% moslashadi.",
            features: [
                "Dark Mode (Tungi rejim) va Light Mode (Kungi rejim) almashtirish",
                "Dasturlash tillari va sohalar bo'yicha loyihalarni jonli filtrlash",
                "Loyihalar tafsilotlarini ko'rsatuvchi interaktiv Modal oynasi",
                "GitHub Pages orqali ommaviy (public) domen va bepul hosting integratsiyasi"
            ],
            githubUrl: "https://github.com/azizbekw/portfolio",
            tgUrl: "https://t.me/azizbeky"
        }
    };

    const modalOverlay = document.getElementById('projectModalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');

    // Open Modal when clicking project card
    document.querySelectorAll('.clickable-card').forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            const data = projectDetails[projectId];

            if (data) {
                let featuresHtml = data.features.map(f => `<li><i class="fa-solid fa-circle-check"></i> ${f}</li>`).join('');

                modalBody.innerHTML = `
                    <span class="modal-badge">${data.category}</span>
                    <h2 class="modal-title">${data.title}</h2>
                    <p class="modal-desc">${data.description}</p>
                    
                    <div class="modal-features">
                        <h4><i class="fa-solid fa-list-check"></i> Asosiy Funksionallik va Imkoniyatlar:</h4>
                        <ul>${featuresHtml}</ul>
                    </div>

                    <div class="modal-actions">
                        <a href="${data.githubUrl}" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> GitHub Repozitoriyani Ochish</a>
                        <a href="${data.tgUrl}" target="_blank" class="btn btn-telegram"><i class="fa-brands fa-telegram"></i> Telegramda Muloqot</a>
                    </div>
                `;

                modalOverlay.classList.add('active');
            }
        });
    });

    // Close Modal
    if (modalClose && modalOverlay) {
        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // 5. Smooth Scroll Fix
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Keyframe animation
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);
