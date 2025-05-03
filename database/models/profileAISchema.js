import mongoose from "mongoose";

const userAIAnalysis = new mongoose.Schema({
    user_scraper_id: { type: mongoose.Schema.Types.ObjectId, ref: 'scraped_x_profiles', required: true },
    relevante_para_informativos: { type: Number, required: true },
    relevante_para_eventos: { type: Number, required: true },
    sinergia_com_furia: { type: Number, required: true },
    overview: { type: String, required: true }
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});

const analysisAI = mongoose.model('profile_ai_analysis', userAIAnalysis);

export default analysisAI;