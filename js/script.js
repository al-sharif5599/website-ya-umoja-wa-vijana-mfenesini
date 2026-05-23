/*
  MFENESINI Youth Development Cooperative — Vanilla JS
  Features:
  - Loading fade-out
  - Hero fullscreen slider (5s auto, prev/next, dots, animated text transitions)
  - Mobile nav toggle + smooth scrolling + active link highlighting
  - Scroll reveal animations
  - Animated counters (data-counter)
  - Dark mode toggle saved in localStorage
  - Dynamic rendering: activities, gallery, posts, leadership
  - Gallery filtering + lightbox + video modal
  - Posts: like + comment persistence via localStorage
  - Contact form UX: validation + loading state + success/error messages
  - Back-to-top button
*/

(() => {
    const $ = (sel, root = document) => root.querySelector(sel);
    const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

    /* ------------------------------ i18n ------------------------------ */
    const LANG_KEY = 'mfenesini_lang';
    const LANGS = {
        en: {
            // Static text
            loadingText: 'Preparing the experience…',
            skipToContent: 'Skip to content',
            brandSub: 'YOUTH DEVELOPMENT COOPERATIVE',
            navHome: 'Home',
            navAbout: 'About',
            navActivities: 'Activities',
            navGallery: 'Gallery',
            navLeadership: 'Leadership',
            navContact: 'Contact',
            heroEyebrow: 'Mfenesini, Zanzibar · Tanzania',
            heroTitle: 'Empowering Youth for Community Development',
            heroDesc: 'MFENESINI YOUTH DEVELOPMENT COOPERATIVE unites young people to serve our community through farming, education support, sports, cleaning campaigns, and development projects.',
            heroExplore: 'Explore Activities',
            heroContact: 'Contact Us',
            metaProjTitle: 'Community Projects',
            metaProjSub: 'Farming · Cleanups · Training',
            metaLeadTitle: 'Youth Leadership',
            metaLeadSub: 'Organized · Accountable · Caring',
            scroll: 'Scroll',
            aboutTitle: 'About Us',
            aboutDesc: 'We are a youth cooperative in Mfenesini, Zanzibar. Our focus is building skills, creating opportunities, and strengthening community bonds.',
            aboutCardTitle: 'MFENESINI YOUTH DEVELOPMENT COOPERATIVE',
            aboutCardText: 'We mobilize young people to improve livelihoods and wellbeing through practical community service. From agriculture to education support, we keep our work visible, measurable, and community-driven.',
            missionTitle: 'Mission',
            missionDesc: 'To empower youth through organized community service and capacity building.',
            visionTitle: 'Vision',
            visionDesc: 'A resilient community where youth lead sustainable development initiatives.',
            objectivesTitle: 'Objectives',
            objectivesDesc: 'Deliver community activities, support education, encourage sports and unity, and promote entrepreneurship.',
            impactTitle: 'Community Impact',
            impactDesc: 'Our activities strengthen social cohesion, improve local environments, and create pathways for young leaders.',
            statYouth: 'Youth involved',
            statProjects: 'Projects completed',
            statActivities: 'Community activities',
            statTraining: 'Training sessions',
            quote: '“When youth organize, the community grows stronger.”',
            motto: '— MFENESINI Cooperative Motto',
            activitiesTitle: 'Activities',
            activitiesDesc: 'Practical, community-focused work—designed to inspire and sustain youth empowerment.',
            galleryTitle: 'Gallery',
            galleryDesc: 'Photos and short videos from our community work.',
            postsTitle: 'Community Updates',
            postsDesc: 'Like posts and leave comments your interactions stay after refresh.',
            leadershipTitle: 'Leadership',
            leadershipDesc: 'Meet the cooperative cabinet members youth leaders serving the community.',
            contactTitle: 'Contact & Location',
            contactDesc: 'Find us in Mfenesini, Zanzibar. For partnerships, donations, or youth support, reach out.',
            chairman: 'chair man',
            location: 'Mfenesini, Zanzibar, Tanzania',
            sendMsg: 'Send a Message',
            formName: 'Name',
            formEmail: 'Email',
            formMessage: 'Message',
            namePlaceholder: 'Your name',
            emailPlaceholder: 'you@example.com',
            messagePlaceholder: 'How can we help?',
            submitBtn: 'Submit Message',
            footerLinks: 'Quick Links',
            footerSocial: 'Social',
            footerCopy: 'MFENESINI Youth Development Cooperative. All rights reserved.',
            footerImpact: 'Designed for community impact in Mfenesini, Zanzibar.',

            // Chatbot
            chatBotTitle: 'MYDC Chatbot',
            chatBotWelcome: 'Hello! Welcome. Do you have any questions about Mfenesini Youth Cooperative?',
            chatPlaceholder: 'Write a message...',
            chatBotWait: 'Thinking...',
            chatQAbout: 'About Us',
            chatQActivities: 'Our Activities',
            chatQContact: 'Contact',
            chatQLocation: 'Location',
            chatResponses: {
                hello: "Hello! Karibu Mfenesini Youth. How can I help you today?",
                about: "We are a youth cooperative in Mfenesini, Zanzibar. We focus on farming, sports, and community development.",
                contact: "You can reach us at: +255 626 112 422.",
                location: "Our offices are located in Mfenesini, Zanzibar.",
                activities: "We engage in community farming, education support, sports, and cleaning campaigns.",
                thanks: "You're welcome! We are here for you.",
                default: "Sorry, I didn't quite get that. Try asking about 'contact', 'our activities', or 'about us'."
            },

            // dynamic (JS) strings
            gallery: {
                all: 'All',
                photo: 'Photos',
                video: 'Videos',
                badgePhoto: 'Photo',
                badgeVideo: 'Video',
                openGallery: (label) => `Open ${label}`
            },
            posts: {
                sectionTitle: 'Community Updates',
                like: 'Like',
                comment: 'Comment',
                send: 'Send',
                commentPlaceholder: 'Write a comment…',
                commentTooShort: 'Comment is too short.',
                commentAdded: 'Comment added!',
                noComments: 'No comments yet.',
                likesLabel: 'Likes',
                timeAgo: (mins, hrs, days) => {
                    if (mins < 60) return `${mins}m ago`;
                    if (hrs < 24) return `${hrs}h ago`;
                    return `${days}d ago`;
                }
            },
            contact: {
                sendMessage: 'Send a Message',
                nameLabel: 'Name',
                emailLabel: 'Email',
                messageLabel: 'Message',
                namePlaceholder: 'Your name',
                emailPlaceholder: 'you@example.com',
                messagePlaceholder: 'How can we help?',
                submitMessage: 'Submit Message',
                sending: 'Sending…',
                validateFix: 'Please fix the highlighted fields.',
                success: 'Message sent successfully! We will get back to you soon.',
                error: 'Something went wrong. Please try again.'
            },
            loading: {
                overlayText: 'Preparing the experience…'
            },
            aria: {
                openMenu: 'Open menu',
                close: 'Close',
                backToTop: 'Back to top',
                prevHero: 'Previous slide',
                nextHero: 'Next slide'
            },

            // Dynamic Data
            activitiesData: [
                { title: 'Community Farming', desc: 'Support sustainable farming practices to improve livelihoods and strengthen resilience.' },
                { title: 'Education Support', desc: 'Mentorship and learning materials to help youth access opportunities and skills.' },
                { title: 'Youth Sports & Fitness', desc: 'Organized sports sessions that build discipline, teamwork, and healthy habits.' },
                { title: 'Cleaning Campaigns', desc: 'Community cleanups that protect our environment and inspire civic responsibility.' },
                { title: 'Leadership Meetings', desc: 'Train youth leaders for accountability, planning, and community service.' },
                { title: 'Team Development', desc: 'Workshops that unite youth to create projects, collaborate, and deliver impact.' }
            ],
            leadershipData: [
                { name: 'Amina Hassan', position: 'Chairperson', bio: 'Leads cooperative strategy and mobilizes youth for community-centered projects.' },
                { name: 'Juma Said', position: 'Secretary', bio: 'Coordinates documentation, schedules, and transparency for every program we run.' },
                { name: 'Neema Baraka', position: 'Programs Lead', bio: 'Designs youth training and ensures activities deliver measurable community impact.' },
                { name: 'Khalid Omar', position: 'Projects Coordinator', bio: 'Manages field operations for farming, cleanups, and partnerships with local leaders.' }
            ],
            postsData: [
                { desc: 'Youth-led farming session: learning sustainable techniques and sharing tools for the next harvest.' },
                { desc: 'Sports and fitness day: teamwork, discipline, and healthy habits for a stronger community.' },
                { desc: 'Community cleanup campaign—protecting our environment and inspiring civic responsibility.' }
            ]
        },
        sw: {
            // Static text
            loadingText: 'Inaandaa uzoefu…',
            skipToContent: 'Ruka kwenda kwenye maudhui',
            brandSub: 'USHIRIKA WA MAENDELEO YA VIJANA',
            navHome: 'Mwanzo',
            navAbout: 'Kuhusu Sisi',
            navActivities: 'Shughuli',
            navGallery: 'Picha/Video',
            navLeadership: 'Uongozi',
            navContact: 'Mawasiliano',
            heroEyebrow: 'Mfenesini, Zanzibar · Tanzania',
            heroTitle: 'Kuwezesha Vijana kwa Maendeleo ya Jamii',
            heroDesc: 'USHIRIKA WA MAENDELEO YA VIJANA MFENESINI unaunganisha vijana kutumikia jamii yetu kupitia kilimo, msaada wa elimu, michezo, kampeni za usafi, na miradi ya maendeleo.',
            heroExplore: 'Gundua Shughuli',
            heroContact: 'Wasiliana Nasi',
            metaProjTitle: 'Miradi ya Jamii',
            metaProjSub: 'Kilimo · Usafi · Mafunzo',
            metaLeadTitle: 'Uongozi wa Vijana',
            metaLeadSub: 'Imepangwa · Inawajibika · Inajali',
            scroll: 'Shuka chini',
            aboutTitle: 'Kuhusu Sisi',
            aboutDesc: 'Sisi ni ushirika wa vijana huko Mfenesini, Zanzibar. Lengo letu ni kujenga ujuzi, kutengeneza fursa, na kuimarisha vifungo vya jamii.',
            aboutCardTitle: 'USHIRIKA WA MAENDELEO YA VIJANA MFENESINI',
            aboutCardText: 'Tunahamasisha vijana kuboresha maisha na ustawi kupitia huduma za jamii. Kuanzia kilimo hadi msaada wa elimu, tunaweka kazi zetu wazi, zinazoweza kupimika, na zinazoendeshwa na jamii.',
            missionTitle: 'Dhamira',
            missionDesc: 'Kuwezesha vijana kupitia huduma za jamii zilizopangwa na ujenzi wa uwezo.',
            visionTitle: 'Maono',
            visionDesc: 'Jamii thabiti ambapo vijana wanaongoza mipango ya maendeleo endelevu.',
            objectivesTitle: 'Malengo',
            objectivesDesc: 'Kutoa shughuli za jamii, kusaidia elimu, kuhimiza michezo na umoja, na kukuza ujasiriamali.',
            impactTitle: 'Athari kwa Jamii',
            impactDesc: 'Shughuli zetu zinaimarisha mshikamano wa kijamii, kuboresha mazingira ya ndani, na kutengeneza njia kwa viongozi vijana.',
            statYouth: 'Vijana waliohusika',
            statProjects: 'Miradi iliyokamilika',
            statActivities: 'Shughuli za jamii',
            statTraining: 'Vikao vya mafunzo',
            quote: '“Vijana wanapojipanga, jamii inakuwa na nguvu zaidi.”',
            motto: '— Kaulimbiu ya Ushirika wa MFENESINI',
            activitiesTitle: 'Shughuli',
            activitiesDesc: 'Kazi ya vitendo, inayolenga jamii—iliyoundwa kuhamasisha na kudumisha uwezeshaji wa vijana.',
            galleryTitle: 'Picha/Video',
            galleryDesc: 'Picha na video fupi kutoka kwa kazi yetu ya jamii.',
            postsTitle: 'Taarifa za Jamii',
            postsDesc: 'Penda machapisho na uache maoni mwingiliano wako unabaki baada ya kuonyesha upya.',
            leadershipTitle: 'Uongozi',
            leadershipDesc: 'Kutana na wajumbe wa baraza la ushirika viongozi vijana wanaotumikia jamii.',
            contactTitle: 'Mawasiliano na Mahali',
            contactDesc: 'Tupate Mfenesini, Zanzibar. Kwa ushirikiano, michango, au msaada kwa vijana, wasiliana nasi.',
            chairman: 'mwenyekiti',
            location: 'Mfenesini, Zanzibar, Tanzania',
            sendMsg: 'Tuma Ujumbe',
            formName: 'Jina',
            formEmail: 'Barua pepe',
            formMessage: 'Ujumbe',
            namePlaceholder: 'Jina lako',
            emailPlaceholder: 'we@example.com',
            messagePlaceholder: 'Tunawezaje kukusaidia?',
            submitBtn: 'Wasilisha Ujumbe',
            footerLinks: 'Viungo vya Haraka',
            footerSocial: 'Mitandao ya Kijamii',
            footerCopy: 'Ushirika wa Maendeleo ya Vijana MFENESINI. Haki zote zimehifadhiwa.',
            footerImpact: 'Imeundwa kwa athari za jamii huko Mfenesini, Zanzibar.',

            // Chatbot
            chatBotTitle: 'MYDC Chatbot',
            chatBotWelcome: 'Habari! Karibu. Una swali lolote kuhusu Mfenesini Youth Cooperative?',
            chatPlaceholder: 'Andika ujumbe...',
            chatBotWait: 'Inafikiri...',
            chatQAbout: 'Kuhusu Sisi',
            chatQActivities: 'Shughuli Zetu',
            chatQContact: 'Mawasiliano',
            chatQLocation: 'Mahali',
            chatResponses: {
                hello: "Safi! Karibu Mfenesini Youth. Ungependa kujua nini kuhusu sisi?",
                about: "Sisi ni ushirika wa vijana wa Mfenesini, Zanzibar. Tunajihusisha na kilimo, michezo na maendeleo ya jamii.",
                contact: "Unaweza kutupigia kwa namba: +255 626 112 422.",
                location: "Ofisi zetu zipo Mfenesini, Zanzibar.",
                activities: "Tunafanya kilimo cha jamii, msaada wa elimu, michezo, na usafi wa mazingira.",
                thanks: "Karibu sana! Tuko hapa kwa ajili yako.",
                default: "Samahani, sijaelewa vizuri. Jaribu kuuliza kuhusu 'mawasiliano', 'shughuli zetu', au 'kuhusu sisi'."
            },

            hero: 'Kitendo cha kuchukua',
            gallery: {
                all: 'Zote',
                photo: 'Picha',
                video: 'Video',
                badgePhoto: 'Picha',
                badgeVideo: 'Video',
                openGallery: (label) => `Fungua ${label}`
            },
            posts: {
                sectionTitle: 'Taarifa za Jamii',
                like: 'Penda',
                comment: 'Maoni',
                send: 'Tuma',
                commentPlaceholder: 'Andika maoni…',
                commentTooShort: 'Maoni mafupi sana.',
                commentAdded: 'Ujumbe wa maoni umeongezwa!',
                noComments: 'Bado hakuna maoni.',
                likesLabel: 'Likes',
                timeAgo: (mins, hrs, days) => {
                    if (mins < 60) return `Dak ${mins} zilizopita`;
                    if (hrs < 24) return `Masaa ${hrs} yaliyopita`;
                    return `Siku ${days} zilizopita`;
                }
            },
            contact: {
                sendMessage: 'Tuma Ujumbe',
                nameLabel: 'Jina',
                emailLabel: 'Barua pepe',
                messageLabel: 'Ujumbe',
                namePlaceholder: 'Jina lako',
                emailPlaceholder: 'we@example.com',
                messagePlaceholder: 'Tunawezaje kukusaidia?',
                submitMessage: 'Wasilisha Ujumbe',
                sending: 'Inatuma…',
                validateFix: 'Tafadhali rekebisha sehemu zilizoangaziwa.',
                success: 'Ujumbe umetumwa kwa mafanikio! Tutakujibu hivi karibuni.',
                error: 'Kuna tatizo. Tafadhali jaribu tena.'
            },
            loading: {
                overlayText: 'Inaandaa uzoefu…'
            },
            aria: {
                openMenu: 'Fungua menyu',
                close: 'Funga',
                backToTop: 'Rudi juu',
                prevHero: 'Slide iliyopita',
                nextHero: 'Slide inayofuata'
            },

            // Dynamic Data Swahili
            activitiesData: [
                { title: 'Kilimo cha Jamii', desc: 'Kusaidia mbinu endelevu za kilimo ili kuboresha maisha na kuimarisha uthabiti.' },
                { title: 'Msaada wa Elimu', desc: 'Ushauri na vifaa vya kujifunzia ili kusaidia vijana kupata fursa na ujuzi.' },
                { title: 'Michezo na Afya ya Vijana', desc: 'Vikao vya michezo vilivyopangwa ambavyo hujenga nidhamu, kazi ya pamoja, na tabia za afya.' },
                { title: 'Kampeni za Usafi', desc: 'Usafi wa jamii unaolinda mazingira yetu na kuhamasisha uwajibikaji wa kijamii.' },
                { title: 'Mikutano ya Uongozi', desc: 'Kutoa mafunzo kwa viongozi vijana kwa ajili ya uwajibikaji, upangaji, na huduma kwa jamii.' },
                { title: 'Maendeleo ya Timu', desc: 'Warsha zinazowaunganisha vijana kuunda miradi, kushirikiana, na kutoa athari.' }
            ],
            leadershipData: [
                { name: 'Amina Hassan', position: 'Mwenyekiti', bio: 'Anaongoza mkakati wa ushirika na kuhamasisha vijana kwa ajili ya miradi inayolenga jamii.' },
                { name: 'Juma Said', position: 'Katibu', bio: 'Anaratibu nyaraka, ratiba, na uwazi kwa kila mpango tunaoendesha.' },
                { name: 'Neema Baraka', position: 'Kiongozi wa Mipango', bio: 'Anatengeneza mafunzo ya vijana na kuhakikisha shughuli zinatoa athari inayopimika kwa jamii.' },
                { name: 'Khalid Omar', position: 'Mratibu wa Miradi', bio: 'Anasimamia shughuli za nyanjani za kilimo, usafi, na ushirikiano na viongozi wa ndani.' }
            ],
            postsData: [
                { desc: 'Kipindi cha kilimo kinachoongozwa na vijana: kujifunza mbinu endelevu na kushiriki zana kwa mavuno yajayo.' },
                { desc: 'Siku ya michezo na afya: kazi ya pamoja, nidhamu, na tabia za afya kwa jamii yenye nguvu zaidi.' },
                { desc: 'Kampeni ya usafi wa jamii—kulinda mazingira yetu na kuhamasisha uwajibikaji wa kijamii.' }
            ]
        }
    };

    const getInitialLang = () => {
        const saved = localStorage.getItem(LANG_KEY);
        if (saved === 'en' || saved === 'sw') return saved;
        const nav = (navigator.language || '').toLowerCase();
        if (nav.startsWith('sw') || nav.startsWith('sw-') || nav.includes('swahili')) return 'sw';
        return 'en';
    };

    const state = {
        lang: getInitialLang()
    };

    const applyLanguage = (lang) => {
        const dict = LANGS[lang] || LANGS.en;
        state.lang = lang;

        // update html lang + helper attribute
        document.documentElement.lang = lang === 'sw' ? 'sw' : 'en';
        document.documentElement.setAttribute('data-current-lang', lang);

        // static text nodes in HTML
        $$('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (!key) return;
            el.textContent = dict[key] ?? el.textContent;
        });

        // dynamic placeholders
        $$('[data-i18n-placeholder]').forEach((el) => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (!key) return;
            el.placeholder = dict[key] ?? el.placeholder;
        });

        // Chatbot re-init welcome message if empty
        const chatMessages = $('#chatMessages');
        if (chatMessages && chatMessages.children.length === 1) {
            chatMessages.children[0].textContent = dict.chatBotWelcome;
        }

        // overlay
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) loadingText.textContent = dict.loading.overlayText;

        // header aria + hero controls labels (basic)
        const themeToggle = $('#themeToggle');
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', lang === 'sw' ? 'Badilisha mandhari ya giza' : 'Toggle dark mode');
            themeToggle.setAttribute('title', lang === 'sw' ? 'Mandhari ya giza' : 'Dark mode');
        }

        const prevHero = $('#prevHero');
        const nextHero = $('#nextHero');
        if (prevHero) prevHero.setAttribute('aria-label', dict.aria.prevHero);
        if (nextHero) nextHero.setAttribute('aria-label', dict.aria.nextHero);

        const backToTop = $('#backToTop');
        if (backToTop) backToTop.setAttribute('aria-label', dict.aria.backToTop);

        const lightboxClose = $('#lightboxClose');
        const videoClose = $('#videoClose');
        if (lightboxClose) lightboxClose.setAttribute('aria-label', dict.aria.close);
        if (videoClose) videoClose.setAttribute('aria-label', dict.aria.close);

        // Language toggle active styles
        $$('.lang-btn').forEach((b) => {
            b.classList.toggle('is-active', b.getAttribute('data-lang') === lang);
        });

        // Re-render dynamic blocks that rely on language
        renderAllDynamic(lang);

        // Persist
        localStorage.setItem(LANG_KEY, lang);
    };

    renderAllDynamic = (lang) => {
        // Defer rendering to avoid blocking the main thread
        requestAnimationFrame(() => {
            renderActivities(lang);
            renderLeadership(lang);
            renderGallery('all'); // it uses state.lang inside
            if (state.updateGalleryFilters) state.updateGalleryFilters(lang);
            renderPosts(lang);
        });
    };

    // init lang buttons
    $$('.lang-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang === 'en' || lang === 'sw') applyLanguage(lang);
        });
    });

    applyLanguage(state.lang);


    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* --------------------------- Loading Screen --------------------------- */
    const loadingOverlay = $('.loading-overlay');
    let loadingHidden = false;
    const fadeOutLoading = () => {
        if (loadingHidden || !loadingOverlay) return;
        loadingHidden = true;
        if (prefersReducedMotion) {
            loadingOverlay.style.display = 'none';
            return;
        }
        loadingOverlay.style.transition = 'opacity 300ms ease';
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
        }, 320);
    };
    // Hide loading overlay quickly - don't wait for all external resources
    // Use DOMContentLoaded which fires when HTML is parsed (much faster)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Small delay to ensure content is painted
            requestAnimationFrame(() => {
                setTimeout(fadeOutLoading, 200);
            });
        });
    }
    // Fallback: force hide loading after 1.5 seconds even if resources haven't loaded
    setTimeout(fadeOutLoading, 1500);

    /* ----------------------------- Dark Mode ------------------------------ */
    const themeToggle = $('#themeToggle');
    const THEME_KEY = 'mfenesini_theme';

    const applyTheme = (theme) => {
        const root = document.documentElement;
        if (theme === 'light') root.setAttribute('data-theme', 'light');
        else root.removeAttribute('data-theme');
    };

    const initTheme = () => {
        const saved = localStorage.getItem(THEME_KEY);
        if (saved === 'light' || saved === 'dark') {
            applyTheme(saved);
            return;
        }
        // Default: dark
        applyTheme('dark');
    };

    const toggleTheme = () => {
        const root = document.documentElement;
        const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(THEME_KEY, next);
    };

    if (themeToggle) {
        initTheme();
        themeToggle.addEventListener('click', toggleTheme);
    }

    /* -------------------------- Mobile Navigation ------------------------- */
    const navToggle = $('.nav-toggle');
    const navMenu = $('#nav-menu');

    const setNavOpen = (isOpen) => {
        if (!navMenu || !navToggle) return;
        navMenu.classList.toggle('is-open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    };

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('is-open');
            setNavOpen(!isOpen);
        });

        // Close menu on link click (mobile)
        $$('.nav-link', navMenu).forEach((a) => {
            a.addEventListener('click', () => setNavOpen(false));
        });

        // Close menu on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') setNavOpen(false);
        });
    }

    /* ------------------------- Smooth Scroll Links ------------------------ */
    const scrollToHash = (hash) => {
        const el = document.querySelector(hash);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - 78; // header offset
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    $$('.nav-link').forEach((link) => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();
            scrollToHash(href);
        });
    });

    /* ---------------------- Active Section Highlighting ------------------ */
    const sections = ['home', 'about', 'activities', 'gallery', 'leadership', 'contact'];
    const navLinks = new Map();
    sections.forEach((id) => {
        const a = $(`.nav-link[href="#${id}"]`);
        if (a) navLinks.set(id, a);
    });

    const updateActiveNav = () => {
        const pos = window.scrollY + 120;
        let current = 'home';
        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            if (el.offsetTop <= pos) current = id;
        });

        navLinks.forEach((a, id) => {
            a.classList.toggle('is-active', id === current);
        });
    };

    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    /* --------------------------- Scroll Reveal ---------------------------- */
    const revealEls = $$('[data-reveal]');
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));

    /* ---------------------------- Animated Counters ----------------------- */
    const counterEls = $$('[data-counter]');
    const animateCounter = (el) => {
        const target = Number(el.getAttribute('data-counter')) || 0;
        if (Number.isNaN(target)) return;

        const start = 0;
        const duration = prefersReducedMotion ? 1 : 1100;
        const startTime = performance.now();

        const step = (now) => {
            const t = Math.min(1, (now - startTime) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            const value = Math.floor(start + (target - start) * eased);
            el.textContent = String(value);
            if (t < 1) requestAnimationFrame(step);
        };

        requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.35 }
    );
    counterEls.forEach((el) => counterObserver.observe(el));

    /* ------------------------------ Hero Slider --------------------------- */
    const heroSlidesWrap = $('#heroSlides');
    const heroSlides = heroSlidesWrap ? $$('.hero-slide', heroSlidesWrap) : [];
    const dotsWrap = $('#heroDots');
    const prevBtn = $('#prevHero');
    const nextBtn = $('#nextHero');

    let heroIndex = 0;
    let heroTimer = null;

    const setHeroIndex = (i, { auto = false } = {}) => {
        if (!heroSlides.length) return;
        const next = (i + heroSlides.length) % heroSlides.length;
        heroIndex = next;

        heroSlides.forEach((s, idx) => s.classList.toggle('is-active', idx === heroIndex));

        if (dotsWrap) {
            $$('.dot', dotsWrap).forEach((d, idx) => d.classList.toggle('is-active', idx === heroIndex));
        }

        // Animate text transitions subtly
        const copy = $('.hero-copy');
        if (copy && !prefersReducedMotion && auto) {
            copy.animate([
                { transform: 'translateY(0)', filter: 'blur(0px)', opacity: 1 },
                { transform: 'translateY(6px)', filter: 'blur(2px)', opacity: .85 },
                { transform: 'translateY(0)', filter: 'blur(0px)', opacity: 1 }
            ], { duration: 520, easing: 'cubic-bezier(.2,.9,.2,1)' });
        }
    };

    const buildDots = () => {
        if (!dotsWrap || !heroSlides.length) return;
        dotsWrap.innerHTML = '';
        heroSlides.forEach((_, idx) => {
            const b = document.createElement('button');
            b.type = 'button';
            b.className = 'dot' + (idx === heroIndex ? ' is-active' : '');
            b.setAttribute('aria-label', `Go to slide ${idx + 1}`);
            b.addEventListener('click', () => {
                stopHeroTimer();
                setHeroIndex(idx);
                startHeroTimer();
            });
            dotsWrap.appendChild(b);
        });
    };

    const startHeroTimer = () => {
        if (prefersReducedMotion) return;
        stopHeroTimer();
        heroTimer = setInterval(() => {
            setHeroIndex(heroIndex + 1, { auto: true });
        }, 5000);
    };

    const stopHeroTimer = () => {
        if (heroTimer) clearInterval(heroTimer);
        heroTimer = null;
    };

    if (heroSlides.length) {
        // Ensure first active
        setHeroIndex(heroIndex);
        buildDots();
        startHeroTimer();

        if (prevBtn) prevBtn.addEventListener('click', () => { stopHeroTimer(); setHeroIndex(heroIndex - 1); startHeroTimer(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { stopHeroTimer(); setHeroIndex(heroIndex + 1); startHeroTimer(); });

        // Pause on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopHeroTimer);
            heroSection.addEventListener('mouseleave', startHeroTimer);
        }
    }

    /* --------------------------- Data (Sample) --------------------------- */
    // Using safe public placeholder images.
    const IMG = {
        zanzibarYouth: 'https://images.unsplash.com/photo-1520975958225-0f0fe0c5fb7c?auto=format&fit=crop&w=1200&q=70',
        communityDev: 'https://images.unsplash.com/photo-1520975693411-0f5c8b8c2d9c?auto=format&fit=crop&w=1200&q=70',
        farming: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=70',
        meetings: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=70',
        teamwork: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=1200&q=70',
        sports: 'https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=70',
        education: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=70',
        cleanups: 'https://images.unsplash.com/photo-1520975916090-6b7bd9b1c3c5?auto=format&fit=crop&w=1200&q=70'
    };

    const activities = [
        { img: IMG.farming },
        { img: IMG.education },
        { img: IMG.sports },
        { img: IMG.cleanups },
        { img: IMG.meetings },
        { img: IMG.teamwork }
    ];

    const galleryItems = [
        { type: 'photo', img: IMG.zanzibarYouth, labelEn: 'Zanzibar Youth', labelSw: 'Vijana wa Zanzibar' },
        { type: 'photo', img: IMG.communityDev, labelEn: 'Community Development', labelSw: 'Maendeleo ya Jamii' },
        { type: 'photo', img: IMG.farming, labelEn: 'Farming Day', labelSw: 'Siku ya Kilimo' },
        { type: 'video', img: IMG.meetings, labelEn: 'Leadership Session', labelSw: 'Kikao cha Uongozi', videoId: 'dQw4w9WgXcQ' },
        { type: 'photo', img: IMG.teamwork, labelEn: 'Teamwork Together', labelSw: 'Kazi ya Pamoja' },
        { type: 'video', img: IMG.sports, labelEn: 'Sports Highlights', labelSw: 'Vivutio vya Michezo', videoId: '5qap5aO4i9A' },
        { type: 'photo', img: IMG.education, labelEn: 'Learning Support', labelSw: 'Msaada wa Kujifunza' },
        { type: 'photo', img: IMG.cleanups, labelEn: 'Cleaning Campaigns', labelSw: 'Kampeni za Usafi' }
    ];

    const leadership = [
        { img: 'https://images.unsplash.com/photo-1543269664-2f8f52a5f6a5?auto=format&fit=crop&w=1200&q=70', phone: '+255 700 123 456' },
        { img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=70', phone: '+255 747 222 901' },
        { img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=70', phone: '+255 766 880 113' },
        { img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=70', phone: '+255 745 101 778' }
    ];

    const posts = [
        { img: IMG.farming, ts: '2026-05-01T09:30:00Z' },
        { img: IMG.sports, ts: '2026-05-10T16:45:00Z' },
        { img: IMG.cleanups, ts: '2026-05-16T12:10:00Z' }
    ];

    /* ------------------------ Activities Rendering ------------------------ */
    const activitiesGrid = $('#activitiesGrid');
    const renderActivities = (lang) => {
        if (!activitiesGrid) return;
        const data = LANGS[lang].activitiesData;
        activitiesGrid.innerHTML = activities.map((a, idx) => `
      <article class="card" data-reveal>
        <div class="activity-media" style="background-image:url('${a.img}')">
          <div class="activity-overlay"></div>
          <div class="activity-hover" aria-hidden="true"></div>
        </div>
        <div class="card-body">
          <h3 class="card-title">${data[idx].title}</h3>
          <p class="card-text">${data[idx].desc}</p>
        </div>
      </article>
    `).join('');
        $$('[data-reveal]', activitiesGrid).forEach((el) => revealObserver.observe(el));
    };

    /* -------------------------- Leadership Rendering ---------------------- */
    const leadershipGrid = $('#leadershipGrid');
    const renderLeadership = (lang) => {
        if (!leadershipGrid) return;
        const data = LANGS[lang].leadershipData;
        leadershipGrid.innerHTML = leadership.map((l, idx) => `
      <article class="leader-card" data-reveal>
        <div class="leader-photo"><img src="${l.img}" alt="${data[idx].name}" loading="lazy"/></div>
        <h3 class="leader-name">${data[idx].name}</h3>
        <p class="leader-pos">${data[idx].position}</p>
        <a class="leader-phone" href="tel:${l.phone.replace(/\s/g, '')}"><span aria-hidden="true">📞</span> ${l.phone}</a>
        <p class="leader-bio">${data[idx].bio}</p>
      </article>
    `).join('');
        $$('[data-reveal]', leadershipGrid).forEach((el) => revealObserver.observe(el));
    };

    /* ----------------------------- Gallery UI ----------------------------- */
    const galleryGrid = $('#galleryGrid');
    const gallerySection = $('#gallery');
    const lightbox = $('#lightbox');
    const lightboxImg = $('#lightboxImg');
    const lightboxClose = $('#lightboxClose');
    const videoModal = $('#videoModal');
    const videoFrame = $('#videoFrame');
    const videoClose = $('#videoClose');

    const openLightbox = (src, alt = '') => {
        if (!lightbox || !lightboxImg) return;
        lightboxImg.src = src;
        lightboxImg.alt = alt || 'Gallery preview';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('is-open');
        lightboxImg && (lightboxImg.src = '');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    const openVideo = (videoId) => {
        if (!videoModal || !videoFrame) return;
        // Use YouTube embed. videoId is a safe sample.
        videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    };

    const closeVideo = () => {
        if (!videoModal || !videoFrame) return;
        videoModal.classList.remove('is-open');
        videoFrame.src = '';
        document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (videoClose) videoClose.addEventListener('click', closeVideo);

    // Close modals on outside click
    [lightbox, videoModal].forEach((m) => {
        if (!m) return;
        m.addEventListener('click', (e) => {
            if (e.target === m) {
                if (m.id === 'lightbox') closeLightbox();
                if (m.id === 'videoModal') closeVideo();
            }
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        if (lightbox && lightbox.classList.contains('is-open')) closeLightbox();
        if (videoModal && videoModal.classList.contains('is-open')) closeVideo();
    });

    const galleryFilters = [
        { id: 'all', label: 'All' },
        { id: 'photo', label: 'Photos' },
        { id: 'video', label: 'Videos' }
    ];

    const renderGallery = (filter = 'all') => {
        if (!galleryGrid) return;
        const lang = state.lang;
        const dict = LANGS[lang].gallery;
        const items = filter === 'all' ? galleryItems : galleryItems.filter((x) => x.type === filter);
        galleryGrid.innerHTML = items.map((it) => {
            const label = lang === 'sw' ? it.labelSw : it.labelEn;
            return `
      <div class="gallery-item" data-reveal role="button" tabindex="0" aria-label="${dict.openGallery(label)}" data-kind="${it.type}" data-src="${it.img}" data-video="${it.videoId || ''}">
        <div class="gallery-badge">${it.type === 'video' ? dict.badgeVideo : dict.badgePhoto}</div>
        <img src="${it.img}" alt="${label}" loading="lazy" />
      </div>
    `;
        }).join('');

        // Attach handlers
        $$('.gallery-item', galleryGrid).forEach((el) => {
            const kind = el.getAttribute('data-kind');
            const src = el.getAttribute('data-src');
            const videoId = el.getAttribute('data-video');
            const open = () => {
                if (kind === 'video') openVideo(videoId);
                else openLightbox(src, el.querySelector('img')?.alt || 'Gallery preview');
            };
            el.addEventListener('click', open);
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') open();
            });
        });

        $$('[data-reveal]', galleryGrid).forEach((x) => revealObserver.observe(x));
    };

    if (galleryGrid && gallerySection) {
        // Inject filter buttons above gallery grid
        const updateGalleryFilters = (lang) => {
            const dict = LANGS[lang].gallery;
            const filters = [
                { id: 'all', label: dict.all },
                { id: 'photo', label: dict.photo },
                { id: 'video', label: dict.video }
            ];
            let filterWrap = $('.gallery-filters', gallerySection);
            if (!filterWrap) {
                filterWrap = document.createElement('div');
                filterWrap.className = 'gallery-filters';
                filterWrap.setAttribute('data-reveal', '');
                const header = $('.section-header', gallerySection);
                header ? header.insertAdjacentElement('afterend', filterWrap) : gallerySection.insertBefore(filterWrap, galleryGrid);
                revealObserver.observe(filterWrap);
            }
            const currentFilter = $('.filter-btn.is-active', filterWrap)?.getAttribute('data-filter') || 'all';
            filterWrap.innerHTML = filters.map((f) => `
        <button type="button" class="filter-btn ${f.id === currentFilter ? 'is-active' : ''}" data-filter="${f.id}">${f.label}</button>
      `).join('');

            // Re-attach events
            $$('.filter-btn', filterWrap).forEach((b) => {
                b.addEventListener('click', () => {
                    $$('.filter-btn', filterWrap).forEach((x) => x.classList.toggle('is-active', x === b));
                    renderGallery(b.getAttribute('data-filter'));
                });
            });
        };
        state.updateGalleryFilters = updateGalleryFilters;
        renderGallery('all');
    }

    /* --------------------------- Posts Rendering -------------------------- */
    const postsGrid = $('#postsGrid');
    const likeKeyPrefix = 'mfenesini_like_';
    const commentsKeyPrefix = 'mfenesini_comments_';

    const timeAgo = (iso, lang) => {
        const dict = LANGS[lang].posts;
        const dt = new Date(iso);
        const diff = Date.now() - dt.getTime();
        const mins = Math.floor(diff / 60000);
        const hrs = Math.floor(mins / 60);
        const days = Math.floor(hrs / 24);
        return dict.timeAgo(mins, hrs, days);
    };

    const getPostLikes = (postId) => {
        const v = localStorage.getItem(likeKeyPrefix + postId);
        return v ? Number(v) : 0;
    };

    const setPostLikes = (postId, likes) => {
        localStorage.setItem(likeKeyPrefix + postId, String(likes));
    };

    const getPostComments = (postId) => {
        const v = localStorage.getItem(commentsKeyPrefix + postId);
        try {
            return v ? JSON.parse(v) : [];
        } catch {
            return [];
        }
    };

    const setPostComments = (postId, comments) => {
        localStorage.setItem(commentsKeyPrefix + postId, JSON.stringify(comments));
    };

    const renderPosts = (lang) => {
        if (!postsGrid) return;
        const dict = LANGS[lang].posts;
        const data = LANGS[lang].postsData;

        postsGrid.innerHTML = posts.map((p, idx) => {
            const postId = `post_${idx}`;
            const likes = getPostLikes(postId);
            const comments = getPostComments(postId);

            return `
        <article class="post-card" data-reveal aria-label="Community update">
          <div class="post-media"><img src="${p.img}" alt="Post image" loading="lazy"/></div>
          <p class="post-desc">${data[idx].desc}</p>
          <div class="post-meta">
            <span>${timeAgo(p.ts, lang)}</span>
            <span>${likes} ${dict.likesLabel}</span>
          </div>

          <div class="post-actions">
            <button type="button" class="action-btn like-btn" data-post-id="${postId}">
              ❤️ ${dict.like}
            </button>
            <button type="button" class="action-btn comment-btn" data-post-id="${postId}">
              💬 ${dict.comment}
            </button>
          </div>

          <div class="comment-box" data-post-id="${postId}" hidden>
            <input class="comment-input" type="text" placeholder="${dict.commentPlaceholder}" maxlength="140" />
            <div class="comment-row">
              <button type="button" class="comment-save" data-post-id="${postId}">${dict.send}</button>
              <div class="field-error" data-comment-note="${postId}" style="min-height:1em;"></div>
            </div>
            <div class="comments-list" data-comments-list="${postId}">
              ${comments.length ? comments.map((c) => `
                <div class="comment-item">
                  <div class="c-meta">${c.name} · ${timeAgo(c.ts, lang)}</div>
                  <div class="c-text">${escapeHtml(c.text)}</div>
                </div>
              `).join('') : `<div class="comment-item" style="color:var(--muted2)">${dict.noComments}</div>`}
            </div>
          </div>
        </article>
      `;
        }).join('');

        $$('[data-reveal]', postsGrid).forEach((el) => revealObserver.observe(el));

        // Wire interactions
        $$('.like-btn', postsGrid).forEach((btn) => {
            btn.addEventListener('click', () => {
                const postId = btn.getAttribute('data-post-id');
                const card = btn.closest('.post-card');
                if (!card) return;

                const likesEl = card.querySelector('.post-meta span:last-child');

                let likes = getPostLikes(postId);
                likes += 1;
                setPostLikes(postId, likes);

                likesEl.textContent = `${likes} ${dict.likesLabel}`;
                btn.classList.add('is-pressed');
                setTimeout(() => btn.classList.remove('is-pressed'), 520);
            });
        });

        $$('.comment-btn', postsGrid).forEach((btn) => {
            btn.addEventListener('click', () => {
                const postId = btn.getAttribute('data-post-id');
                const card = btn.closest('.post-card');
                const box = card ? card.querySelector(`.comment-box[data-post-id="${postId}"]`) : null;
                if (box) {
                    box.hidden = !box.hidden;
                }
            });
        });

        $$('.comment-save', postsGrid).forEach((btn) => {
            btn.addEventListener('click', () => {
                const postId = btn.getAttribute('data-post-id');
                const card = btn.closest('.post-card');
                const commentBox = card ? card.querySelector(`.comment-box[data-post-id="${postId}"]`) : null;
                const realInput = commentBox ? $('.comment-input', commentBox) : null;

                if (!commentBox || !realInput) return;

                const note = commentBox.querySelector('[data-comment-note]');

                const text = realInput.value.trim();
                if (text.length < 2) {
                    if (note) note.textContent = dict.commentTooShort;
                    realInput.focus();
                    return;
                }
                if (note) note.textContent = '';

                const comments = getPostComments(postId);
                comments.push({
                    name: 'Guest',
                    text,
                    ts: new Date().toISOString()
                });
                setPostComments(postId, comments);

                // Re-render comments list only
                const list = card.querySelector(`[data-comments-list="${postId}"]`);
                if (list) {
                    list.innerHTML = comments.map((c) => `
            <div class="comment-item">
              <div class="c-meta">${c.name} · ${timeAgo(c.ts, lang)}</div>
              <div class="c-text">${escapeHtml(c.text)}</div>
            </div>
          `).join('');
                }

                realInput.value = '';
                if (note) {
                    note.textContent = dict.commentAdded;
                    setTimeout(() => (note.textContent = ''), 1200);
                }
            });
        });
    };

    // Simple HTML escape
    const escapeHtml = (s) => (s || '').replace(/[&<>"']/g, (c) => {
        const map = { '&': '&amp;', '<': '<', '>': '>', '"': '"', "'": '&#039;' };
        return map[c];
    });

    if (postsGrid) {
        renderPosts();
    }

    /* -------------------------- Back to Top Button ------------------------ */
    const backToTop = $('#backToTop');
    if (backToTop) {
        const onScroll = () => {
            backToTop.classList.toggle('is-visible', window.scrollY > 700);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    /* ------------------------- Contact Form UX -------------------------- */
    const contactForm = $('#contactForm');
    if (contactForm) {
        const nameInput = $('input[name="name"]', contactForm);
        const emailInput = $('input[name="email"]', contactForm);
        const messageInput = $('textarea[name="message"]', contactForm);
        const formNote = $('#formNote');

        const setFieldError = (fieldName, msg) => {
            const small = contactForm.querySelector(`[data-error-for="${fieldName}"]`);
            if (small) small.textContent = msg || '';
        };

        const validate = () => {
            const lang = state.lang;
            const dict = LANGS[lang].contact;
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            let ok = true;

            if (name.length < 2) { setFieldError('name', dict.nameLabel === 'Name' ? 'Please enter your name.' : 'Tafadhali weka jina lako.'); ok = false; }
            else setFieldError('name', '');

            const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!emailOk) { setFieldError('email', dict.emailLabel === 'Email' ? 'Please enter a valid email.' : 'Tafadhali weka barua pepe sahihi.'); ok = false; }
            else setFieldError('email', '');

            if (message.length < 10) { setFieldError('message', dict.messageLabel === 'Message' ? 'Message should be at least 10 characters.' : 'Ujumbe unapaswa kuwa na angalau herufi 10.'); ok = false; }
            else setFieldError('message', '');

            return ok;
        };

        const setLoading = (isLoading) => {
            const lang = state.lang;
            const dict = LANGS[lang].contact;
            const submitBtn = $('button[type="submit"]', contactForm);
            if (!submitBtn) return;
            submitBtn.disabled = isLoading;
            submitBtn.style.opacity = isLoading ? '0.7' : '1';
            submitBtn.textContent = isLoading ? dict.sending : dict.submitMessage;
            if (isLoading) submitBtn.style.cursor = 'progress';
            else submitBtn.style.cursor = 'pointer';
        };

        contactForm.addEventListener('submit', async (e) => {
            const lang = state.lang;
            const dict = LANGS[lang].contact;
            e.preventDefault();
            formNote.textContent = '';

            if (!validate()) {
                formNote.textContent = dict.validateFix;
                formNote.style.color = 'rgba(255,110,140,.95)';
                return;
            }

            setLoading(true);
            try {
                // Simulate send (no backend requested)
                await new Promise((r) => setTimeout(r, 900));
                formNote.textContent = dict.success;
                formNote.style.color = 'rgba(46,229,157,.95)';
                contactForm.reset();
            } catch {
                formNote.textContent = dict.error;
                formNote.style.color = 'rgba(255,110,140,.95)';
            } finally {
                setLoading(false);
                // Clear errors
                setFieldError('name', '');
                setFieldError('email', '');
                setFieldError('message', '');
            }
        });

        // Animated inputs (focus ring already in CSS; add subtle class)
        [nameInput, emailInput, messageInput].forEach((inp) => {
            if (!inp) return;
            inp.addEventListener('focus', () => inp.closest('label')?.classList.add('is-focused'));
            inp.addEventListener('blur', () => inp.closest('label')?.classList.remove('is-focused'));
        });
    }

    /* -------------------------- Chatbot Logic -------------------------- */
    const chatBtn = $('#chatBtn');
    const chatWindow = $('#chatWindow');
    const chatClose = $('#chatClose');
    const chatInput = $('#chatInput');
    const chatSend = $('#chatSend');
    const chatMessages = $('#chatMessages');
    const chatQuickQuestions = $('#chatQuickQuestions');

    if (chatBtn && chatWindow) {
        chatBtn.addEventListener('click', () => chatWindow.classList.toggle('is-open'));
        chatClose.addEventListener('click', () => chatWindow.classList.remove('is-open'));

        const addChatMessage = (text, type) => {
            const div = document.createElement('div');
            div.className = `msg ${type}`;
            div.textContent = text;
            chatMessages.appendChild(div);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const getBotResponse = (input) => {
            const msg = input.toLowerCase();
            const lang = state.lang;
            const res = LANGS[lang].chatResponses;

            if (msg.includes('mambo') || msg.includes('habari') || msg.includes('hello') || msg.includes('hi')) return res.hello;
            if (msg.includes('nani') || msg.includes('kuhusu') || msg.includes('about') || msg.includes('sisi')) return res.about;
            if (msg.includes('namba') || msg.includes('simu') || msg.includes('piga') || msg.includes('mawasiliano') || msg.includes('contact')) return res.contact;
            if (msg.includes('mahali') || msg.includes('location') || msg.includes('wapi') || msg.includes('place')) return res.location;
            if (msg.includes('shughuli') || msg.includes('kazi') || msg.includes('activities') || msg.includes('what do you do')) return res.activities;
            if (msg.includes('asante') || msg.includes('thanks') || msg.includes('thank you')) return res.thanks;

            return res.default;
        };

        const handleChat = (text) => {
            if (!text) return;

            addChatMessage(text, 'user');
            chatInput.value = '';

            // Bot delay
            setTimeout(() => {
                const response = getBotResponse(text);
                addChatMessage(response, 'bot');
            }, 600);
        };

        // Quick Question Buttons (Chat Inbox)
        if (chatQuickQuestions) {
            $$('.quick-question-btn', chatQuickQuestions).forEach((btn) => {
                btn.addEventListener('click', () => {
                    const questionType = btn.getAttribute('data-question');
                    const lang = state.lang;
                    const dict = LANGS[lang];

                    // Get the question text based on type
                    let questionText = '';
                    switch (questionType) {
                        case 'about':
                            questionText = questionType === 'about' ? (lang === 'sw' ? 'Nataka kujua kuhusu sisi' : 'Tell me about you') : '';
                            break;
                        case 'activities':
                            questionText = lang === 'sw' ? 'Je, mna shughuli gani?' : 'What activities do you have?';
                            break;
                        case 'contact':
                            questionText = lang === 'sw' ? 'Nawasiliana nawaje?' : 'How can I contact you?';
                            break;
                        case 'location':
                            questionText = lang === 'sw' ? 'Mko wapi?' : 'Where are you located?';
                            break;
                    }

                    // Add user question to chat
                    addChatMessage(questionText, 'user');

                    // Get and display bot response
                    setTimeout(() => {
                        const response = getBotResponse(questionText);
                        addChatMessage(response, 'bot');
                    }, 400);
                });
            });
        }

        chatSend.addEventListener('click', () => handleChat(chatInput.value));
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleChat(chatInput.value);
        });
    }
})();

