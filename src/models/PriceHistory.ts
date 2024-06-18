import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Crawler } from "./Crawler";

export class PriceHistory extends Model {
    public id!: number;
    public id_item!: number;
    public price!: number;
    public created_at!: Date;
}

PriceHistory.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        id_item: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "PriceHistory",
        tableName: "pricehistory",
        timestamps: false,
    }
);

PriceHistory.belongsTo(Crawler, { foreignKey: "id_item", as: "crawler" });