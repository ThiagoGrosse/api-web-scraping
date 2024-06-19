import { Router } from "express";
import { initiateCrawling } from "../controllers/crawlerController";

const router = Router();

router.get("/start-crawling", initiateCrawling);

export default router;
