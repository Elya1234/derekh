// Gestionnaire du stockage local (LocalStorage)
const StorageManager = {
    get(key, defaultValue) {
        try {
            const val = localStorage.getItem('derekh_' + key);
            return val !== null ? JSON.parse(val) : defaultValue;
        } catch (e) {
            console.error("Erreur de lecture Storage", e);
            return defaultValue;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem('derekh_' + key, JSON.stringify(value));
        } catch (e) {
            console.error("Erreur d'écriture Storage", e);
        }
    }
};
