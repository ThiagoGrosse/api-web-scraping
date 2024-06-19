import { Image } from "../models";

export const createRegisterImg = async (id: number, img: string[]) => {
    const resultImg = [];

    try {
        await Promise.all(
            img.map(async (item) => {
                const imgExists = await Image.findOne({
                    where: { url_img: item },
                });

                if (!imgExists) {
                    const saveImg = await Image.create({
                        id_item: id,
                        url_img: item,
                    });

                    if (saveImg) {
                        resultImg.push({ id: id, success: 'Imagem salva com sucesso!' });
                    }
                }
            })
        );
    } catch (error) {
        resultImg.push({ id: id, err: error });
    }

    return resultImg;
};
