import axios from "axios";
import * as cheerio from "cheerio";

import { getAllCrawledLinksByStore } from "../controllers/dataController";
import { filterInfos } from "../helpers/filterArrays";
import { parseCurrencyValue } from "../helpers/prices";
import { createNewInfo } from "../controllers/infosController";
import { createRegisterImg } from "../controllers/imgController";
import { createHistoryRegisters } from "../controllers/priceHistoryController";

export const scJoris = async () => {
    const store = "Imobiliária Jóris";
    const result = [];

    const links = await getAllCrawledLinksByStore(store);

    for (const link of links) {
        const { id, url } = link;

        const data = await getDataInfo(url);
        const saveData = await createNewInfo(
            id,
            data.valor,
            data.titulo,
            store,
            data.oferta,
            JSON.stringify(data.detalhes)
        );
        const saveImg = await createRegisterImg(id, data.imagens);
        const priceH = await createHistoryRegisters(id, data.valor);

        result.push({ img: saveImg });
        result.push({ data: saveData });
        result.push({ priceHistory: priceH });
    }

    return result;
};

const getDataInfo = async (url: string) => {
    var value: number = 0;
    var infos: string = "";
    var title: string = "";
    var typeOffer: string = "";
    const details: string[] = [];
    const imageLinks: string[] = [];

    // iniciar cheerio
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    /**
     * Coletar informações
     */
    $(".div-block-65").each((index, element) => {
        const info = $(element).text();
        if (info) {
            infos = info;
        }
    });

    const linhas = infos.split("\n").filter((linha) => linha.trim() !== "");
    const linesFiltered = linhas
        .map((line) => line.trim())
        .filter((line) => line !== "");

    /**
     * Pegar Valor e tipo da oferta
     */
    linesFiltered.filter((line) => {
        if (line.includes("Venda") || line.includes("venda")) {
            typeOffer = "Venda";
        }

        if (line.includes("Locação") || line.includes("vocação")) {
            typeOffer = "Locação";
        }
        if (line.includes("R$ ")) {
            const partes = line.split(":");
            if (partes.length === 2) {
                value = parseCurrencyValue(partes[1].trim());

                return false;
            }
        }

        details.push(line);
        return true;
    });

    /**
     * Pegar título
     */
    $("#detalhes").each((index, element) => {
        const getTitle = $(element).text();
        if (getTitle && getTitle.length > 0) title = getTitle;
    });

    /**
     * Pegar imagens
     */
    $(".w-slider img").each((index, element) => {
        const img = $(element).attr("src");
        if (img && img.includes("http")) {
            imageLinks.push(img); // Saves the links in the array
        }
    });

    return {
        titulo: title,
        detalhes: filterInfos(details),
        valor: value,
        oferta: typeOffer,
        imagens: imageLinks,
    };
};
