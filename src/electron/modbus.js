/* eslint-disable no-console */

const jsmodbus = require('jsmodbus');
const net = require('net')

const IPC = require('./ipcCommon')


const timeout = ms => new Promise(res => setTimeout(res, ms))

class Modbus {

    constructor(window) {
        this.window = window;
        this.socketOptions = undefined;
        this.socket = undefined;
        this.client = undefined;
        this.queue = []
        this.last = Date.now()

        setInterval(this.processQueue.bind(this), 100);
    }

    sendResponse(packet) {
        const {start, count} = packet.request.body;
        const {values} = packet.response.body;
        this.window.send(IPC.MODBUS_RESPONSE, {start, count, values});
    }


    getDisplayVariables() {
        this.client.readHoldingRegisters(9000,100).then(this.sendResponse.bind(this))
        this.client.readHoldingRegisters(9100,100).then(this.sendResponse.bind(this))
        this.client.readHoldingRegisters(9200,100).then(this.sendResponse.bind(this))
    }

    async processQueue() {
        if (this.socket && this.socket.readyState === 'open') {
            const diff = Date.now() - this.last;
            if (diff > 1000) {
                this.getDisplayVariables();
                this.last = Date.now()
            } else {
                if (this.queue.length > 0) {
                    console.log(this.queue.pop())
                    this.client.readHoldingRegisters(10000,100).then(this.sendResponse.bind(this))
                }
            }
        }
    }

    async connect(onConnect, onClose) {
        await this.disconnect()
        this.socket = new net.Socket();

        this.socket.once('connect', onConnect);
        this.socket.once('close', onClose);
        this.socket.once('error', (err) => {
            console.log(err);
        })

        this.client = new jsmodbus.client.TCP(this.socket, 1);
        return this.socket.connect(this.socketOptions);
    }

    async disconnect() {
        if (this.socket) {
            await this.socket.end();
            this.socket = undefined
            this.client = undefined
            return await timeout(100);
        }
    }

    setSocketOptions(args) {
        this.socketOptions = args;
    }

    test(e, a) {
        this.queue.push(a);
    }
}

module.exports = Modbus;
