import UserData from "../../classes/userData.js";
import XScrapedData from "../../classes/XScrapedData.js";
import AIProfileAnalysis from "../../classes/aiProfileAnalysis.js";
import userDataMongo from "../../database/models/userSchema.js";

// receber dados do front
// chamar scraper
// chamar IA para analisar o perfil
// enviar dados para o mongoDB


export async function formData(req, res) {
    res.status(201).json({message: 'sucesso'});

    try {
        const userData = new UserData(req.body);

    } catch (error) {
        
    }
    
};


