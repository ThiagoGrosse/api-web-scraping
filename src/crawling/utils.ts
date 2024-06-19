import axios from "axios";
import cheerio from "cheerio";
import { URL } from "url";
import { validatePage, validateExtensions } from "../helpers/linkValidator";

export const getLinks = async (url: string, baseDomain: string) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const links: Set<string> = new Set();

        $("a").each((_, element) => {
            const link = $(element).attr("href");

            if (
                link &&
                !link.startsWith("#") &&
                !link.startsWith("mailto:") &&
                !link.startsWith("javascript:") &&
                !validateExtensions(link) &&
                !validatePage(link)
            ) {
                const absoluteLink = new URL(link, url).href;
                if (absoluteLink.startsWith(baseDomain)) {
                    links.add(absoluteLink);
                }
            }
        });

        return Array.from(links);
    } catch (error) {
        console.error(`Erro ao acessar ${url}:`, error);
        return [];
    }
};
