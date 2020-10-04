const userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36 Edg/85.0.564.68";
const baseURL = "https://api.saweria.co";

interface Transactions {
    amount_raw: number;
    created_at: string;
    cut: number;
    donator: {
        email: string;
        first_name: string;
    }
    failure_code: boolean | null;
    id: string,
    message: string,
    status: string,
    type: string
}

export {
    userAgent,
    baseURL,
    Transactions
}