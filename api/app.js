import express from 'express';
import router from './routes/routes.js';
// import { connectDatabase } from '../database/config/dbConnect.js';

// const connection = await connectDatabase();

// connection.on('error', (e) => {
//     console.error(`Database connection error: ${e}`);
// });

// connection.once('open', () => {
//     console.log('Database connection established')
// });

const app = express();

app.use(express.json());
app.use(router);

export default app;