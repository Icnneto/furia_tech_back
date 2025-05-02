class XScrapedData {
    constructor({
        num_seguindo,
        num_posts,
        bio,
        posts_conteudo = []
    }) {
        this.num_seguindo = num_seguindo;
        this.num_posts = num_posts;
        this.bio = bio;
        this.posts_conteudo = Array.isArray(posts_conteudo) ? posts_conteudo : []
    }
};

export default XScrapedData;