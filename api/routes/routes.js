import { Router } from "express";
import { getApi } from "../controllers/countryStateApi.js";
// import { main } from "../controllers/sseController.js";
// import { executeLiveScraper } from "../controllers/scraperLiveController.js";

const router = Router();

// main function is the one that activates sse communication
// router.get('/events', main);

// calls the function to scrape profile data from FURIA
// router.get('/execute-scraper', executeLiveScraper);

// calls the API key for country state
router.get('/retrieve-api', getApi)

export default router;