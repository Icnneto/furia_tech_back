import UserData from "../../classes/userData.js";
import XScrapedData from "../../classes/XScrapedData.js";
import AIProfileAnalysis from "../../classes/aiProfileAnalysis.js";
import { scrapeProfile } from "../../services/scraper.js";
import { AIAnalysis } from "../../services/aiAnalysis.js";
import { connectAndSendData } from "../../services/connectAndSendData.js";


export async function formData(req, res) {
    // enviar resposta para evitar timeout no render
    res.status(201).json({message: 'sucesso'});

    try {
        // 1. receber dados do front
        const userData = new UserData(req.body);

        // 2. raspar dados do X
        const resultadoScraper = await scrapeProfile(userData.perfil_x);
        
        const mergedData = Object.assign({}, ...resultadoScraper);
        const XData = new XScrapedData(mergedData);
        console.log(XData);

        // 3. análise pela IA
        const resultadoAI = await AIAnalysis(userData, XData);
        const AIData = new AIProfileAnalysis(resultadoAI);
        console.log(AIData)
        
        // 4. enviar os dados para o mongoDB
        const enviarDados = await connectAndSendData(userData, XData, AIData)
        console.log(enviarDados);

    } catch (error) {
        res.status(500).json({ message: `Erro ao executar scraper e análise: ${error}` })
    }
};


