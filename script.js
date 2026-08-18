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
        'book-bot': {
            title: "Kitoblar & Kun Savoli Telegram Boti (aiogram 3 / SQLite)",
            category: "Python & Telegram Bot Architecture",
            description: "Ushbu Telegram bot elektron hamda offline kitoblar o'qish, kunlik bilimni sinovchi viktorinalar o'tkazish, foydalanuvchilarni yulduzlar bilan rag'batlantirish hamda yulduzlar evaziga sovg'alar beruvchi Do'kon (Shop & Stock) tizimiga ega kompleks loyihadir.",
            features: [
                "Inline interfeysli zamonaviy va silliq xabarlar navigatsiyasi (edit_text)",
                "Elektron va Offline kitoblar katalogi hamda nom va janr bo'yicha qidiruv",
                "Kunlik viktorinalar (Kun savoli), taymer va avtomatik yulduzlar mukofotlash",
                "Eng faol bilimdonlar reytingi (Top 5 Leaderboard)",
                "Yulduzlar evaziga sovg'alar almashtiriladigan Do'kon (Shop & Stock Count)",
                "Adminlar uchun to'liq boshqaruv paneli (Sovg'a qo'shish/tahrirlash/o'chirish va kun savoli boshqaruvi)"
            ],
            primaryBtnText: "Telegram Botni Ochish",
            primaryBtnIcon: "fa-brands fa-telegram",
            primaryBtnUrl: "https://t.me/beruniykitobbot",
            primaryBtnClass: "btn-telegram",
            secondaryBtnText: "Telegramda Muloqot",
            secondaryBtnIcon: "fa-solid fa-comments",
            secondaryBtnUrl: "https://t.me/azizbeky",
            secondaryBtnClass: "btn-outline"
        },
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
            primaryBtnText: "GitHub Repozitoriyani Ochish",
            primaryBtnIcon: "fa-brands fa-github",
            primaryBtnUrl: "https://github.com/azizbekw/php-task-manager",
            primaryBtnClass: "btn-primary",
            secondaryBtnText: "Telegramda Muloqot",
            secondaryBtnIcon: "fa-brands fa-telegram",
            secondaryBtnUrl: "https://t.me/azizbeky",
            secondaryBtnClass: "btn-telegram"
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
            primaryBtnText: "GitHub Repozitoriyani Ochish",
            primaryBtnIcon: "fa-brands fa-github",
            primaryBtnUrl: "https://github.com/azizbekw/portfolio",
            primaryBtnClass: "btn-primary",
            secondaryBtnText: "Telegramda Muloqot",
            secondaryBtnIcon: "fa-brands fa-telegram",
            secondaryBtnUrl: "https://t.me/azizbeky",
            secondaryBtnClass: "btn-telegram"
        }
    };

    const modalOverlay = document.getElementById('projectModalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const toastContainer = document.getElementById('toastContainer');
    const toastText = document.getElementById('toastText');
    let toastTimeout;

    // Toast Notification helper function
    function showToast(message) {
        if (toastContainer && toastText) {
            toastText.textContent = message;
            toastContainer.classList.add('show');

            clearTimeout(toastTimeout);
            toastTimeout = setTimeout(() => {
                toastContainer.classList.remove('show');
            }, 3500);
        }
    }

    // Function to open Modal
    function openModal(projectId) {
        const data = projectDetails[projectId];
        if (data && modalBody && modalOverlay) {
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
                    <a href="${data.primaryBtnUrl}" target="_blank" class="btn ${data.primaryBtnClass}"><i class="${data.primaryBtnIcon}"></i> ${data.primaryBtnText}</a>
                    <a href="${data.secondaryBtnUrl}" target="_blank" class="btn ${data.secondaryBtnClass}"><i class="${data.secondaryBtnIcon}"></i> ${data.secondaryBtnText}</a>
                </div>
            `;

            modalOverlay.classList.add('active');
        }
    }

    // Project Cards Click Handlers
    document.querySelectorAll('.clickable-card').forEach(card => {
        card.addEventListener('click', (e) => {
            const projectId = card.getAttribute('data-project');

            if (projectId === 'web-portfolio') {
                // If HTML portfolio card itself is clicked -> show toast notification
                showToast("Siz hozirda ushbu loyihaning jonli veb-saytida turibsiz.");
            } else {
                // For other cards (e.g. PHP Task Manager) -> open modal
                openModal(projectId);
            }
        });
    });

    // "Batafsil ko'rish" button click handlers
    document.querySelectorAll('.open-modal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent card click
            const projectId = btn.getAttribute('data-modal');
            openModal(projectId);
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

    // 6. Floating AI Assistant Chatbot Logic
    const aiChatTrigger = document.getElementById('aiChatTrigger');
    const aiChatWindow = document.getElementById('aiChatWindow');
    const aiChatClose = document.getElementById('aiChatClose');
    const aiChatBody = document.getElementById('aiChatBody');
    const aiChatInput = document.getElementById('aiChatInput');
    const aiChatSend = document.getElementById('aiChatSend');
    const aiChatChips = document.getElementById('aiChatChips');

    if (aiChatTrigger && aiChatWindow) {
        aiChatTrigger.addEventListener('click', () => {
            aiChatWindow.classList.toggle('active');
        });

        if (aiChatClose) {
            aiChatClose.addEventListener('click', () => {
                aiChatWindow.classList.remove('active');
            });
        }

        const GEMINI_API_KEY = 'AIzaSyCwqTL6ZB-W8kukvSiJGIXUjk756HQTqYo';
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemma-4-26b-a4b-it:generateContent?key=${GEMINI_API_KEY}`;

        let conversationHistory = [
            {
                role: "user",
                parts: [{ text: "Siz Sa'dullayev Azizbekning rasmiy portfolio saytidagi aqlli, do'stona va psixologik maslahatchi AI Yordamchisiz. Azizbek Java, Python (aiogram 3 Telegram botlar), PHP (SQLite Web Backend), Android Studio bo'yicha kuchli dasturchi. Telegram: @azizbeky (+998 95 817 0023). Foydalanuvchilar har qanday savol (matematika, 2+2, dasturlash, umumiy savollar va b.) bersa ham xuddi aqlli AI assistant kabi o'zbek tilida aniq va foydali javob bering, Azizbekning kuchli tomonlarini maqlang va Telegramini (@azizbeky) tavsiya qiling." }]
            },
            {
                role: "model",
                parts: [{ text: "Assalomu alaykum! Men Sa'dullayev Azizbekning AI yordamchisiman. Sizga qanday masalada yordam bera olaman?" }]
            }
        ];

        function appendMessage(text, isUser = false) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `ai-msg ${isUser ? 'user-msg' : 'bot-msg'}`;
            msgDiv.innerHTML = `<div class="msg-bubble">${text}</div>`;
            aiChatBody.appendChild(msgDiv);
            aiChatBody.scrollTop = aiChatBody.scrollHeight;
        }

        async function fetchGeminiResponse(userText) {
            conversationHistory.push({
                role: "user",
                parts: [{ text: userText }]
            });

            try {
                const response = await fetch(GEMINI_API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        contents: conversationHistory
                    })
                });

                const data = await response.json();
                if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                    let aiText = data.candidates[0].content.parts[0].text;

                    conversationHistory.push({
                        role: "model",
                        parts: [{ text: aiText }]
                    });

                    // Clean thinking steps if outputting formatted markdown
                    aiText = aiText.replace(/\*   Input:[\s\S]*?\*Final Draft:\*\s*/i, '').trim();

                    let formatted = aiText
                        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
                        .replace(/\*(.*?)\*/g, '<i>$1</i>')
                        .replace(/^\* /gm, '• ')
                        .replace(/\n/g, '<br>');

                    return formatted;
                }
            } catch (err) {
                console.error("Gemini API Error:", err);
            }

            return `🚀 **Azizbek — ko'p qirrali va tajribali dasturchi!**<br><br>` +
                   `U sizning loyihangiz uchun eng optimal dasturiy yechimni tayyorlab bera oladi.<br><br>` +
                   `<a href="https://t.me/azizbeky" target="_blank" class="btn btn-telegram" style="display:inline-flex; padding:6px 14px; font-size:0.82rem;"><i class="fa-brands fa-telegram"></i> Telegramda bog'lanish (@azizbeky)</a>`;
        }

        async function handleSend() {
            const text = aiChatInput.value.trim();
            if (!text) return;
            appendMessage(text, true);
            aiChatInput.value = '';

            appendMessage("⏳ <i>AI javob tayyorlamoqda...</i>", false);
            const loadingMsg = aiChatBody.lastElementChild;

            const reply = await fetchGeminiResponse(text);
            if (loadingMsg) loadingMsg.remove();
            appendMessage(reply, false);
        }

        aiChatSend.addEventListener('click', handleSend);
        aiChatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') handleSend();
        });

        if (aiChatChips) {
            aiChatChips.querySelectorAll('.chip-btn').forEach(btn => {
                btn.addEventListener('click', async () => {
                    const query = btn.getAttribute('data-query');
                    appendMessage(query, true);

                    appendMessage("⏳ <i>AI javob tayyorlamoqda...</i>", false);
                    const loadingMsg = aiChatBody.lastElementChild;

                    const reply = await fetchGeminiResponse(query);
                    if (loadingMsg) loadingMsg.remove();
                    appendMessage(reply, false);
                });
            });
        }
    }
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
