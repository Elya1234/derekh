// Assistant IA DEREKH - Moteur de démonstration interactif basé sur demo-responses.json
document.addEventListener('DOMContentLoaded', async () => {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');
    const clearChatBtn = document.getElementById('clearChatBtn');
    const suggestions = document.querySelectorAll('.suggestion-chip');

    let demoData = null;

    try {
        const response = await fetch('demo-responses.json');
        demoData = await response.json();
    } catch (e) {
        console.error("Impossible de charger demo-responses.json", e);
    }

    function appendMessage(sender, text, sourceText, category) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender === 'user' ? 'user-message' : 'assistant-message'}`;
        
        let contentHtml = `<div class="message-sender">${sender === 'user' ? 'Vous' : 'Assistant DEREKH'}</div>`;
        contentHtml += `<div class="message-content">${text}</div>`;

        if (sourceText) {
            contentHtml += `
                <div class="source-box">
                    <span class="source-tag">Source & Catégorie : ${category || 'Vérifié'}</span>
                    <p>${sourceText}</p>
                </div>
            `;
        }

        msgDiv.innerHTML = contentHtml;
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function handleUserQuery(queryText) {
        if (!queryText.trim()) return;

        appendMessage('user', queryText);
        chatInput.value = '';

        // Simuler une réponse de l'assistant après un court délai
        setTimeout(() => {
            let responseObj = {
                response: "C'est une excellente question. Dans le cadre de ce prototype de démonstration DEREKH, cette requête spécifique n'a pas de réponse pré-enregistrée, mais notre architecture RAG finale interrogera directement la bibliothèque documentaire validée par les Rabbanim.",
                source: "Base de démonstration DEREKH v1.0",
                category: "Général"
            };

            if (demoData && demoData.queries[queryText]) {
                responseObj = demoData.queries[queryText];
            } else {
                // Recherche partielle
                for (let key in demoData.queries) {
                    if (queryText.toLowerCase().includes(key.toLowerCase().substring(0, 10))) {
                        responseObj = demoData.queries[key];
                        break;
                    }
                }
            }

            appendMessage('assistant', responseObj.response, responseObj.source, responseObj.category);
        }, 500);
    }

    sendChatBtn.addEventListener('click', () => {
        handleUserQuery(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserQuery(chatInput.value);
        }
    });

    suggestions.forEach(chip => {
        chip.addEventListener('click', () => {
            const query = chip.getAttribute('data-query');
            handleUserQuery(query);
        });
    });

    clearChatBtn.addEventListener('click', () => {
        chatMessages.innerHTML = `
            <div class="message assistant-message">
                <div class="message-sender">Assistant DEREKH</div>
                <div class="message-content">Conversation réinitialisée. Comment puis-je vous aider ?</div>
                <div class="source-box">
                    <span class="source-tag">Source institutionnelle</span>
                    <p>Principes fondateurs de DEREKH v1.0</p>
                </div>
            </div>
        `;
    });
});
