import { wordsNeverUsed } from "../data/wordsNeverUsed";

const wordsList = wordsNeverUsed;

export const filterArray = (arrayList: string[]): string[] => {
    const palavrasExcluirLower = wordsList.map((palavra) =>
        palavra.toLowerCase()
    );

    return arrayList.filter((item) => {
        const itemLower = item.toLowerCase();
        return !palavrasExcluirLower.some((palavra) =>
            itemLower.includes(palavra)
        );
    });
};
