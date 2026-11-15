// Maîtrise de soi & Anti-addiction - Gestion locale des temps d'écran et des déclencheurs
document.addEventListener('DOMContentLoaded', () => {
    const screenTimeInput = document.getElementById('screenTimeInput');
    const saveScreenTimeBtn = document.getElementById('saveScreenTimeBtn');
    const screenTimeDisplay = document.getElementById('screenTimeDisplay');
    const triggerInput = document.getElementById('triggerInput');
    const saveTriggerBtn = document.getElementById('saveTriggerBtn');
    const triggerList = document.getElementById('triggerList');

    let screenTime = StorageManager.get('screen_time', 0);
    let triggers = StorageManager.get('triggers', []);

    function updateScreenTimeDisplay() {
        if (screenTimeDisplay) {
            screenTimeDisplay.textContent = `${screenTime} min`;
        }
    }

    function renderTriggers() {
        if (!triggerList) return;
        triggerList.innerHTML = '';
        triggers.forEach(t => {
            const li = document.createElement('li');
            li.textContent = t;
            triggerList.appendChild(li);
        });
    }

    if (saveScreenTimeBtn) {
        saveScreenTimeBtn.addEventListener('click', () => {
            const val = parseInt(screenTimeInput.value);
            if (!isNaN(val) && val >= 0) {
                screenTime = val;
                StorageManager.set('screen_time', screenTime);
                updateScreenTimeDisplay();
                alert('Temps d’écran mis à jour avec succès.');
                screenTimeInput.value = '';
            }
        });
    }

    if (saveTriggerBtn) {
        saveTriggerBtn.addEventListener('click', () => {
            const text = triggerInput.value.trim();
            if (text) {
                triggers.unshift(text);
                StorageManager.set('triggers', triggers);
                renderTriggers();
                triggerInput.value = '';
            }
        });
    }

    updateScreenTimeDisplay();
    renderTriggers();

    let secondsElapsed = 0;
    const timerDisplay = document.getElementById('timerDisplay');
    setInterval(() => {
        secondsElapsed++;
        const mins = Math.floor(secondsElapsed / 60).toString().padStart(2, '0');
        const secs = (secondsElapsed % 60).toString().padStart(2, '0');
        if (timerDisplay) {
            timerDisplay.textContent = `${mins}:${secs}`;
        }
    }, 1000);
});
