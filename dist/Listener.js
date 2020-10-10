"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dgram_1 = require("dgram");
const Identifiers_1 = require("./protocol/Identifiers");
const UnconnectedPing_1 = __importDefault(require("./protocol/UnconnectedPing"));
class Listener {
    constructor() {
        this.socket = dgram_1.createSocket("udp4");
        this.connections = new Map();
    }
    /**
     * Listens for incoming packets and handles them.
     *
     * @param address
     * @param port
     */
    listen(address, port) {
        this.socket.bind(port, address);
        this.socket.on("error", (err) => {
            throw err;
        });
        this.socket.on("message", async (buffer, rinfo) => {
            let header = buffer.readUInt8();
            switch (header) {
                case Identifiers_1.Identifiers.UNCONNECTED_PING:
                    let result = await this.handleUnconnectedPing(buffer);
                    this.socket.send(result, 0, buffer.length, rinfo.port, rinfo.address);
                    break;
            }
        });
    }
    async handleUnconnectedPing(buffer) {
        return await new Promise(resolve => {
            let decodedPacket = new UnconnectedPing_1.default(buffer);
            decodedPacket.decode();
        });
    }
}
exports.default = Listener;
