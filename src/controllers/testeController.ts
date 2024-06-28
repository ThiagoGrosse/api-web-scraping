import { Request, Response } from "express";
import { scJoris } from "../scrapings/sc_joris";
import { scFarol } from "../scrapings/sc_farol";

export const Teste = async (req: Request, res: Response) => {
    var resultFarol: any = "";
    var resultJoris: any = "";

    resultFarol = await scFarol();
    resultJoris = await scJoris();

    res.status(200).json({
        /*countResult: result.length,*/ Message: resultFarol,
        resultJoris,
    });
};
