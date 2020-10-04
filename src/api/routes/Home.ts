import { Router } from "express";
import SAWERIA from "../../App";

const router = Router();

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
    const token = req.query.token as string;
    if (!token) return res.json({
        success: false,
        message: "Token required"
    });

    const API = new SAWERIA(token);
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
    })
});

router.get("/balance_cair", (req, res) => {
    const token = req.query.token as string;
    if (!token) return res.json({
        success: false,
        message: "Token required"
    });

    const API = new SAWERIA(token);
    API.gotAvailableBalance().then((val) => {
        res.status(200).json({
            success: true,
            result: { balance: val }
        });
    }).catch((e) => {
        res.status(500).json({
            success: false,
            message: e
        })
    })
});

router.get("/balance", (req, res) => {
    const token = req.query.token as string;
    if (!token) return res.json({
        success: false,
        message: "Token required"
    });

    const API = new SAWERIA(token);
    API.gotBalance().then((val) => {
        res.status(200).json({
            success: true,
            result: { balance: val }
        });
    }).catch((e) => {
        res.status(500).json({
            success: false,
            message: e
        })
    })
});

export = router;