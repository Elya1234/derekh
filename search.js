const SearchModule = {
    search(query) {
        const q = query.toLowerCase();
        const results = AppData.books.filter(b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q));
        return results;
    }
};
