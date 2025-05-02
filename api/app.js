import express from 'express';
import cors from 'cors';
import router from './routes/routes.js';
import { connectDatabase } from '../database/config/dbConnect.js';  

const connection = await connectDatabase();

connection.on('error', (e) => {
    console.error(`Database connection error: ${e}`);
});

connection.once('open', () => {
    console.log('Database connection established')
});

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

export default app;