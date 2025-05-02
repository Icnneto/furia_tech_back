class XScrapedData {
    constructor({
        bio,
        posts_conteudo = []
    }) {
        this.bio = bio;
        this.posts_conteudo = Array.isArray(posts_conteudo) ? posts_conteudo : []
    }
};

export default XScrapedData;