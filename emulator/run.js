const path = require('path')
var args = require('minimist')(process.argv.slice(2), {
    default: {
        port: 1502
    },
    alias: {
        f: 'file',
        p: 'port',
        h: 'help',
    }
});

if (!args.f || args.h) {
    console.log(`Usage: node ${path.basename(__filename)} -f FILE [-p PORT] [-h]`)
    process.exit(1);
}

try {
    const file = args.f[0] === '/' ? args.f : `./${args.f}`;
    const dump = require(file);

    let modbus = require('jsmodbus')
    let net = require('net')
    let netServer = new net.Server()
    let server = new modbus.server.TCP(netServer, {
        holding: new Buffer(40000)
    })

    for (let index = 0; index < dump.data.length; index++) {
        const value = dump.data[index];
        server.holding.writeUInt16BE(value, index*2)
    }

    netServer.on('error', () => {
        console.error(`Cannot run server on port ${args.p}.`);
    })

    netServer.on('listening', () => {
        console.log(`Listening on port ${args.p}`)
    })

    netServer.listen(args.p)

} catch (error) {
    switch(error.code) {
        case 'MODULE_NOT_FOUND':
            console.error(`Cannot read file ${args.f}.`)
            break
        default:
            console.error(`Unknown error ${error.code}.`)
            break;
    }
}


