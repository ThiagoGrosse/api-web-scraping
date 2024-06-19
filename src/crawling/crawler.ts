import { isValidLink } from "../helpers/linkValidator";
import { Crawler } from "../models";
import { getLinks } from "./utils";

export const crawl = async (
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

            if (isValidLink(link, baseDomain)) {
                const existingLink = await Crawler.findOne({
                    where: { url: link },
                });
                if (!existingLink) {
                    await Crawler.create({ url: link, store: store });
                }
            }
        }
    }
};