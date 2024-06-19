import { Router } from "express";
import * as routersController from "../controllers/routesController";

const router = Router();

router.get("/get-all-links", routersController.getAllCrawledLinks);
router.post("/get-links-by-store", routersController.getLinksByStore);

export default router;