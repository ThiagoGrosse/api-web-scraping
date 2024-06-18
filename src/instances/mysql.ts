import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { log } from "console";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT), // Utilizando a porta do MySQL definida no .env
        dialect: "mysql",
        logging: false,
    }
);

sequelize
    .authenticate()
    .then(() => console.log("Conexão com o banco de dados foi bem sucedida"))
    .catch((err) =>
        console.error("Não foi possível conectar ao banco de dados:", err)
    );
