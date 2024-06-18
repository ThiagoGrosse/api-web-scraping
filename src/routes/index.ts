import { Router } from "express";
import * as homeController from "../controllers/homeController";
import * as loginController from "../controllers/authController";
import * as priceHistoryController from "../controllers/priceHistoryController";
import * as dataController from "../controllers/getDataController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get(
    "/price-history:id",
    authMiddleware,
    priceHistoryController.getAllHystory
);
router.get('/by-id/:id',dataController.getById)
router.get("/all", dataController.getAllData);
router.post("/login", loginController.login);
router.get("/", homeController.getIndex);

export default router;
