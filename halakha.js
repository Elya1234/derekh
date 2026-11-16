const HalakhaViewer = {
    async loadPart(partName) {
        const area = document.getElementById('halakha-content-area');
        area.innerHTML = `<p>Chargement des Simanim pour ${partName}...</p>`;

        try {
            // Test de l'API Sefaria sur Shulchan Arukh Orach Chaim Siman 1
            const ref = `Shulchan_Arukh,_Orach_Chaim.1`;
            const res = await fetch(`https://www.sefaria.org/api/texts/${ref}`);
            if (!res.ok) throw new Error("Référence Halakhique non trouvée.");
            const data = await res.json();

            area.innerHTML = `
                <h3>${data.book || partName} - Siman 1</h3>
                <div class="hebrew-text">${Array.isArray(data.he) ? data.he.join('<br>') : data.he}</div>
                <hr style="margin: 1rem 0; border-color: var(--border-color);">
                <div>${Array.isArray(data.text) ? data.text.join('<br>') : data.text}</div>
                <button class="btn-primary" onclick="Reader.loadText('${ref}')">Ouvrir dans le Lecteur Universel</button>
            `;
        } catch (e) {
            area.innerHTML = `<p style="color: #ff6b6b;">Erreur de chargement de la Halakha : ${e.message}</p>`;
        }
    }
};
