import { Crawler } from "./Crawler";
import { Image } from "./Image";
import { PriceHistory } from "./PriceHistory";
import { Scraping } from "./Scraping";

Crawler.hasMany(Image, { foreignKey: "id_item", as: "image" });
Crawler.hasMany(PriceHistory, {
    foreignKey: "id_item",
    as: "price_history",
});
Crawler.hasMany(Scraping, { foreignKey: "id_item", as: "scraping" });

Image.belongsTo(Crawler, { foreignKey: "id_item", as: "image" });
PriceHistory.belongsTo(Crawler, { foreignKey: "id_item", as: "price_history" });
Scraping.belongsTo(Crawler, { foreignKey: "id_item", as: "scraping" });

export { Crawler, Image, PriceHistory, Scraping };
