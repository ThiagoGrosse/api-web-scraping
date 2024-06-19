import { Request, Response } from "express";
import { startCrawling } from "../crawling";

export const initiateCrawling = async (req: Request, res: Response) => {
    try {
        const visitedDomains = await startCrawling();
        res.status(200).json({
            message: "Crawling iniciado com sucesso.",
            visitedDomains,
        });
    } catch (error) {
        console.error("Erro ao iniciar o crawling:", error);
        res.status(500).json({ message: "Erro ao iniciar o crawling.", error });
    }
};
