import { Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { filterArray } from "../helpers/filterArrays";

export const getAllInfo = async (req: Request, res: Response) => {
    const { url } = req.body;

    const imageLinks: string[] = [];
    const infos: string[] = [];
    const disponibilidade: string[] = [];
    var valor: string = "";

    try {
        // Get web page request
        const response = await axios.get(url);
        // Load web page HTML
        const $ = cheerio.load(response.data);

        // Extract link for images
        $(".swiper-slide-inner img").each((index, element) => {
            const imageUrl = $(element).attr("src");
            if (imageUrl && imageUrl.includes("http")) {
                imageLinks.push(imageUrl); // Saves the links in the array
            }
        });

        // Extract titles
        $(".elementor-widget-container h2").each((index, element) => {
            const info = $(element).text();
            if (info) {
                infos.push(info); // Save the titles in the array
            }
        });

        // Search for availability data
        $(".elementor-widget-container .jet-listing-dynamic-terms").each(
            (index, element) => {
                const disp = $(element).text();
                if (disp) {
                    disponibilidade.push(disp); // Save the availability in the array
                }
            }
        );

        // Search for value
        $(".jet-listing-dynamic-field__content").each((index, element) => {
            const value = $(element).text();
            if (value.includes("R$")) {
                valor = value; // Save the value in the array
            }
        });

        // Creates the array with the results
        const result = {
            infos: filterArray(infos),
            disponibilidade: disponibilidade[1],
            valor: valor,
            linksImage: imageLinks,
        };

        res.status(200).json({ result: result });
    } catch (error) {
        res.status(500).json({ error: "Erro ao realizar scraping" });
    }
};
