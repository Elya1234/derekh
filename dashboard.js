// Tableau de bord personnel ("Mon parcours") - Checklist interactive et stockage LocalStorage
document.addEventListener('DOMContentLoaded', () => {
    const dailyChecklist = document.getElementById('dailyChecklist');
    const progressCount = document.getElementById('progressCount');
    const totalTasksCount = document.getElementById('totalTasksCount');
    const dailyProgressBar = document.getElementById('dailyProgressBar');

    const defaultTasks = [
        { id: 't1', label: 'Étude quotidienne de Torah (15 min)', category: 'Torah' },
        { id: 't2', label: 'Prières quotidiennes (Tefila)', category: 'Halakha' },
        { id: 't3', label: 'Lecture et étude de Moussar (5 min)', category: 'Moussar' },
        { id: 't4', label: 'Téléphone éteint pendant les repas', category: 'Maîtrise de soi' },
        { id: 't5', label: 'Activité professionnelle concentrée (Deep Work)', category: 'Business' },
        { id: 't6', label: 'Temps de qualité en famille', category: 'Famille' },
        { id: 't7', label: 'Exercice physique / Santé', category: 'Santé' },
        { id: 't8', label: 'Acte de Hessed (bienveillance envers autrui)', category: 'Mitsvot' }
    ];

    if (totalTasksCount) totalTasksCount.textContent = defaultTasks.length;

    let savedState = StorageManager.get('daily_tasks_state', {});

    function renderChecklist() {
        if (!dailyChecklist) return;
        dailyChecklist.innerHTML = '';
        let completedCount = 0;

        defaultTasks.forEach(task => {
            const isChecked = savedState[task.id] || false;
            if (isChecked) completedCount++;

            const item = document.createElement('label');
            item.className = 'checklist-item';
            item.innerHTML = `
                <input type="checkbox" data-id="${task.id}" ${isChecked ? 'checked' : ''}>
                <span>${task.label}</span>
            `;

            const checkbox = item.querySelector('input');
            checkbox.addEventListener('change', (e) => {
                savedState[task.id] = e.target.checked;
                StorageManager.set('daily_tasks_state', savedState);
                updateProgress();
            });

            dailyChecklist.appendChild(item);
        });

        if (progressCount) progressCount.textContent = completedCount;
        if (dailyProgressBar) {
            const pct = (completedCount / defaultTasks.length) * 100;
            dailyProgressBar.style.width = `${pct}%`;
        }
    }

    function updateProgress() {
        let completedCount = Object.values(savedState).filter(Boolean).length;
        if (progressCount) progressCount.textContent = completedCount;
        if (dailyProgressBar) {
            const pct = (completedCount / defaultTasks.length) * 100;
            dailyProgressBar.style.width = `${pct}%`;
        }
    }

    renderChecklist();
});
