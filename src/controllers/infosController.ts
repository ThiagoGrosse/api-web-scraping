import { Info } from "../models";

export const createNewInfo = async (
    id: number,
    value: number,
    title: string,
    realState: string,
    typeOffer: string,
    details: string
) => {
    const resultData = [];

    try {
        const registerExisting = await Info.findOne({ where: { id_item: id } });

        if (!registerExisting) {
            const createRegister = await Info.create({
                id_item: id,
                value: value,
                title: title,
                real_state: realState,
                type_of_offer: typeOffer,
                details: details,
            });

            if (createRegister) {
                resultData.push({ id: id, msg: "Informações salvas" });
            }
        } else {
            const updateRegister = await Info.update(
                {
                    id_item: id,
                    value: value,
                    title: title,
                    real_state: realState,
                    type_of_offer: typeOffer,
                    details: details,
                },
                { where: { id_item: id } }
            );

            if (updateRegister) {
                resultData.push({ id: id, msg: "Informações atualizadas" });
            }
        }
    } catch (error) {
        resultData.push({ id: id, err: error });
    }

    return resultData;
};
