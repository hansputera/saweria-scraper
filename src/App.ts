import request from "request";
import { baseURL, Transactions, userAgent } from "./Config";

export default class SAWERIA {
    constructor(readonly token: string) {}

    gotBalance() {
        return new Promise((resolve, reject) => {
            if (!this.token) {
                reject("Token required");
            }
            request({
                url: `${baseURL}/donations/balance`,
                headers: {
                    "user-agent": userAgent,
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
            request({
                url: `${baseURL}/donations/available-balance`,
                headers: {
                    "user-agent": userAgent,
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
            request({
                url: `${baseURL}/transactions`,
                headers: {
                    "user-agent": userAgent,
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
                        current:data.data.current_page
                    },
                    transaction: data.data.transactions.map((x: Transactions) => ({ pembayaran: {biaya_admin: x.cut, jumlah: x.amount_raw, tipe: x.type }, tanggal: x.created_at, donator: {nama: x.donator.first_name, email: x.donator.email, pesan: x.message}}))
                }

                resolve(result);
            });
        });
    }
}