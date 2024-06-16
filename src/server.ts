import express from "express";
import helmet from "helmet";
import router from "./routes";
import path from "path";

const app = express();
app.use(helmet());
app.use(express.json());

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use("/", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});