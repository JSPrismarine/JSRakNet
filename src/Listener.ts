import { createSocket, RemoteInfo, Socket } from "dgram";
import { Identifiers } from "./protocol/Identifiers";
import UnconnectedPing from "./protocol/UnconnectedPing";

export default class Listener {
    private readonly socket: Socket = createSocket("udp4");
    private connections: Map<string, Listener> = new Map();

    /**
     * Listens for incoming packets and handles them.
     * 
     * @param address 
     * @param port 
     */
    public listen(address: string, port: number): void {
        this.socket.bind(port, address);

        this.socket.on("error", (err: Error) => {
            throw err;
        });

        this.socket.on("message", async (buffer: Buffer, rinfo: RemoteInfo) => {
            let header = buffer.readUInt8();

            switch (header) {
                case Identifiers.UNCONNECTED_PING:
                    let result = await this.handleUnconnectedPing(buffer);
                    this.socket.send(result, 0, buffer.length, rinfo.port, rinfo.address);
                    break;
            }
        });
    }

    private async handleUnconnectedPing(buffer: Buffer): Promise<Buffer> {
        return await new Promise(resolve => {
            let decodedPacket = new UnconnectedPing(buffer);
            decodedPacket.decode();
        });
    }
}