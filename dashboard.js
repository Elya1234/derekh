const Dashboard = {
    init() {
        this.updateLastRead();
    },
    updateLastRead() {
        const container = document.getElementById('last-read-container');
        if (!container) return;
        const lastRead = JSON.parse(localStorage.getItem('derekh_last_read'));
        if (lastRead) {
            container.innerHTML = `
                <p><strong>${lastRead.title}</strong></p>
                <p style="font-size: 0.85rem; color: var(--text-muted);">Référence : ${lastRead.ref}</p>
                <button class="btn-primary" onclick="Reader.loadText('${lastRead.ref}')">Reprendre</button>
            `;
        }
    }
};
