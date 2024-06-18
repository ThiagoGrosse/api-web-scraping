import axios from "axios";
import cheerio from "cheerio";
import { URL } from "url";
import { Crawler } from "../models/Crawler";

const imageExtensions = [".png", ".jpg", ".jpeg", ".gif"];

const isImageLink = (link: string): boolean => {
    return imageExtensions.some((ext) => link.endsWith(ext));
};

const getLinks = async (url: string, baseDomain: string) => {
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
                !isImageLink(link)
            ) {
                const absoluteLink = new URL(link, url).href;
                if (absoluteLink.startsWith(baseDomain)) {
                    if (
                        absoluteLink.includes(
                            "https://www.imobiliariajoris.com.br/detalhes-do-imovel"
                        ) ||
                        absoluteLink.includes(
                            "farolimoveismarechal.com/imoveis/"
                        )
                    ) {
                        links.add(absoluteLink);
                    }
                }
            }
        });

        return Array.from(links);
    } catch (error) {
        console.error(`Erro ao acessar ${url}:`, error);
        return [];
    }
};

/**
 * Function Crawler to site Joris
 * @param url string
 * @param baseDomain string
 * @param visited string
 * @param toVisit string
 * @param store string
 */
const crawlJoris = async (
    url: string,
    baseDomain: string,
    visited: Set<string>,
    toVisit: Set<string>,
    store: string
) => {
    visited.add(url);

    const links = await getLinks(url, baseDomain);
    for (const link of links) {
        if (!visited.has(link) && !toVisit.has(link)) {
            toVisit.add(link);
            const linkExists = await Crawler.findOne({
                where: { url: link },
            });

            if (!linkExists) {
                await Crawler.create({ url: link, store: store });
            }
        }
    }
};

/**
 * Function Crawler to site Farol
 * @param url string
 * @param baseDomain string
 * @param visited string
 * @param toVisit string
 * @param store string
 */
const crawlFarol = async (
    url: string,
    baseDomain: string,
    visited: Set<string>,
    toVisit: Set<string>,
    store: string
) => {
    visited.add(url);

    const links = await getLinks(url, baseDomain);
    for (const link of links) {
        if (!visited.has(link) && !toVisit.has(link)) {
            toVisit.add(link);
            const existingLink = await Crawler.findOne({
                where: { url: link },
            });
            if (!existingLink) {
                await Crawler.create({ url: link, store: store });
            }
        }
    }
};

export const startCrawling = async (startUrl: string, store: string) => {
    const visited = new Set<string>();
    const toVisit = new Set<string>([startUrl]);
    const baseDomain = new URL(startUrl).origin;

    while (toVisit.size > 0) {
        const currentUrl = toVisit.values().next().value;
        toVisit.delete(currentUrl);
        if (store == "Farol Imóveis")
            await crawlFarol(currentUrl, baseDomain, visited, toVisit, store);
        else {
            await crawlJoris(currentUrl, baseDomain, visited, toVisit, store);
        }
    }

    return Array.from(visited);
};
