import mongoose from "mongoose";

const userXProfile = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users_data', required: true },
    num_following: { type: Number, required: true },
    num_posts: { type: Number, required: true },
    bio: { type: String, required: true },
    posts_content: [{ type: String }]
},{
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

const scrapedProfile = mongoose.model('scraped_x_profiles', userXProfile);

export default scrapedProfile;

