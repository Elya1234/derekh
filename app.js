const App = {
    init() {
        this.bindNavigation();
        Library.init();
        Rabbanim.init();
        Dashboard.init();
    },

    bindNavigation() {
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.view-section').forEach(s => s.classList.remove('active'));
                
                btn.classList.add('active');
                const viewId = `view-${btn.getAttribute('data-view')}`;
                document.getElementById(viewId)?.classList.add('active');
            });
        });
    },

    openReader(ref) {
        Reader.loadText(ref);
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
