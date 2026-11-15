const LibraryModule = {
    render(container) {
        container.innerHTML = `
            <h2>Bibliothèque Numérique DEREKH</h2>
            <p style="color: var(--text-muted); margin: 10px 0 20px 0;">Ouvrages authentifiés et vérifiés.</p>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px;">
                ${AppData.books.map(b => `
                    <div class="card">
                        <span class="badge" style="color:var(--gold); font-size:0.8rem;">${b.category}</span>
                        <h3 style="font-family:var(--font-serif); color:var(--gold); margin: 8px 0;">${b.title}</h3>
                        <p style="font-size:0.9rem; color:var(--text-muted);">Auteur : ${b.author}</p>
                        <p style="font-size:0.9rem; margin-top:10px;">${b.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
};
