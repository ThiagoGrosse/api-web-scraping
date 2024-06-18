import { Request, Response } from "express";
import { PriceHistory } from "../models/PriceHistory";

/**
 *  Get data History from ID
 */
export const getAllHystory = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const hystory = await PriceHistory.findAll({
            where: {
                id: id,
            },
        });

        res.status(200).json(hystory);
    } catch (error) {
        res.status(500).json({
            error: "Ocorreu um erro ao buscar histórico do item",
        });
    }
};
