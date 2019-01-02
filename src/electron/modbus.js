/* eslint-disable no-console */

const utils = require('../utils/conversion')

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
        this.lock = 0

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
                    const command = this.queue.pop();
                    if (command.set) {
                        this.client.writeSingleRegister(command.register, command.value);
                    } else {
                        this.client.readHoldingRegisters(command.register, command.count).then(this.sendResponse.bind(this));
                    }
                }
            }
        }
    }

    async setBit(register, bit, mask) {
        const packet = await this.client.readHoldingRegisters(register,1);
        let value = packet.response.body.values.pop();
        for (let i=0; i<16; i++){
            if (utils.getBit(mask, i)) value = utils.clearBit(value, i);
        }
        const set = utils.setBit(value, bit);
        this.queue.push({set:true, register, value:set});
    }

    async setRegisters(args) {
        for (let index = 0; index < args.values.length; index++) {
            const value = args.values[index];
            this.queue.push({set:true, register: args.register + index, value});
        }
    }

    async connect(onConnect, onClose) {
        await this.disconnect()
        this.socket = new net.Socket();

        this.socket.once('connect', onConnect);
        this.socket.once('close', onClose);
        this.socket.once('error', (err) => {
            console.err(err);
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

    async switch(register, bit, delay) {
        if (this.lock === 0)
        {
            this.lock ++
            const packet = await this.client.readHoldingRegisters(register,1);
            const value = packet.response.body.values.pop();
            const set = utils.setBit(value, bit);
            const reset = utils.clearBit(value, bit);
            this.queue.push({set:true, register, value:set});
            setTimeout(() => {
                this.queue.push({set:true, register, value:reset});
                this.lock --
            }, delay);
        }
    }

    setSocketOptions(args) {
        this.socketOptions = args;
    }

    async getDump() {
        let data = []
        for (let index = 0; index < 200; index++) {
            const hr = await this.client.readHoldingRegisters(index*100, 100);
            data = data.concat(hr.response.body.valuesAsArray);
        }
        return data;
    }

    async requestReport() {
        let result = {
            values: []
        }
        const packet = await this.client.readHoldingRegisters(10000,3);
        const infoArray = packet.response.body.valuesAsArray;
        const steps = infoArray[0];
        const temp = infoArray[1];
        const humidity = infoArray[2];
        result.info = { steps, temp, humidity }
        for (let step=0; step < steps; step++) {
            const stepArray = (await this.client.readHoldingRegisters(10010+step*5,5)).response.body.valuesAsArray
            result.values.push({
                step: stepArray[0],
                urms: stepArray[1],
                upeak: stepArray[2],
                irms: stepArray[3],
                ipeak: stepArray[4],
            })
        }
        this.window.send(IPC.REPORT_RESPONSE, result);
    }

    async requestProgramNames() {
        let result = {
            basic: [],
            limiter: []
        };
        for (let index=0; index<10; index++) {
            // const nameArray = (await this.client.readHoldingRegisters(1500+index*25, 25)).response.body.valuesAsArray
            result.basic.push(`Basic ${index+1}`)
        }
        for (let index=0; index<2; index++) {
            // const nameArray = (await this.client.readHoldingRegisters(1500+index*25, 25)).response.body.valuesAsArray
            result.limiter.push(`Limiter ${index+1}`)
        }
        this.window.send(IPC.PROGRAM_NAMES_RESPONSE, result);
    }

    async requestProgram(index) {
        const steps = (await this.client.readHoldingRegisters(1100+index*30, 30)).response.body.valuesAsArray
        let result = {
            steps: [],
            index
        }

        for(let i=0; i<10; i++) {
            result.steps[i] = {
                parameters: steps[i*3],
                speed: steps[i*3+1],
                value: steps[i*3+2]
            }
        }

        this.window.send(IPC.PROGRAM_RESPONSE, result);
    }
}

module.exports = Modbus;
