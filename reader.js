const Reader = {
    currentRef: '',
    bilingual: true,
    fontSize: 1.2,

    async loadText(ref) {
        this.currentRef = ref;
        const modal = document.getElementById('universal-reader-modal');
        const container = document.getElementById('reader-text-container');
        const titleDisplay = document.getElementById('reader-title-display');
        
        modal.classList.remove('hidden');
        titleDisplay.innerText = `Consultation : ${ref}`;
        container.innerHTML = `<p>Interrogation de l'API Sefaria pour ${ref}...</p>`;

        try {
            const response = await fetch(`https://www.sefaria.org/api/texts/${ref}`);
            if (!response.ok) throw new Error("Erreur réseau ou référence introuvable sur Sefaria.");
            const data = await response.json();

            let htmlContent = '';
            const hebrewText = Array.isArray(data.he) ? data.he.join('<br>') : (data.he || "Texte hébreu non disponible.");
            const englishOrFrenchText = Array.isArray(data.text) ? data.text.join('<br>') : (data.text || "Traduction non disponible.");

            htmlContent += `<div class="hebrew-text" style="font-size: ${this.fontSize}rem;">${hebrewText}</div>`;
            if (this.bilingual) {
                htmlContent += `<div class="translation-text" style="font-size: ${this.fontSize}rem; border-top: 1px solid var(--border-color); padding-top: 1rem; margin-top: 1rem;">${englishOrFrenchText}</div>`;
            }

            container.innerHTML = htmlContent;
            
            // Sauvegarde dans localStorage pour le Dashboard
            localStorage.setItem('derekh_last_read', JSON.stringify({ ref, title: data.book || ref, time: new Date().toISOString() }));
            Dashboard.updateLastRead();

        } catch (error) {
            container.innerHTML = `<p style="color: #ff6b6b;">Impossible de charger le texte depuis l'API Sefaria (${error.message}). Vérifiez votre connexion internet ou la validité de la référence officielle.</p>`;
        }
    },

    toggleBilingual() {
        this.bilingual = !this.bilingual;
        if (this.currentRef) this.loadText(this.currentRef);
    },

    adjustFont(delta) {
        this.fontSize = Math.max(0.9, Math.min(2.0, this.fontSize + delta * 0.1));
        if (this.currentRef) this.loadText(this.currentRef);
    },

    close() {
        document.getElementById('universal-reader-modal').classList.add('hidden');
    }
};
