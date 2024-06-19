import { Request, Response } from "express";
import { Crawler, Image, Info } from "../models";
import { LinksCrawled } from "../types/linksCrawled";
import sendResponse from "../helpers/helperResponses";

export const getAllCrawledLinksByStore = async (
    store: string
): Promise<LinksCrawled[]> => {
    const links = await Crawler.findAll({ where: { store: store } });

    return links;
};

export const getData = async (req: Request, res: Response) => {
    try {
        const result = await Crawler.findAll({
            include: [
                {
                    model: Image,
                    as: "images",
                    separate: true,
                },
                {
                    model: Info,
                    as: "info",
                },
            ],
        });

        if (result && result.length > 0) {
            sendResponse(res, 200, result, result.length);
        } else {
            sendResponse(res, 404, { Error: "Nenhum registro encontrado." });
        }
    } catch (error) {
        sendResponse(res, 500, error);
    }
};

export const getDataById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await Crawler.findByPk(id, {
            include: [
                {
                    model: Image,
                    as: "images",
                    separate: true,
                },
                {
                    model: Info,
                    as: "info",
                },
            ],
        });

        if (result) {
            sendResponse(res, 200, result, 1);
        } else {
            sendResponse(res, 404, { Error: "Nenhum registro encontrado." });
        }
    } catch (error) {
        sendResponse(res, 500, error);
    }
};
