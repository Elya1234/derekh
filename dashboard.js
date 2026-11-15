const DashboardModule = {
    render(container) {
        container.innerHTML = `
            <h2>Mon Parcours Quotidien</h2>
            <div class="card" style="margin-top: 20px;">
                <h3 style="font-family: var(--font-serif); color: var(--gold);">Engagements du jour</h3>
                <ul style="list-style: none; margin-top: 15px; display: flex; flex-direction: column; gap: 10px;">
                    <li><label><input type="checkbox"> Étude quotidienne de Torah (15 min)</label></li>
                    <li><label><input type="checkbox"> Lecture de Moussar (5 min)</label></li>
                    <li><label><input type="checkbox"> Téléphone éloigné pendant les repas</label></li>
                </ul>
            </div>
        `;
    }
};
