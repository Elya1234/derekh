// Module d'étude textuelle interactive du Moussar
document.addEventListener('DOMContentLoaded', async () => {
    const studyContainer = document.getElementById('moussarStudyContainer');
    if (!studyContainer) return;

    let texts = [];

    try {
        const res = await fetch('moussar-texts.json');
        texts = await res.json();
    } catch (e) {
        console.error("Erreur de chargement des textes de Moussar", e);
        studyContainer.innerHTML = `<p style="color:var(--text-muted)">Impossible de charger les textes de Moussar pour le moment.</p>`;
        return;
    }

    function renderStudyModule() {
        studyContainer.innerHTML = `
            <div class="study-layout">
                <div class="study-sidebar-list">
                    <h3>Textes Disponibles</h3>
                    <div class="study-list-items">
                        ${texts.map((t, index) => `
                            <button class="study-nav-btn ${index === 0 ? 'active' : ''}" data-id="${t.id}">
                                <strong>${t.title}</strong>
                                <span class="study-nav-author">${t.author}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                <div class="study-main-panel" id="studyMainPanel">
                    <!-- Rempli dynamiquement -->
                </div>
            </div>
        `;

        const navBtns = studyContainer.querySelectorAll('.study-nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                displayStudyText(btn.getAttribute('data-id'));
            });
        });

        if (texts.length > 0) {
            displayStudyText(texts[0].id);
        }
    }

    function displayStudyText(id) {
        const panel = document.getElementById('studyMainPanel');
        const item = texts.find(t => t.id === id);
        if (!item || !panel) return;

        panel.innerHTML = `
            <div class="study-card-content">
                <div class="study-header-meta">
                    <span class="demo-badge">${item.work}</span>
                    <span class="study-tradition">Tradition : ${item.tradition}</span>
                </div>
                <h2>${item.title}</h2>
                <p class="study-chapter-ref">${item.chapter} — Auteur : <strong>${item.author}</strong></p>

                <div class="text-comparison-box">
                    <div class="text-block hebrew-text" dir="rtl">
                        <span class="text-label">Texte Original (Hébreu)</span>
                        <p>${item.he_text}</p>
                    </div>
                    <div class="text-block french-text">
                        <span class="text-label">Traduction & Analyse Rigoureuse</span>
                        <p><strong>Traduction :</strong> ${item.fr_text}</p>
                    </div>
                </div>

                <div class="analysis-section">
                    <h4>💡 Analyse et Explication</h4>
                    <p>${item.analysis}</p>
                </div>

                <div class="action-section">
                    <h4>🎯 Application Concrète (Avoda)</h4>
                    <p>${item.practical_application}</p>
                    <button class="btn btn-primary" id="markStudiedBtn" style="margin-top: 15px;">Marquer comme étudié aujourd'hui</button>
                </div>

                <div class="source-validation-footer">
                    <small><strong>Validation documentaire :</strong> ${item.validation_level} | Licence : ${item.license}</small>
                </div>
            </div>
        `;

        const markBtn = document.getElementById('markStudiedBtn');
        markBtn.addEventListener('click', () => {
            markBtn.textContent = "✓ Étudié avec succès (Bravo !)";
            markBtn.style.backgroundColor = "#2e7d32";
            markBtn.disabled = true;
            let completedMoussar = StorageManager.get('moussar_completed', {});
            completedMoussar[item.id] = true;
            StorageManager.set('moussar_completed', completedMoussar);
        });
    }

    renderStudyModule();
});
