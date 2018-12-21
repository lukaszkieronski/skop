import React from 'react';
import { CssBaseline } from '@material-ui/core';

import AppContext from 'contexts/ApplicationContext';
import Layout from 'containers/Layout.jsx';

import applicationState from './ApplicationState.json'

class Application extends React.Component {

    state = {
        ...applicationState,
        set: this.setState.bind(this)
    }

    render = () => {
        return (
            <CssBaseline>
                <AppContext.Provider value={this.state}>
                    <Layout/>
                </AppContext.Provider>
            </CssBaseline>
        )
    }
};

export default Application;
