import axios from "axios";
import * as cheerio from "cheerio";

import { getAllCrawledLinksByStore } from "../controllers/dataController";
import { filterInfos } from "../helpers/filterArrays";
import { parseCurrencyValue } from "../helpers/prices";
import { createNewInfo } from "../controllers/infosController";
import { createRegisterImg } from "../controllers/imgController";
import { createHistoryRegisters } from "../controllers/priceHistoryController";

export const scFarol = async () => {
    const store = "Farol Imóveis";
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

export const getDataInfo = async (url: string) => {
    const infos: string[] = [];
    var valor: number = 0;
    var titulo: string = "";
    var oferta: string = "";
    const imageLinks: string[] = [];

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    /**
     * Pega as informações
     */
    $(".elementor-widget-container h2").each((index, element) => {
        const info = $(element).text();
        if (info) {
            infos.push(info);
        }
    });

    /**
     * Pega o título
     */
    if (infos.length > 0) {
        titulo = infos[0];
    }

    /**
     * Pega a disponibilidade
     */
    $(".elementor-widget-container .jet-listing-dynamic-terms").each(
        (index, element) => {
            const offer = $(element).text();
            if (offer) {
                oferta = offer;
            }
        }
    );

    if (oferta.includes("Venda")) {
        oferta = "Venda";
    } else if (oferta.includes("Aluguel")) {
        oferta = "Locação";
    } else {
        oferta = "";
    }

    /**
     * Pega o valor
     */
    $(".jet-listing-dynamic-field__content").each((index, element) => {
        const value = $(element).text();
        if (value.includes("R$")) {
            valor = parseCurrencyValue(value);
        }
    });

    /**
     * Pegar imagens
     */
    $(".swiper-slide-inner img").each((index, element) => {
        const imageUrl = $(element).attr("src");
        if (imageUrl && imageUrl.includes("http")) {
            imageLinks.push(imageUrl);
        }
    });

    return {
        titulo: titulo,
        detalhes: filterInfos(infos),
        valor: valor,
        oferta: oferta,
        imagens: imageLinks,
    };
};
