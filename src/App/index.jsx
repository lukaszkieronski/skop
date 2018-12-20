import React from 'react';
import { CssBaseline } from '@material-ui/core';

import AppContext from './AppContext';
import Layout from './Layout.jsx';
import initialState from './state.json';

class Application extends React.Component {
    state = {
        ...initialState,
        set: this.setState.bind(this),
    };
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