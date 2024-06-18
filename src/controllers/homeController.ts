import { Request, Response } from "express";
import { startCrawling } from "./crawlerController";
import { getLinksJoris } from "./scrapingJoris.Controller";
import { getLinksFarol } from "./scrapingFarol.Controller";

export const getIndex = (req: Request, res: Response): void => {
    startCrawling("https://farolimoveismarechal.com/", "Farol Imóveis");
    startCrawling("https://www.imobiliariajoris.com.br/", "Imobiliária Jóris");

    getLinksJoris(req, res);
    getLinksFarol(req, res);
};
