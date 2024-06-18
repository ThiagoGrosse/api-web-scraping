import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";

export class Crawler extends Model {
    public id!: number;
    public url!: string;
    public store!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Crawler.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        store: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: "Crawler",
        tableName: "crawlers",
        timestamps: false,
    }
);
