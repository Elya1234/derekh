const App = {
    init() {
        const navLinks = document.querySelectorAll('.nav-link');
        const container = document.getElementById('viewContainer');
        const sidebar = document.getElementById('sidebar');
        const mobileToggle = document.getElementById('mobileToggle');
        const mobileClose = document.getElementById('mobileClose');

        const views = {
            'home': (c) => c.innerHTML = `
                <div class="card" style="text-align: center; padding: 50px; background: linear-gradient(135deg, var(--bg-surface), var(--leather-brown));">
                    <h1 style="font-family: var(--font-serif); font-size: 3rem; color: var(--gold); margin-bottom: 15px;">DEREKH — דֶּרֶךְ</h1>
                    <p style="font-style: italic; color: var(--gold); margin-bottom: 25px;">« La Torah comme fondation. La discipline comme méthode. La réussite comme responsabilité. »</p>
                    <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto 30px auto; line-height: 1.6;">
                        Plateforme internationale d'étude de la Torah, d'approfondissement de la Halakha et de développement personnel.
                    </p>
                    <button class="btn btn-primary" onclick="App.navigate('assistant')">Ouvrir l'Assistant IA</button>
                </div>
            `,
            'assistant': (c) => AssistantModule.render(c),
            'library': (c) => LibraryModule.render(c),
            'reader': (c) => ReaderModule.render(c),
            'rabbanim': (c) => RabbanimModule.render(c),
            'dashboard': (c) => DashboardModule.render(c),
            'habits': (c) => c.innerHTML = `<h2>Maîtrise de Soi & Numérique</h2><p class="card" style="margin-top:20px;">Outils de réduction du temps d'écran et journal des habitudes.</p>`
        };

        this.navigate = (viewName) => {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`[data-view="${viewName}"]`);
            if(active) active.classList.add('active');
            
            if(views[viewName]) {
                views[viewName](container);
            }
            sidebar.classList.remove('open');
            window.location.hash = viewName;
        };

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const view = link.getAttribute('data-view');
                this.navigate(view);
            });
        });

        mobileToggle.addEventListener('click', () => sidebar.classList.add('open'));
        mobileClose.addEventListener('click', () => sidebar.classList.remove('open'));

        const initialHash = window.location.hash.substring(1) || 'home';
        this.navigate(views[initialHash] ? initialHash : 'home');

        // Chronomètre session
        let secs = 0;
        setInterval(() => {
            secs++;
            const m = String(Math.floor(secs / 60)).padStart(2, '0');
            const s = String(secs % 60).padStart(2, '0');
            const t = document.getElementById('timer');
            if(t) t.textContent = `${m}:${s}`;
        }, 1000);
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
