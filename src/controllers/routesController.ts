import { Request, Response } from "express";
import { Crawler } from "../models";

export const getAllCrawledLinks = async (req: Request, res: Response) => {
    try {
        const links = await Crawler.findAll();

        if (links && links.length > 0) {
            res.status(200).json({ countResult: links.length, result: links });
        } else {
            res.status(404).json({ Error: "Nenhum link foi encontrado." });
        }
    } catch (err) {
        res.status(500).json({
            error: "Ocorreu um erro ao buscar os links",
            err,
        });
    }
};

export const getLinksByStore = async (req: Request, res: Response) => {
    const { store } = req.body;

    try {
        const storeLinks = await Crawler.findAll({ where: { store: store } });

        if (storeLinks && storeLinks.length > 0) {
            res.status(200).json({
                countResult: storeLinks.length,
                result: storeLinks,
            });
        } else {
            res.status(404).json({
                Error: "Nenhum link foi encontrado. Verifique o nome enviado e tente novamente.",
            });
        }
    } catch (err) {
        res.status(500).json({
            error: "Ocorreu um erro ao buscar os links",
            err,
        });
    }
};
