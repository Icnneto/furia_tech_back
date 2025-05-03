import UserData from "../../classes/userData.js";
import XScrapedData from "../../classes/XScrapedData.js";
import AIProfileAnalysis from "../../classes/aiProfileAnalysis.js";
import { scrapeProfile } from "../../services/scraper.js";
import { AIAnalysis } from "../../services/aiAnalysis.js";
import { connectAndSendData } from "../../services/connectAndSendData.js";

// receber dados do front
// chamar scraper
// chamar IA para analisar o perfil
// enviar dados para o mongoDB


export async function formData(req, res) {
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
        
    }
};


