import dotenv from 'dotenv';
dotenv.config();

export async function openAiKey (req, res) {
    try {
        const apiKey = process.env.OPEN_AI;
        res.status(200).json({ apiKey });
    } catch (error) {
        console.error('Error retrieving API Key:', error);
        res.status(500).send('Error retrieving API Key')
    }

    const apiKey = process.env.OPEN_AI;

    return apiKey;
};