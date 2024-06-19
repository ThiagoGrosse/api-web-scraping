import { Router } from "express";
import * as dataController from "../controllers/dataController";

const router = Router();

router.get("/infos", dataController.getData);
router.get("/infos/:id", dataController.getDataById);

export default router;
