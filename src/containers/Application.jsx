import React from 'react';
import { CssBaseline } from '@material-ui/core';

import state from 'state.json'
import { ApplicationContext } from 'utils/contexts'
import { Layout } from 'containers';

import IPC from 'electron/ipcCommon'
const ipc = window.require('electron').ipcRenderer

class Application extends React.Component {

    state = {
        ...state,
        registers: new Array(15000),
        set: this.setState.bind(this)
    }


    constructor(props) {
        super(props);
        ipc.on(IPC.MODBUS_RESPONSE, this.updateRegisters);
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
        return (
            <CssBaseline>
                <ApplicationContext.Provider value={this.state}>
                    <Layout />
                </ApplicationContext.Provider>
            </CssBaseline>
        )
    }
}

export default Application;
