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
const filterArrays_1 = require("../helpers/filterArrays");
const getAllInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    const imageLinks = [];
    const infos = [];
    const disponibilidade = [];
    var valor = "";
    try {
        // Get web page request
        const response = yield axios_1.default.get(url);
        // Load web page HTML
        const $ = cheerio.load(response.data);
        // Extract link for images
        $(".swiper-slide-inner img").each((index, element) => {
            const imageUrl = $(element).attr("src");
            if (imageUrl && imageUrl.includes("http")) {
                imageLinks.push(imageUrl); // Saves the links in the array
            }
        });
        // Extract titles
        $(".elementor-widget-container h2").each((index, element) => {
            const info = $(element).text();
            if (info) {
                infos.push(info); // Save the titles in the array
            }
        });
        // Search for availability data
        $(".elementor-widget-container .jet-listing-dynamic-terms").each((index, element) => {
            const disp = $(element).text();
            if (disp) {
                disponibilidade.push(disp); // Save the availability in the array
            }
        });
        // Search for value
        $(".jet-listing-dynamic-field__content").each((index, element) => {
            const value = $(element).text();
            if (value.includes("R$")) {
                valor = value; // Save the value in the array
            }
        });
        // Creates the array with the results
        const result = {
            infos: (0, filterArrays_1.filterArray)(infos),
            disponibilidade: disponibilidade[1],
            valor: valor,
            linksImage: imageLinks,
        };
        res.status(200).json({ result: result });
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao realizar scraping" });
    }
});
exports.getAllInfo = getAllInfo;
