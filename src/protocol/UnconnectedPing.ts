import { IPacket, Packet } from "./Packet";
import { Identifiers } from "./Identifiers";

export default class UnconnectedPing extends Packet implements IPacket {
    public id: number = Identifiers.UNCONNECTED_PING;

    encode(): void {
        throw new Error("Method not implemented.");
    }
    
    decode(): void {
        super.decode()
        this.writeLong()
    }
}