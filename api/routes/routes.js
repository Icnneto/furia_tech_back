import { Router } from "express";
import { getApi } from "../controllers/countryStateApi.js";
import { openAiKey } from "../controllers/openAiKey.js";
import { formData } from "../controllers/formData.js";
// import { main } from "../controllers/sseController.js";
// import { executeLiveScraper } from "../controllers/scraperLiveController.js";

const router = Router();

// main function is the one that activates sse communication
// router.get('/events', main);

// calls the function to scrape profile data from FURIA
// router.get('/execute-scraper', executeLiveScraper);

// receives form data from frontend
router.post('/form-application', formData)

// calls the API key for country state
router.get('/retrieve-api', getApi);

//open AI key
router.get('/openai-key', openAiKey);

export default router;