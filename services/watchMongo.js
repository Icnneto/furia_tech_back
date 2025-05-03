import mongoose from "mongoose";
import { broadcastToClients } from "../api/controllers/sseConnection.js";
import { connectDatabase } from "../database/config/dbConnect.js";
import analysisAI from "../database/models/profileAISchema.js";

export async function startWatching() {
    await connectDatabase();

    const collection = mongoose.connection.collection('profile_ai_analyses');
    const changeStream = collection.watch([{ $match: { operationType: 'insert' } }]);

    changeStream.on('change', async (change) => {
        console.log('Uma nova inserção foi detectada!');

        const fullDoc = await analysisAI
            .findById(change.fullDocument._id)
            .populate({
                path: 'user_scraper_id',
                select: 'bio posts_conteudo -_id',
                populate: {
                    path: 'user_id',
                    select: 'username nascimento email pais estado interesses eventos perfil_x -_id'
                }
            })
            .exec();

        broadcastToClients(fullDoc);
    });
};