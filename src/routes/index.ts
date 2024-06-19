import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import crawlerRoutes from "./crawlerRoutes";
import dataRoutes from "./dataRoutes";
import siteRoutes from "./siteRoutes";
import { Teste } from "../controllers/testeController";

const router = Router();

router.use("/site", siteRoutes);
router.use("/get-data", dataRoutes);
router.use("/crawler", crawlerRoutes);

router.get("/test", Teste);
router.get("/", (req: Request, res: Response) => {
    return res.status(200).json({ message: "Olá" });
});

export default router;
