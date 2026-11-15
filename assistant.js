const AssistantModule = {
    render(container) {
        container.innerHTML = `
            <div class="card" style="height: 70vh; display: flex; flex-direction: column;">
                <h2 style="color: var(--gold); font-family: var(--font-serif); margin-bottom: 15px;">Assistant IA DEREKH (Mode Démonstration)</h2>
                <div id="chatBox" style="flex: 1; overflow-y: auto; background: var(--bg-deep); padding: 15px; border-radius: 6px; margin-bottom: 15px; display: flex; flex-direction: column; gap: 10px;">
                    <div style="background: var(--bg-surface); padding: 12px; border-radius: 6px; border-left: 3px solid var(--gold);">
                        Shalom. Posez vos questions sur la Torah, le Moussar ou l'organisation personnelle.
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="chatInput" placeholder="Posez votre question..." style="flex:1; background:var(--bg-deep); border:1px solid var(--border-color); padding:12px; color:var(--ivory); border-radius:4px;">
                    <button id="chatSend" class="btn btn-primary">Envoyer</button>
                </div>
            </div>
        `;

        const input = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSend');
        const box = document.getElementById('chatBox');

        const send = () => {
            const txt = input.value.trim();
            if(!txt) return;
            box.innerHTML += `<div style="background: var(--leather-brown); padding: 10px; border-radius: 6px; align-self: flex-end;">${txt}</div>`;
            input.value = '';
            setTimeout(() => {
                let ans = AppData.demoQA[txt] || "C'est une question importante. Notre base de textes vérifiés et nos maîtres enseignent la constance et la rigueur.";
                box.innerHTML += `<div style="background: var(--bg-surface); padding: 10px; border-radius: 6px; border-left: 3px solid var(--gold);">${ans}</div>`;
                box.scrollTop = box.scrollHeight;
            }, 400);
        };

        sendBtn.addEventListener('click', send);
        input.addEventListener('keypress', e => { if(e.key === 'Enter') send(); });
    }
};
