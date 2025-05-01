// receber dados do front
// chamar scraper
// chamar IA para analisar o perfil
// enviar dados para o mongoDB

export async function formData(req, res) {
    const { nome, nascimento, email, cpf, pais, estado, interesses, eventos, perfil_x, documento } = req.body

    console.log('nome:', nome);
    console.log('nascimento:', nascimento);
    console.log('email:', email);
    console.log('cpf:', cpf);
    console.log('pais:', pais);
    console.log('estado:', estado);
    console.log('interesses:', interesses);
    console.log('eventos:', eventos);
    console.log('perfil_x:', perfil_x);
    console.log('documento:', documento);

    res.status(201).json({message: 'sucesso'});;
};


