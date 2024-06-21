import { Router } from "express";
import * as dataController from "../controllers/dataController";

const router = Router();

router.get("/infos", dataController.getData);
router.get("/infos/:id", dataController.getDataById);
router.get("/history/:id", dataController.getHistoryById);
router.get("/search", dataController.searchInfo);

export default router;