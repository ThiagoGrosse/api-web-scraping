import { Model, DataTypes } from "sequelize";
import { sequelize } from "../instances/mysql";
import { Crawler } from "./Crawler";

export class Info extends Model {
    public id!: number;
    public id_item!: number;
    public title!: string;
    public value!: number;
    public real_state!: string;
    public type_of_offer!: string;
    public details!: string;
    public created_at!: Date;
    public updated_at!: Date;
}

Info.init(
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
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.NUMBER,
            allowNull: false,
        },
        type_of_offer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        real_state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.JSON,
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
        modelName: "Info",
        tableName: "infos",
        timestamps: false,
    }
);

Info.belongsTo(Crawler, { foreignKey: "id_item", as: "crawler" });
