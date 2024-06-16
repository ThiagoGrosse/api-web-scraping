"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllInfo = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const getAllInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const imageLinks = [];
    var infos = "";
    try {
        // Get web page request
        const response = yield axios_1.default.get(url);
        // Load web page HTML
        const $ = cheerio.load(response.data);
        // // Extract link for images
        $(".w-slider img").each((index, element) => {
            const img = $(element).attr("src");
            if (img && img.includes("http")) {
                imageLinks.push(img); // Saves the links in the array
            }
        });
        // Extract infos
        $(".div-block-65").each((index, element) => {
            const info = $(element).text();
            if (info) {
                infos = info; // Save the infos in the array
            }
        });
        const linhas = infos.split("\n").filter((linha) => linha.trim() !== "");
        const info = {};
        linhas.forEach((linha) => {
            const partes = linha.split(":");
            if (partes.length === 2) {
                const chave = partes[0].trim();
                const valor = partes[1].trim();
                if (!chave.includes("Compartilhe") && !chave.includes("Ref")) {
                    info[chave] = valor;
                }
            }
        });
        // Creates the array with the results
        const result = {
            informacoes: info,
            linksImage: imageLinks,
        };
        res.status(200).json({ result: result });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao realizar scraping" });
    }
});
exports.getAllInfo = getAllInfo;
