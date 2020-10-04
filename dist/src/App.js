"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const Config_1 = require("./Config");
class SAWERIA {
    constructor(token) {
        this.token = token;
    }
    gotBalance() {
        return new Promise((resolve, reject) => {
            if (!this.token) {
                reject("Token required");
            }
            request_1.default({
                url: `${Config_1.baseURL}/donations/balance`,
                headers: {
                    "user-agent": Config_1.userAgent,
                    "Authorization": this.token
                }
            }, (error, res, data) => {
                if (error) {
                    return reject(error);
                }
                if (res.statusCode != 200) {
                    return reject(`${res.statusCode} ${res.statusMessage}`);
                }
                resolve(JSON.parse(data).data.balance);
            });
        });
    }
    gotAvailableBalance() {
        return new Promise((resolve, reject) => {
            if (!this.token) {
                return reject("Token required");
            }
            request_1.default({
                url: `${Config_1.baseURL}/donations/available-balance`,
                headers: {
                    "user-agent": Config_1.userAgent,
                    "Authorization": this.token
                }
            }, (error, res, data) => {
                if (error) {
                    return reject(error);
                }
                if (res.statusCode != 200) {
                    return reject(`${res.statusCode} ${res.statusMessage}`);
                }
                resolve(JSON.parse(data).data["available-balance"]);
            });
        });
    }
    gotTransactions() {
        return new Promise((resolve, reject) => {
            if (!this.token) {
                reject("Token required");
            }
            request_1.default({
                url: `${Config_1.baseURL}/transactions`,
                headers: {
                    "user-agent": Config_1.userAgent,
                    "Authorization": this.token
                }
            }, (error, res, data) => {
                if (error) {
                    return reject(error);
                }
                if (res.statusCode != 200) {
                    return reject(`${res.statusCode} ${res.statusMessage}`);
                }
                data = JSON.parse(data);
                const result = {
                    pages: {
                        total: data.data.pages,
                        current: data.data.current_page
                    },
                    transaction: data.data.transactions.map((x) => ({ pembayaran: { biaya_admin: x.cut, jumlah: x.amount_raw, tipe: x.type }, tanggal: x.created_at, donator: { nama: x.donator.first_name, email: x.donator.email, pesan: x.message } }))
                };
                resolve(result);
            });
        });
    }
}
exports.default = SAWERIA;
