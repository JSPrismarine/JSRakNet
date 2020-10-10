"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Packet_1 = require("./Packet");
const Identifiers_1 = require("./Identifiers");
class UnconnectedPing extends Packet_1.Packet {
    constructor() {
        super(...arguments);
        this.id = Identifiers_1.Identifiers.UNCONNECTED_PING;
    }
    encode() {
        throw new Error("Method not implemented.");
    }
    decode() {
    }
}
exports.default = UnconnectedPing;
