import { Router } from "express";
import * as farolController from "../controllers/farolController";
import * as jorisController from "../controllers/jorisController";
import * as homeController from "../controllers/homeController";

const router = Router();

router.post("/imobiliaria-farol", farolController.getAllInfo);
router.post("/imobiliaria-joris", jorisController.getAllInfo);
router.get("/", homeController.getIndex);

export default router;
