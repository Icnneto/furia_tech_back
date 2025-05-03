import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    nascimento: { type: String },
    email: { type: String, required: true, unique: true },
    cpf: { type: String, required: true },
    pais: { type: String },
    estado: { type: String },
    interesses: [{ type: String }],
    eventos: [{ type: String }],
    perfil_x: { type: String },
    documento: { type: String },
}, {
    versionKey: false,
    timestamps: {
        createdAt: 'created_at',
        updatedAt: false
    }
});

const userDataMongo = mongoose.model('users_data', userSchema);

export default userDataMongo;