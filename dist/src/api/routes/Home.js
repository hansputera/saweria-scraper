"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const App_1 = __importDefault(require("../../App"));
const router = express_1.Router();
router.get("/", (req, res) => {
    res.json({
        balance_route: {
            total: "/balance",
            balance_cair: "/balance_cair"
        },
        transactions: "/transactions"
    });
});
router.get("/transactions", (req, res) => {
    const token = req.query.token;
    if (!token)
        return res.json({
            success: false,
            message: "Token required"
        });
    const API = new App_1.default(token);
    API.gotTransactions().then((val) => {
        res.status(200).json({
            success: true,
            result: val
        });
    }).catch((e) => {
        res.status(500).json({
            success: false,
            message: e
        });
    });
});
router.get("/balance_cair", (req, res) => {
    const token = req.query.token;
    if (!token)
        return res.json({
            success: false,
            message: "Token required"
        });
    const API = new App_1.default(token);
    API.gotAvailableBalance().then((val) => {
        res.status(200).json({
            success: true,
            result: { balance: val }
        });
    }).catch((e) => {
        res.status(500).json({
            success: false,
            message: e
        });
    });
});
router.get("/balance", (req, res) => {
    const token = req.query.token;
    if (!token)
        return res.json({
            success: false,
            message: "Token required"
        });
    const API = new App_1.default(token);
    API.gotBalance().then((val) => {
        res.status(200).json({
            success: true,
            result: { balance: val }
        });
    }).catch((e) => {
        res.status(500).json({
            success: false,
            message: e
        });
    });
});
module.exports = router;
