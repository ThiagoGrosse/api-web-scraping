import { Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { filterArray } from "../helpers/filterArrays";

export const getAllInfo = async (req: Request, res: Response) => {
    const { url } = req.body;
    const imageLinks: string[] = [];
    var infos: string = "";

    try {
        // Get web page request
        const response = await axios.get(url);
        // Load web page HTML
        const $ = cheerio.load(response.data);

        // // Extract link for images
        $(".w-slider img").each((index, element) => {
            const img = $(element).attr("src");
            if (img && img.includes("http")) {
                imageLinks.push(img); // Saves the links in the array
            }
        });

        // Extract infos
        $(".div-block-65").each((index, element) => {
            const info = $(element).text();
            if (info) {
                infos = info; // Save the infos in the array
            }
        });

        const linhas = infos.split("\n").filter((linha) => linha.trim() !== "");

        const info: { [key: string]: string } = {};

        linhas.forEach((linha) => {
            const partes = linha.split(":");
            if (partes.length === 2) {
                const chave = partes[0].trim();
                const valor = partes[1].trim();
                if (!chave.includes("Compartilhe") && !chave.includes("Ref")) {
                    info[chave] = valor;
                }
            }
        });

        // Creates the array with the results
        const result = {
            informacoes: info,
            linksImage: imageLinks,
        };

        res.status(200).json({ result: result });
    } catch (error) {
        res.status(500).json({ error: "Erro ao realizar scraping" });
    }
};
