import React from 'react';
import { CssBaseline } from '@material-ui/core';

import state from 'state.json'
import { ApplicationContext } from 'utils/contexts'
import { Layout } from 'containers';

class Application extends React.Component {

    state = {
        ...state,
        set: this.setState.bind(this)
    }

    render = () => {
        return (
            <CssBaseline>
                <ApplicationContext.Provider value={this.state}>
                    <Layout />
                </ApplicationContext.Provider>
            </CssBaseline>
        )
    }
};

export default Application;
