import { Request, Response } from "express";
import { Crawler, Image, Scraping } from "../models";

/**
 *  Get all data from database
 */
export const getAllData = async (req: Request, res: Response) => {
    try {
        const crawler = await Crawler.findAll({
            attributes: ["id", "url", "store"],
            include: [
                {
                    model: Image,
                    attributes: [
                        "url_img_01",
                        "url_img_02",
                        "url_img_03",
                        "url_img_04",
                        "url_img_05",
                        "url_img_06",
                        "url_img_07",
                        "url_img_08",
                        "url_img_09",
                        "url_img_10",
                    ],
                },
                {
                    model: Scraping,
                    attributes: [
                        "value",
                        "sale",
                        "rent",
                        "real_state",
                        "details",
                    ],
                },
            ],
        });

        if (!crawler) {
            return res.status(404).json({ message: "Crawler not found" });
        }

        res.status(200).json(crawler);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const getById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const result = await Crawler.findOne({
            where: { id: id },
            attributes: ["id", "url", "store"],
            include: [
                {
                    model: Image,
                    attributes: [
                        "url_img_01",
                        "url_img_02",
                        "url_img_03",
                        "url_img_04",
                        "url_img_05",
                        "url_img_06",
                        "url_img_07",
                        "url_img_08",
                        "url_img_09",
                        "url_img_10",
                    ],
                },
                {
                    model: Scraping,
                    attributes: [
                        "value",
                        "sale",
                        "rent",
                        "real_state",
                        "details",
                    ],
                },
            ],
        });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
};
