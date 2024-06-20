import { PriceHistory } from "../models";

export const createHistoryRegisters = async (id: number, price: number) => {
    try {
        const lastRegistered = await PriceHistory.findOne({
            where: { id_item: id },
            order: [["created_at", "DESC"]],
        });

        if (!lastRegistered || lastRegistered.price !== price) {
            await PriceHistory.create({
                id_item: id,
                price: price,
            });
        }
        return true;
    } catch (error) {
        return false;
    }
};
