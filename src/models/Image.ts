import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Crawler } from "./Crawler";

export class Image extends Model {
    public id!: number;
    public id_item!: number;
    public url_img!: string;
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
        url_img: {
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