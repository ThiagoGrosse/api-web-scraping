import { Crawler } from "./Crawler";
import { Image } from "./Image";
import { PriceHistory } from "./PriceHistory";
import { Info } from "./Info";

Crawler.hasMany(Image, { foreignKey: "id_item", as: "images" });
Crawler.hasMany(PriceHistory, {
    foreignKey: "id_item",
    as: "price_history",
});
Crawler.hasMany(Info, { foreignKey: "id_item", as: "info" });

Image.belongsTo(Crawler, { foreignKey: "id_item", as: "images" });
PriceHistory.belongsTo(Crawler, { foreignKey: "id_item", as: "price_history" });
Info.belongsTo(Crawler, { foreignKey: "id_item", as: "info" });

export { Crawler, Image, PriceHistory, Info };
