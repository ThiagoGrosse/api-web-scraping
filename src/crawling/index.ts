import { crawl } from "./crawler";
import fs from "fs";

import { domainsList } from "../data/domainsList";
import { getCurrentDate } from "../helpers/getCurrentDateTime";
import { saveForbiddenUrlsToFile } from "../helpers/linkValidator";

export const startCrawling = async () => {
    const visitedDomains = new Set<string>();

    const logDirectory = `logs/${getCurrentDate()}`; // Diretório para os logs desta execução
    fs.mkdirSync(logDirectory, { recursive: true }); // Criar diretório se não existir

    for (const { domain, store } of domainsList) {
        console.log(`Iniciando crawling para: ${domain}`);
        const visited = new Set<string>();
        const toVisit = new Set<string>([domain]);
        const baseDomain = new URL(domain).origin;

        while (toVisit.size > 0) {
            const currentUrl = toVisit.values().next().value;
            toVisit.delete(currentUrl);

            await crawl(currentUrl, baseDomain, visited, toVisit, store);
        }

        visitedDomains.add(domain);
        // Após o término do crawling, salvar as URLs não permitidas em um arquivo
        saveForbiddenUrlsToFile(logDirectory, store);
    }

    return Array.from(visitedDomains);
};
