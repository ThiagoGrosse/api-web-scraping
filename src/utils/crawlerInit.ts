import { startCrawling } from "../controllers/crawlerController";

export const crawlerInit = (url: string, store: string) => {
    startCrawling(url, store);
};

crawlerInit("https://farolimoveismarechal.com/", "Farol Imóveis");
crawlerInit("https://www.imobiliariajoris.com.br/", "Imobiliária Jóris");
