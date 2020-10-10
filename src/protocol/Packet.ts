import BinaryStream from "@jsprismarine/jsbinaryutils";

export interface IPacket {
    encode(): void;
    decode(): void;
}

export class Packet extends BinaryStream {
    protected id: number = 0x00;

    constructor(buffer: Buffer) {
        super(buffer);
    }

    encode() {
        this.writeByte(this.id);
    }

    decode() {
        this.readByte();
    }
}