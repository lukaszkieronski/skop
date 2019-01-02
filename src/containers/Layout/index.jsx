import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStyles, withStyles, AppBar } from '@material-ui/core';

import { ModbusContext, withContext } from 'utils';
import { Device, Measures, Settings, Parameters, Debug, Programs } from 'containers';
import Navigation from './Navigation';
import Disconnected from './Disconnected';

const styles = theme => {
    return createStyles({
        root: {
            height: '100vh',
            display: "flex",
            flexDirection: "column",
        },
        content: {
            display: "flex",
            flexDirection: "column",
            flex: 1,
        },
        flex: {
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
                display: 'none'
            },
            flex: 1,
        },
        toolbar: {
            minHeight: '48px'
        }
    })
}
class Layout extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    render = () => {
        const { classes, context } = this.props;
        return (
            <div className={classes.root}>
                <AppBar className="no-print">
                    <Navigation />
                </AppBar>
                <div className={`${classes.toolbar} no-print`} />
                <main className={classes.content}>
                    <Switch>
                        <Route path="/device" component={context.connected ? Device : Disconnected} />
                        <Route path="/parameters" component={context.connected ? Parameters : Disconnected} />
                        <Route path="/measures" component={context.connected ? Measures : Disconnected} />
                        <Route path="/programs" component={context.connected ? Programs : Disconnected} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/debug" component={Debug} />
                        <Redirect to="/device" />
                    </Switch>

                </main>
            </div>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(Layout));
