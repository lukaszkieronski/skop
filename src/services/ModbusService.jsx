import React from 'react';
import PropTypes from 'prop-types';

import { ParameterFactory, ModbusContext } from 'utils'

import IPC from 'electron/ipcCommon'
const ipc = window.require('electron').ipcRenderer

class ModbusService extends React.Component {

    static propTypes = {
        children: PropTypes.object
    }

    componentDidMount() {
        this.connect();
    }

    constructor(props) {
        super(props);
        ipc.on(IPC.MODBUS_RESPONSE, this.updateRegisters);
        ipc.on(IPC.SOCKET_STATE, this.updateConnection);
        this.state = {
            connected: false,
            registers: new Array(15000),
            getParameter: this.getParameter,
            connect: this.connect,
            switch: this.switch,
            test: this.test
        }
    }

    connect = _ => {
        ipc.send(IPC.SOCKET_CONNECT, {hostname: 'localhost', port:1502});
    }

    switch = args => {
        ipc.send(IPC.SWITCH, args);
    }

    test = args => {
        ipc.send(IPC.TEST, args);
    }

    getParameter = parameterName => {
        return ParameterFactory.create(parameterName, this.state.registers);
    }

    updateConnection = (_, args) => {
        const { connected } = args;
        this.setState({connected});
    }

    updateRegisters = (_, args) => {
        const { start, count, values } = args;
        const registers = this.state.registers.slice(0);

        for (let index = 0; index < count; index++) {
            registers[start + index] = values[index];
        }
        this.setState({registers})
    };


    render = () => {
        const { children } = this.props;
        return (
            <ModbusContext.Provider value={this.state}>
                {children}
            </ModbusContext.Provider>
        )
    }
}

export default ModbusService;
