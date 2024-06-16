"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = __importDefault(require("./routes"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/", routes_1.default);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
