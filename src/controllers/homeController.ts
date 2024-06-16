import { Request, Response } from "express";

export const getIndex = (req: Request, res: Response): void => {
    const links = {
        farolImoveis: {
            url: "/imobiliaria-farol",
            method: "POST",
            body: "url da página",
        },
        imobiliariaJoris: {
            url: "/imobiliaria-joris",
            method: "POST",
            body: "url da página",
        },
    };

    res.json({ links: links });
};
