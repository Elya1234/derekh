// Navigation et gestion des sections, mobile menu, et internationalisation FR/HE
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const headerTitle = document.getElementById('headerTitle');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileCloseBtn = document.getElementById('mobileCloseBtn');
    const sidebar = document.getElementById('sidebar');
    const langToggle = document.getElementById('langToggle');

    let currentLang = StorageManager.get('lang', 'fr');

    function switchSection(targetId) {
        sections.forEach(sec => sec.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetSec = document.getElementById(targetId);
        const targetLink = document.querySelector(`.nav-link[data-section="${targetId}"]`);

        if (targetSec) targetSec.classList.add('active');
        if (targetLink) {
            targetLink.classList.add('active');
            const label = targetLink.querySelector(`.nav-label-${currentLang}`).textContent;
            headerTitle.textContent = label;
        }

        // Fermer le menu mobile si ouvert
        sidebar.classList.remove('open');
        window.scrollTo(0, 0);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.getAttribute('data-section');
            switchSection(section);
            window.location.hash = section;
        });
    });

    // Boutons CTA de la page d'accueil
    document.querySelectorAll('.hero-cta .btn, .btn[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            if (target) switchSection(target);
        });
    });

    // Gestion mobile
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => sidebar.classList.add('open'));
    }
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', () => sidebar.classList.remove('open'));
    }

    // Gestion de la langue FR / HE
    function updateLanguage(lang) {
        currentLang = lang;
        StorageManager.set('lang', lang);
        document.documentElement.setAttribute('lang', lang);
        if (lang === 'he') {
            document.documentElement.setAttribute('dir', 'rtl');
            langToggle.textContent = 'FR / עב';
        } else {
            document.documentElement.setAttribute('dir', 'ltr');
            langToggle.textContent = 'עב / FR';
        }

        document.querySelectorAll('.nav-label-fr').forEach(el => {
            el.style.display = lang === 'fr' ? 'inline' : 'none';
        });
        document.querySelectorAll('.nav-label-he').forEach(el => {
            el.style.display = lang === 'he' ? 'inline' : 'none';
        });

        // Mettre à jour le titre du header
        const activeLink = document.querySelector('.nav-link.active');
        if (activeLink) {
            headerTitle.textContent = activeLink.querySelector(`.nav-label-${lang}`).textContent;
        }
    }

    langToggle.addEventListener('click', () => {
        updateLanguage(currentLang === 'fr' ? 'he' : 'fr');
    });

    updateLanguage(currentLang);

    // Routage initial par hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        switchSection(initialHash);
    }
});
