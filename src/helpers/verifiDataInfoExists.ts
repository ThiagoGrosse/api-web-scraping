import { Image } from "../models/Image";
import { Scraping } from "../models/Scraping";

export const verifiDataExist = async (id: number) => {
    const requestDb = await Scraping.findOne({ where: { id_item: id } });

    return requestDb ? true : false;
};

export const verifiImg = async (id: number) => {
    const requestDb = await Image.findOne({ where: { id_item: id } });

    return requestDb ? true : false;
};
