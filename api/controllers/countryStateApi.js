import dotenv from 'dotenv';
dotenv.config();

export async function getApi (req, res) {
    try {
        const apiKey = process.env.COUNTRY_STATE_KEY;
        res.status(200).send(apiKey);
    } catch (error) {
        console.error('Error retrieving API Key:', error);
        res.status(500).send('Error retrieving API Key')
    }

    const apiKey = process.env.COUNTRY_STATE_KEY;

    return apiKey;
};