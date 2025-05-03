import { connectDatabase } from "../database/config/dbConnect.js";
import analysisAI from "../database/models/profileAISchema.js";

export async function fetchAllData() {
    const connection = await connectDatabase();

    connection.on('error', (e) => {
        console.error(`Database connection error: ${e}`);
    });

    connection.once('open', () => {
        console.log('Database connection established')
    });

    try {
        const data = await analysisAI.
            find({}).
            populate({
                path: 'user_scraper_id',
                select: '-bio -posts_conteudo -_id',
                populate: {
                    path: 'user_id',
                    select: 'username nascimento email pais estado interesses eventos perfil_x -_id'
                }
            }).
            exec();

        return data;
    } catch (error) {
        console.error('Error retrieving data:', error);
        return `${error.message}`;
    };
};