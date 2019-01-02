/* eslint-disable no-console */

const { ipcMain, dialog, app } = require('electron')
const fs = require('fs');

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

    const onSwitch = (_, args) => {
        const { register, bit, delay} = args;
        modbus.switch(register, bit, delay);
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

    const onSetBit = (_, args) => {
        const {bit, register, mask} = args;
        modbus.setBit(register, bit, mask)
    }

    const onSetRegisters = (_, args) => {
        modbus.setRegisters(args)
    }

    const onSaveDump = _ => {

        const options = {
            defaultPath: app.getPath('documents'),
            filters: [{
                name: 'JSON',
                extensions: ['json']
              }],
        }

        dialog.showSaveDialog(options, async name => {
            if (name) {
                const start = new Date();
                const data = await modbus.getDump();
                const end = new Date();
                fs.writeFileSync(name, JSON.stringify({
                    start, end, data
                }))
            }
        })
    }

    const onReportRequest = _ => {
        modbus.requestReport();
    }

    const onProgramNamesRequest = _ => {
        modbus.requestProgramNames();
    }

    const onProgramRequest = (_,index) => {
        modbus.requestProgram(index);
    }

    ipcMain.on(IPC.SOCKET_CONNECT, onSocketConnect);
    ipcMain.on(IPC.SOCKET_DISCONNECT, modbus.disconnect.bind(modbus));
    ipcMain.on(IPC.SWITCH, onSwitch);
    ipcMain.on(IPC.SET_BIT, onSetBit);
    ipcMain.on(IPC.SET_REGISTERS, onSetRegisters);
    ipcMain.on(IPC.SAVE_DUMP, onSaveDump);
    ipcMain.on(IPC.REPORT_REQUEST, onReportRequest);
    ipcMain.on(IPC.PROGRAM_NAMES_REQUEST, onProgramNamesRequest);
    ipcMain.on(IPC.PROGRAM_REQUEST, onProgramRequest);
    ipcMain.on(IPC.TEST, onTest)
}

module.exports = {
    init: init
};
