const ReaderModule = {
    render(container) {
        container.innerHTML = `
            <div class="card">
                <h2 style="font-family: var(--font-serif); color: var(--gold); margin-bottom: 15px;">Lecteur de Textes — Bereshit Chapitre 1</h2>
                <div style="font-family: var(--font-serif); font-size: 1.5rem; line-height: 2; margin-bottom: 20px; direction: rtl; text-align: right;">
                    בְּרֵאשִׁית בָּרָא אֱלֹהִים אֵת הַשָּׁמַיִם וְאֵת הָאָרֶץ׃
                </div>
                <p style="line-height: 1.6; color: var(--text-muted);">
                    <strong>Traduction & Rachi :</strong> Au commencement, D.ieu créa le ciel et la terre...
                </p>
            </div>
        `;
    }
};
