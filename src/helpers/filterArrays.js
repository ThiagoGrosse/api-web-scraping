"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterArray = void 0;
const wordsNeverUsed_1 = require("../data/wordsNeverUsed");
const wordsList = wordsNeverUsed_1.wordsNeverUsed;
const filterArray = (arrayList) => {
    const palavrasExcluirLower = wordsList.map((palavra) => palavra.toLowerCase());
    return arrayList.filter((item) => {
        const itemLower = item.toLowerCase();
        return !palavrasExcluirLower.some((palavra) => itemLower.includes(palavra));
    });
};
exports.filterArray = filterArray;
