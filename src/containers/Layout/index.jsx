import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStyles, withStyles, AppBar } from '@material-ui/core';

import { ModbusContext, withContext } from 'utils';
import { Device, Measures, Settings, Parameters } from 'containers';
import Navigation from './Navigation';
import Disconnected from './Disconnected';

const styles = theme => {
    return createStyles({
        root: {
            minHeight: "100%",
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
                <AppBar>
                    <Navigation />
                </AppBar>
                <div className={classes.toolbar}/>
                <main className={classes.content}>
                    {context.connected === true ?
                        <Switch>
                            <Route path="/device" component={Device} />
                            <Route path="/parameters" component={Parameters} />
                            <Route path="/measures" component={Measures} />
                            <Route path="/settings" component={Settings} />
                            <Redirect to="/device" />
                        </Switch> :
                        <Disconnected />
                    }

                </main>
            </div>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(Layout));
