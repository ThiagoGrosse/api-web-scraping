import { Request, Response } from "express";
import { Crawler, Image, Info, PriceHistory } from "../models";
import { LinksCrawled } from "../types/linksCrawled";
import sendResponse from "../helpers/helperResponses";

/**
 * Busca todos os registros com base na 'loja'
 */
export const getAllCrawledLinksByStore = async (
    store: string
): Promise<LinksCrawled[]> => {
    const links = await Crawler.findAll({ where: { store: store } });

    return links;
};

/**
 * Busca todos os dados
 */
export const getData = async (req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string) || 1; // Página atual (padrão: 1)
        const limit = parseInt(req.query.limit as string) || 20; // Número de itens por página (padrão: 10)

        const offset = (page - 1) * limit;

        const result = await Crawler.findAll({
            include: [
                {
                    model: Image,
                    as: "images",
                    attributes: ["url_img", "created_at"],
                    separate: true,
                },
                {
                    model: Info,
                    as: "info",
                    attributes: [
                        "title",
                        "value",
                        "real_state",
                        "type_of_offer",
                        "details",
                    ],
                },
            ],
            offset: offset,
            limit: limit,
        });

        if (result && result.length > 0) {
            sendResponse(res, 200, result, result.length, page, limit);
        } else {
            sendResponse(res, 404, { Error: "Nenhum registro encontrado." });
        }
    } catch (error) {
        sendResponse(res, 500, error);
    }
};

/**
 * Busca dados com base no ID
 */
export const getDataById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await Crawler.findByPk(id, {
            include: [
                {
                    model: Image,
                    as: "images",
                    attributes: ["url_img", "created_at"],
                    separate: true,
                },
                {
                    model: Info,
                    as: "info",
                    attributes: [
                        "title",
                        "value",
                        "real_state",
                        "type_of_offer",
                        "details",
                    ],
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

/**
 * Busca dados de histórico com base no ID
 */
export const getHistoryById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await PriceHistory.findAll({
            where: { id_item: id },
            order: [["created_at", "DESC"]],
        });

        if (result && result.length > 0) {
            sendResponse(res, 200, result, result.length);
        } else {
            sendResponse(res, 404, { Error: "Nenhum registro encontrado." });
        }
    } catch (error) {
        sendResponse(res, 500, { Error: error });
    }
};
