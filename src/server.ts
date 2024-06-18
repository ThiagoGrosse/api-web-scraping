import express from "express";
import helmet from "helmet";
import router from "./routes";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./instances/mysql";
import "./models";

const app = express();
app.use(helmet());
app.use(express.json());

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use("/", router);

dotenv.config();

const PORT = process.env.PORT;

sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch((err) =>
        console.error("Erro ao sincronizar com o banco de dados:", err)
    );
