const Rabbanim = {
    init() {
        const grid = document.getElementById('rabbanim-grid');
        if (!grid) return;
        grid.innerHTML = DerekhData.rabbanim.map(r => `
            <div class="card">
                <h3>${r.name}</h3>
                <p style="color: var(--gold-primary); font-size: 0.9rem; margin-bottom: 0.5rem;">${r.role}</p>
                <p>${r.bio}</p>
            </div>
        `).join('');
    }
};
