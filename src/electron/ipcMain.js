/* eslint-disable no-console */

const { ipcMain } = require('electron')

const Modbus = require('./modbus')
const IPC = require('./ipcCommon')


const { dialog } = require('electron')

function init(window) {

    const modbus = new Modbus(window)

    const onSocketConnect = (event, args) => {
        modbus.setSocketOptions(args);
        modbus.connect(
            () => window.send(IPC.SOCKET_STATE, {connected: true}),
            () => window.send(IPC.SOCKET_STATE, {connected: false})
        );
    }

    const onSwitch = (_, args) => {
        const { register, bit, delay} = args;
        console.log(register, bit, delay);
    }

    const onTest = (_, args) => {
        const options = {
            type: 'info',
            buttons: ['OK'],
            title: 'Info',
            message: JSON.stringify(args),
        }
        dialog.showMessageBox(window, options);
    }

    ipcMain.on(IPC.SOCKET_CONNECT, onSocketConnect);
    ipcMain.on(IPC.SOCKET_DISCONNECT, modbus.disconnect.bind(modbus));
    ipcMain.on(IPC.SWITCH, onSwitch);
    ipcMain.on(IPC.TEST, onTest)
}

module.exports = {
    init: init
};


