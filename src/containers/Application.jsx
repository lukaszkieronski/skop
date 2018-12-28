import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

import { ModbusService } from 'components';
import { Layout } from 'containers';

class Application extends React.Component {

    render = () => {
        return (
            <CssBaseline>
                <ModbusService>
                    <Router>
                        <Layout />
                    </Router>
                </ModbusService>
            </CssBaseline>
        )
    }
}

export default Application;
