"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Packet = void 0;
const jsbinaryutils_1 = __importDefault(require("@jsprismarine/jsbinaryutils"));
class Packet extends jsbinaryutils_1.default {
    constructor(buffer) {
        super(buffer);
        this.id = 0x00;
    }
    encode() {
        this.writeByte(this.id);
    }
    decode() {
        this.readByte();
    }
}
exports.Packet = Packet;
