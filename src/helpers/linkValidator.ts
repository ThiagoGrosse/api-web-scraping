import { URL } from "url";
import { allowedKeywords } from "../data/allowedKeywords";
import { forbiddenKeywords } from "../data/forbiddenKeywords";
import { writeToFile } from "./writeToFile";
import { getCurrentDateTime } from "./getCurrentDateTime";
import fs from "fs";
import { notAllowedExtensions } from "../data/notAllowedExtensions";
import { notAllowedPages } from "../data/notAllowedPages";

const forbiddenUrls: Set<string> = new Set(); // Use Set para armazenar URLs não permitidas

export const isValidLink = (link: string, baseDomain: string): boolean => {
    const url = new URL(link, baseDomain);

    // Verifica se o link está no mesmo domínio
    if (url.origin !== baseDomain) {
        return false;
    }

    // Verifica se o link contém alguma palavra-chave permitida
    if (!allowedKeywords.some((keyword) => link.includes(keyword))) {
        forbiddenUrls.add(link); // Adiciona URL ao conjunto de URLs não permitidas
        return false;
    }

    if (forbiddenKeywords.some((keyword) => link.includes(keyword))) {
        forbiddenUrls.add(link);
        return false;
    }

    return true;
};

// Função para gravar URLs não permitidas em um arquivo
export const saveForbiddenUrlsToFile = (directory: string,store:string) => {
    // Verificar se o diretório existe
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true }); // Criar diretório se não existir
    }

    const uniqueForbiddenUrls = Array.from(forbiddenUrls); // Converter o conjunto para um array
    const filePath = `${directory}/${getCurrentDateTime()}_${store}.txt`;
    writeToFile(filePath, uniqueForbiddenUrls);
};

export const validateExtensions = (link: string): boolean => {
    return notAllowedExtensions.some((ext) => link.endsWith(ext));
}

export const validatePage = (link: string): boolean => {
    return notAllowedPages.some((p) => link.includes(p));
};
