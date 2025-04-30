import app from "./api/app.js";
import dotenv from 'dotenv';
// import { startWatching } from "./api/watchMongo.js"

dotenv.config();

let PORT = process.env.PORT || 3000;

// startWatching();

app.listen(PORT, () => {
    console.log(`Server-sent Events server running http://localhost:${PORT}`);
});