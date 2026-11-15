// Torah Academy, Halakha, Moussar et Business Academy - Chargement et affichage des cours et livres
document.addEventListener('DOMContentLoaded', async () => {
    const coursesGrid = document.getElementById('coursesGrid');
    const torahSearch = document.getElementById('torahSearch');
    const moussarGrid = document.getElementById('moussarGrid');
    const businessGrid = document.getElementById('businessGrid');
    const halakhaGrid = document.getElementById('halakhaGrid');

    let courses = [];
    let books = [];

    try {
        const cRes = await fetch('courses.json');
        courses = await cRes.json();
    } catch (e) { console.error(e); }

    try {
        const bRes = await fetch('books.json');
        books = await bRes.json();
    } catch (e) { console.error(e); }

    function renderCourses(filter = '') {
        if (!coursesGrid) return;
        coursesGrid.innerHTML = '';
        
        const filtered = courses.filter(c => 
            c.title.toLowerCase().includes(filter.toLowerCase()) ||
            c.author.toLowerCase().includes(filter.toLowerCase()) ||
            c.explanation.toLowerCase().includes(filter.toLowerCase())
        );

        if (filtered.length === 0) {
            coursesGrid.innerHTML = `<p style="color:var(--text-muted)">Aucun cours trouvé.</p>`;
            return;
        }

        filtered.forEach(c => {
            const card = document.createElement('div');
            card.className = 'card-item';
            card.innerHTML = `
                <span class="demo-badge" style="margin-bottom:8px; display:inline-block;">${c.category}</span>
                <h3>${c.title}</h3>
                <div class="card-meta">Auteur : <strong>${c.author}</strong> | Ouvrage : ${c.work}</div>
                <div class="card-content">${c.explanation}</div>
                <div class="card-source"><strong>Application :</strong> ${c.application}</div>
            `;
            coursesGrid.appendChild(card);
        });
    }

    function renderMoussar() {
        if (!moussarGrid) return;
        moussarGrid.innerHTML = '';
        const moussarItems = courses.filter(c => c.category === 'Moussar').concat([
            {
                title: "L'Humilité (Anava) selon le Moussar",
                author: "Or'hot Tsadikim",
                work: "Les Chemins des Justes",
                explanation: "L'humilité ne consiste pas à s'amoindrir, mais à situer sa valeur par rapport à l'infini divin tout en reconnaissant les talents reçus pour accomplir sa mission.",
                application: "Écouter son prochain avec attention sans chercher à avoir le dernier mot."
            }
        ]);

        moussarItems.forEach(m => {
            const card = document.createElement('div');
            card.className = 'card-item';
            card.innerHTML = `
                <h3>${m.title}</h3>
                <div class="card-meta">Source : ${m.author} (${m.work})</div>
                <div class="card-content">${m.explanation}</div>
                <div class="card-source"><strong>Action concrète :</strong> ${m.application}</div>
            `;
            moussarGrid.appendChild(card);
        });
    }

    function renderBusiness() {
        if (!businessGrid) return;
        businessGrid.innerHTML = '';
        books.filter(b => b.category === 'Business Academy').forEach(b => {
            const card = document.createElement('div');
            card.className = 'card-item';
            card.innerHTML = `
                <h3>${b.title}</h3>
                <div class="card-meta">Auteur : ${b.author}</div>
                <div class="card-content">${b.summary}</div>
                <div class="card-source"><strong>Application professionnelle :</strong> ${b.application}</div>
            `;
            businessGrid.appendChild(card);
        });
    }

    function renderHalakha() {
        if (!halakhaGrid) return;
        const halakhot = [
            { title: "Chabbat", desc: "Repos sanctifié, arrêt des 39 catégories de travaux, union spirituelle familiale." },
            { title: "Cacherout", desc: "Attention portée à la pureté de la nourriture et à l'élévation des actes matériels." },
            { title: "Tefila (Prière)", desc: "Rendez-vous quotidien de trois fois par jour avec le Créateur (Chemona Essre)." },
            { title: "Chémirat Halachon", desc: "Maîtrise de la parole, refus de la médisance (Lachon Hara)." }
        ];

        halakhaGrid.innerHTML = '';
        halakhot.forEach(h => {
            const card = document.createElement('div');
            card.className = 'card-item';
            card.innerHTML = `
                <h3>${h.title}</h3>
                <div class="card-content">${h.desc}</div>
                <div class="card-source">Consultez toujours un Rav pour toute question pratique.</div>
            `;
            halakhaGrid.appendChild(card);
        });
    }

    if (torahSearch) {
        torahSearch.addEventListener('input', (e) => {
            renderCourses(e.target.value);
        });
    }

    renderCourses();
    renderMoussar();
    renderBusiness();
    renderHalakha();
});
