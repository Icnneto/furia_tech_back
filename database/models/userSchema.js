import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    birth_date: { type: Date },
    email: { type: String, required: true, unique: true },
    address: {
        country: { type: String },
        state: { type: String },
    },
    interests: [{ type: String }],
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
    x_link: { type: String },
    document: { type: String },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});

const userData = mongoose.model('users_data', userSchema);

export default userData;