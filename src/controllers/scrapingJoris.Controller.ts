import axios from "axios";
import * as cheerio from "cheerio";
import { Request, Response } from "express";
import { verifiDataExist, verifiImg } from "../helpers/verifiDataInfoExists";
import { Crawler, Image, PriceHistory, Scraping } from "../models";
import { startCrawling } from "./crawlerController";
import { filterArray } from "../helpers/filterArrays";

export const initCrawlerJoris = async (req: Request, res: Response) => {
    startCrawling("https://www.imobiliariajoris.com.br/", "Imobiliária Jóris");
};

export const getLinksJoris = async (req: Request, res: Response) => {
    const links = await Crawler.findAll({
        where: { store: "Imobiliária Joris" },
    });

    await Promise.all(
        links.map(async (link) => {
            const dataExist = await verifiDataExist(link.id);
            const imgExist = await verifiImg(link.id);

            await getDataJoris(link.url, link.id, dataExist); // get data site
            await getImagesJoris(link.url, link.id, imgExist); // get images
        })
    );
};

const getDataJoris = async (url: string, id: number, dataExist: boolean) => {
    var infos: string = "";

    // Get web page request
    const response = await axios.get(url);
    // Load web page HTML
    const $ = cheerio.load(response.data);

    // Extract infos
    $(".div-block-65").each((index, element) => {
        const info = $(element).text();
        if (info) {
            infos = info; // Save the infos in the array
        }
    });

    const linhas = infos.split("\n").filter((linha) => linha.trim() !== "");
    var value = 0;
    var sale = false;
    var rent = false;

    linhas.forEach((linha, i) => {
        if (linha.includes("R$ ")) {
            // value = parseFloat(linha.replace("R$ ", ""));
            const partes = linha.split(":");
            if (partes.length === 2) {
                value = parseFloat(partes[1].trim().replace("R$ ", ""));
            }
        }

        if (linha.includes("Venda")) {
            sale = true;
        }
        if (linha.includes("Locação")) {
            rent = true;
        }
    });
    const removeWorks = ["Locação", "Venda"];
    const clearLinhas = linhas.filter((linha) => {
        return !removeWorks.some((palavra) => linha.includes(palavra));
    });
    const info: { [key: string]: string } = {};

    filterArray(clearLinhas).forEach((linha) => {
        const partes = linha.split(":");
        if (partes.length === 2) {
            const chave = partes[0].trim();
            const valor = partes[1].trim();
            if (!chave.includes("Compartilhe") && !chave.includes("Ref")) {
                info[chave] = valor;
            }
        }
    });

    const infoToString = JSON.stringify(info).replace("{", "").replace("}", "");

    const dataResolved = {
        id_item: id,
        value: value,
        sale: sale,
        rent: rent,
        real_state: "Imobiliária Jóris",
        details: infoToString,
    };

    if (!dataExist) {
        await Scraping.create(dataResolved);
    } else {
        await Scraping.update(dataResolved, {
            where: { id_item: id },
        });
    }

    await PriceHistory.create({
        id_item: id,
        price: value,
    });
};

const getImagesJoris = async (url: string, id: number, imgExist: boolean) => {
    const imageLinks: string[] = [];

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
