import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Crawler } from "./Crawler";

export class Image extends Model {
    public id!: number;
    public id_item!: number;
    public url_img_01!: string;
    public url_img_02!: string;
    public url_img_03!: string;
    public url_img_04!: string;
    public url_img_05!: string;
    public url_img_06!: string;
    public url_img_07!: string;
    public url_img_08!: string;
    public url_img_09!: string;
    public url_img_10!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Image.init(
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
        url_img_01: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_02: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_03: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_04: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_05: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_06: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_07: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_08: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_09: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        url_img_10: {
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
        modelName: "Image",
        tableName: "images",
        timestamps: false,
    }
);

Image.belongsTo(Crawler, { foreignKey: "id_item", as: "crawler" });