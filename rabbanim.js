const RabbanimModule = {
    render(container) {
        container.innerHTML = `
            <h2>Rabbanim et Enseignements</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; margin-top: 20px;">
                ${AppData.rabbanim.map(r => `
                    <div class="card">
                        <h3 style="font-family: var(--font-serif); color: var(--gold);">${r.name}</h3>
                        <p style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 10px;">${r.role}</p>
                        <p style="font-size: 0.9rem;">${r.desc}</p>
                    </div>
                `).join('')}
            </div>
        `;
    }
};
