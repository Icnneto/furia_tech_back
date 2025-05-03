import app from "./api/app.js";
import dotenv from 'dotenv';

dotenv.config();

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});