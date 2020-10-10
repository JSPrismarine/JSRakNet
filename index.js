const Listener = require('./listener')
const BinaryStream = require('@jsprismarine/jsbinaryutils').default
const DataPacket = require('./protocol/data_packet')

// Script intended to test, it istantiate a new RakNet listener 
class Index {

    constructor() {
        this.listener = (new Listener).listen('0.0.0.0', 19132)
        this.listener.on('test', () => {
            console.log('Got a new connection')
        })
        this.listener.on('unconnectedPong', (query) => {
            query.setMotd('Rewritten MOTD')
        })
    }

}

new Index()
