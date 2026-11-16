const Assistant = {
    async send() {
        const input = document.getElementById('chat-input');
        const history = document.getElementById('chat-history');
        const query = input.value.trim();
        if (!query) return;

        history.innerHTML += `<div class="chat-message user">${query}</div>`;
        input.value = '';
        history.scrollTop = history.scrollHeight;

        // Réponse structurée basée sur l'analyse documentaire RAG simulée
        setTimeout(() => {
            let reply = `Analyse DEREKH pour : "${query}". `;
            if (query.toLowerCase().includes('shabbat') || query.toLowerCase().includes('choulhan aroupkh')) {
                reply += `Selon le Shulchan Arukh (Ora'h 'Haïm), la préparation de Shabbat commence dès la veille (vendredi matin) en honneur du Shabbat, conformément à l'injonction de préparer la table et de s'avancer pour honorer la sainteté du jour.`;
            } else {
                reply += `J'ai interrogé les sources documentaires de référence connectées à Sefaria. Pour toute question décisionnelle pratique, veuillez consulter un rabbin qualifié ou vous référer directement aux décisionnaires (Poskim).`;
            }
            history.innerHTML += `<div class="chat-message system">${reply}</div>`;
            history.scrollTop = history.scrollHeight;
        }, 600);
    }
};
