/* eslint-disable no-console */

const { ipcMain } = require('electron')

const Modbus = require('./modbus')
const IPC = require('./ipcCommon')


function init(window) {

    const modbus = new Modbus(window)

    const onSocketConnect = (event, args) => {
        modbus.setSocketOptions(args);
        modbus.connect(
            () => window.send(IPC.SOCKET_STATE, {connected: true}),
            () => window.send(IPC.SOCKET_STATE, {connected: false})
        );
    }

    ipcMain.on(IPC.SOCKET_CONNECT, onSocketConnect);
    ipcMain.on(IPC.SOCKET_DISCONNECT, modbus.disconnect.bind(modbus));
    ipcMain.on(IPC.TEST, modbus.test.bind(modbus))
}

module.exports = {
    init: init
};


