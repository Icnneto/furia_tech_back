import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPEN_AI;

export async function AIAnalysis(userData, XData) {
    console.log('Chamando IA para análise...');

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: 'Você é um verificador de perfis alinhados ao mundo de Esports.'
                },
                {
                    role: 'user',
                    content: `
                        Você é um especialista em análise de perfis para o ecossistema de eSports. Sua tarefa é avaliar o grau de compatibilidade de um perfil com iniciativas voltadas ao público de eSports, especialmente com foco na marca FURIA, levando em conta seus valores, linguagem e interesses.  
                        Com base nas seguintes informações fornecidas:
                        - Eventos: ${JSON.stringify(userData.eventos)}  
                        - Interesses: ${JSON.stringify(userData.interesses)}  
                        - Bio: ${XData.bio}  
                        - Posts: ${JSON.stringify(XData.posts)}
                        
                        Analise esse perfil e forneça uma resposta **exclusivamente** no seguinte formato JSON:
                        {
                            "relevante_para_informativos": number(de 0 a 100),
                            "relevante_para_eventos": number(de 0 a 100),
                            "sinergia_com_furia": number(de 0 a 100),
                            "overview": "string (resumo textual de até 3 frases explicando a percepção geral sobre o perfil)"
                        }
                        
                        - relevante_para_informativos: grau em que o perfil parece interessado em conteúdos informativos relacionados a eSports (ex: notícias, atualizações de campeonatos, bastidores).
                        - relevante_para_eventos: grau em que o perfil demonstra interesse ou participação em eventos relacionados ao universo gamer ou de eSports.
                        - sinergia_com_furia: nível de afinidade com os valores e estilo da FURIA (ex: linguagem jovem, espírito competitivo, conexão com cultura urbana, autenticidade).
                        - overview: um resumo da análise geral do perfil com base nos dados fornecidos.
                        
                        Seja objetivo, não adicione comentários fora do JSON e não explique sua análise fora do campo overview.
                        Use somente os dados fornecidos, sem suposições externas.
                    `
                }
            ]
        })
    });

    const json = await openaiRes.json();
    const mensagem = json.choices?.[0]?.message?.content || 'Não foi possível validar o documento.';


    try {
        const jsonLimpo = limparBlocoMarkdown(mensagem);
        const resultado = JSON.parse(jsonLimpo);
        return resultado;
    } catch {
        console.error('Erro ao fazer parse do JSON:', mensagem);
        return { erro: 'Resposta não é um JSON válido.', mensagemOriginal: mensagem };
    }
};


function limparBlocoMarkdown(resposta) {
    return resposta
        .replace(/```json\n?/i, '')
        .replace(/```$/, '')
        .trim();
}