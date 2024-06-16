"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
const getIndex = (req, res) => {
    const links = {
        farolImoveis: {
            url: "/farol-imoveis",
            method: "POST",
        },
    };
    res.json({ links: links });
};
exports.getIndex = getIndex;
