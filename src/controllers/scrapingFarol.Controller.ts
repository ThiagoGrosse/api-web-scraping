import { Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { filterArray } from "../helpers/filterArrays";
import { Crawler, Image, PriceHistory, Info } from "../models";

/**
 * Get links for Store Farol Imóveis in database
 * @param req Request
 * @param res Response
 */
export const getLinksFarol = async (req: Request, res: Response) => {
    try {
        const links = await Crawler.findAll({
            where: { store: "Farol Imóveis" },
        });

        await Promise.all(
            links.map(async (link) => {

                // await getDataSiteFarol(link.url, link.id, dataExist); // get data site
                // await getImages(link.url, link.id, imgExist); // get images
            })
        );

        res.status(200).json({ message: "Deu certo!" });
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Function for web scraping and save in database
 * @param url string
 * @param id number
 * @param dataExist boolean
 */
export const getDataSiteFarol = async (
    url: string,
    id: number,
    dataExist: boolean
) => {
    const infos: string[] = [];
    const disponibilidade: string[] = [];
    var valor: string = "";

    try {
        // Get web page request
        const response = await axios.get(url);
        // Load web page HTML
        const $ = cheerio.load(response.data);

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

        // Remove "R$" from value and replace ',' for '.'
        const v1 = valor.replace("R$ ", "");
        const v2 = v1.replace(".", "");
        // Aplication of function filter array should
        const informacoes = filterArray(infos);

        const createScrapingData = {
            // Create a ne object of scraping
            id_item: id,
            value: parseFloat(v2),
            sale: disponibilidade[1].includes("Venda"),
            rent: disponibilidade[1].includes("Aluguel"),
            real_state: "Farol Imobiliária",
            details: informacoes.join("|"),
        };

        if (!dataExist) {
            await Info.create(createScrapingData); // Create a new Scraping data
        } else {
            await Info.update(createScrapingData, {
                // Update existing Scraping data
                where: { id_item: id },
            });
        }

        // Save the current price in table of history
        await PriceHistory.create({
            id_item: id,
            price: parseFloat(v2),
        });
    } catch (error) {
        console.log("error: " + error);
    }
};

/**
 * Function to get image and save in the database
 * @param url string
 * @param id number
 */
const getImages = async (url: string, id: number, imgExist: boolean) => {
    const imageLinks: string[] = [];

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

    const dataImages = {
        id_item: id,
        url_img_01: imageLinks[0],
        url_img_02: imageLinks[1],
        url_img_03: imageLinks[2],
        url_img_04: imageLinks[3],
        url_img_05: imageLinks[4],
        url_img_06: imageLinks[5],
        url_img_07: imageLinks[6],
        url_img_08: imageLinks[7],
        url_img_09: imageLinks[8],
        url_img_10: imageLinks[9],
    };

    if (!imgExist) {
        // create a new registry of images
        await Image.create(dataImages);
    } else {
        // update the registry of images

        await Image.update(dataImages, {
            where: { id_item: id },
        });
    }
};
