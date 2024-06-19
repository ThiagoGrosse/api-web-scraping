import { Crawler } from "../models";
import { LinksCrawled } from "../types/linksCrawled";

export const getAllCrawledLinksByStore = async (
    store: string
): Promise<LinksCrawled[]> => {
    const links = await Crawler.findAll({ where: { store: store } });

    return links;
};
