"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SaweriaError extends Error {
    constructor(name, message) {
        super(message);
        this.name = name;
    }
}
exports.default = SaweriaError;
