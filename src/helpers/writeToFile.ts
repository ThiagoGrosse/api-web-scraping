import fs from "fs";

export const writeToFile = (filePath: string, urls: string[]) => {
    const content = urls.join("\n");

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            console.error("Erro ao gravar arquivo:", err);
        } else {
            console.log(`Arquivo ${filePath} criado com sucesso.`);
        }
    });
};
