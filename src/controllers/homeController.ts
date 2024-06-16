import { Request, Response } from "express";

export const getIndex = (req: Request, res: Response): void => {
    const links = {
        farolImoveis: {
            url: "/farol-imoveis",
            method: "POST",
        },
    };

    res.json({ links: links });
};
