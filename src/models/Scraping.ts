import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Crawler } from "./Crawler";

export class Scraping extends Model {
    public id!: number;
    public id_item!: number;
    public value!: number;
    public sale!: boolean;
    public rent!: boolean;
    public real_state!: string;
    public details!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Scraping.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        id_item: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        value: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        sale: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        rent: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        real_state: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "",
        },
        details: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "Scraping",
        tableName: "scrapings",
        timestamps: false,
    }
);

Scraping.belongsTo(Crawler, { foreignKey: "id_item", as: "crawler" });
