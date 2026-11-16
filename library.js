const Library = {
    init() {
        this.renderCatalog(DerekhData.catalog);
        document.getElementById('lib-search-input')?.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = DerekhData.catalog.filter(item => item.title.toLowerCase().includes(query) || item.category.toLowerCase().includes(query));
            this.renderCatalog(filtered);
        });
    },

    renderCatalog(items) {
        const grid = document.getElementById('catalog-grid');
        if (!grid) return;
        grid.innerHTML = items.map(item => `
            <div class="card">
                <span class="badge">${item.category}</span>
                <h3>${item.title}</h3>
                <p>Auteur : ${item.author}</p>
                <button class="btn-primary" onclick="Reader.loadText('${item.sefariaRef}')">Consulter</button>
            </div>
        `).join('');
    }
};
