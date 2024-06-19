import { Request, Response } from "express";
import { scJoris } from "../scrapings/sc_joris";
import { scFarol } from "../scrapings/sc_farol";

export const Teste = async (req: Request, res: Response) => {
    const result = await scFarol();

    res.status(200).json({ /*countResult: result.length,*/ Message: result });
};
