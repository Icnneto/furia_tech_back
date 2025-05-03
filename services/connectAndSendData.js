import { connectDatabase } from "../database/config/dbConnect.js";
import userDataMongo from "../database/models/userSchema.js";
import scrapedProfile from "../database/models/userXProfileSchema.js";
import analysisAI from "../database/models/profileAISchema.js";

export async function connectAndSendData(userDataInput, xDataInput, AIAnalysisInput) {
    const connection = await connectDatabase();

    connection.on('error', (e) => {
        console.error(`Database connection error: ${e}`);
    });

    connection.once('open', () => {
        console.log('Database connection established')
    });

    try {

        if (!userDataInput || !xDataInput || !AIAnalysisInput) {
            throw new Error('One or more input data are missing');
        }

        // check if user already exists
        let user = await userDataMongo.findOne({ cpf: userDataInput.cpf });

        if (!user) {
            user = await userDataMongo.create(userDataInput);
        };

        let xData = await userDataMongo.findOne({ user_id: user._id });

        if (!xData) {
            xData = await scrapedProfile.create({
                user_id: user._id,
                bio: xDataInput.bio,
                posts_conteudo: xDataInput.posts_conteudo
            });
        };

        await analysisAI.create({
            user_scraper_id: xData._id,
            relevante_para_informativos: AIAnalysisInput.relevante_para_informativos,
            relevante_para_eventos: AIAnalysisInput.relevante_para_eventos,
            sinergia_com_furia: AIAnalysisInput.sinergia_com_furia,
            overview: AIAnalysisInput.overview
        });

        return 'Dados enviado com sucesso!';

    } catch (error) {
        console.error('Erro ao salvar no database:', error);
        return `${error.message}`;
    };
};
