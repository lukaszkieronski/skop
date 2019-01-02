import React from 'react';
import PropTypes from 'prop-types';

import { ParameterFactory, ModbusContext } from 'utils'

import { floatToRegister } from 'utils/conversion'

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

        const savedConfig = JSON.parse(window.localStorage.getItem('config'));
        const defaultConfig = { socket: { host: 'localhost', port: 1502 } }

        this.state = {
            config: savedConfig || defaultConfig,
            connected: false,
            registers: new Array(15000),
            programNames: {
                basic: [],
                limiter: []
            },
            setConfig: this.setConfig,
            getParameter: this.getParameter,
            saveParameters: this.saveParameters,
            saveRegister: this.saveRegister,
            connect: this.connect,
            switch: this.switch,
            saveDump: this.saveDump,
            getProgramNames: this.getProgramNames,
            getProgram: this.getProgram,
            test: this.test
        }

        ipc.on(IPC.MODBUS_RESPONSE, this.updateRegisters);
        ipc.on(IPC.PROGRAM_NAMES_RESPONSE, this.updateProgramNames);
        ipc.on(IPC.PROGRAM_RESPONSE, this.updateProgram);
        ipc.on(IPC.SOCKET_STATE, this.updateConnection);
    }

    connect = _ => {
        ipc.send(IPC.SOCKET_CONNECT, this.state.config.socket);
    }

    switch = args => {
        ipc.send(IPC.SWITCH, args);
    }

    test = args => {
        ipc.send(IPC.TEST, args);
    }

    saveDump = _ => {
        ipc.send(IPC.SAVE_DUMP);
    }

    setConfig = config => {
        this.setState({ config }, _ => {
            window.localStorage.setItem('config', JSON.stringify(config));
            this.connect();
        });
    }

    getParameter = parameterName => {
        return ParameterFactory.create(parameterName, this.state.registers);
    }

    saveParameters = parameters => {
        for (const parameterName in parameters) {
            const parameter = parameters[parameterName];
            const { value, values, register, shift, mask } = parameter;
            switch (parameter.type) {
                case 'unsigned':
                    ipc.send(IPC.SET_REGISTERS, {register, values:[value]})
                    break;
                case 'flag':
                    ipc.send(IPC.SET_BIT, {register, bit: values.indexOf(value) + (shift || 0), mask});
                    break;
                default:
                    ipc.send(IPC.SET_REGISTERS, {register, values: Array.from(floatToRegister(value))});
                    break;
            }
        }
    }

    saveRegister = args => {
        const { register, value } = args;
        ipc.send(IPC.SET_REGISTERS, {register , values:[value]});
    }

    updateConnection = (_, args) => {
        const { connected } = args;
        this.setState({ connected });
    }

    updateRegisters = (_, args) => {
        const { start, count, values } = args;
        const registers = this.state.registers.slice(0);

        for (let index = 0; index < count; index++) {
            registers[start + index] = values[index];
        }
        this.setState({ registers })
    };

    updateProgramNames = (_, args) => {
        this.setState({programNames: args})
    }

    updateProgram = (_, args) => {

    }

    getProgramNames = _ => {
        ipc.send(IPC.PROGRAM_NAMES_REQUEST);
        return ['a', 'b', 'c']
    }

    getProgram = index => {
        ipc.send(IPC.PROGRAM_REQUEST, index)
        return {index}
    }

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
