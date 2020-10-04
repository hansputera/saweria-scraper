export default class SaweriaError extends Error {
    constructor(public name: string, message?: string) {
        super(message);
    }
}