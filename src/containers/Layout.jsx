import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, AppBar, Toolbar, Typography } from '@material-ui/core';

import { ContextSetters, Spacer, Button } from 'components'
import { ApplicationContext, withContext } from 'utils/contexts'

import IPC from 'electron/ipcCommon'
import Register from 'components/Register';
const ipc = window.require('electron').ipcRenderer

const styles = theme => createStyles({
    root: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
    },
    content: {
        margin: theme.spacing.unit * 2,
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
})

class Layout extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    render = () => {
        const { classes } = this.props;
        const { color } = this.props.context;
        return (
            <div className={classes.root}>
                <AppBar color={color} className={classes.appBar} position="static" >
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            Photos
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <ContextSetters />
                    <Button onClick={this.connect}>Connect</Button>
                    <Button onClick={this.disconnect}>Disconnect</Button>
                    <Button onClick={this.enqueue}>Queue</Button>
                    <Register index={9000}/>
                    <Register index={9001}/>
                    <Register index={10000}/>
                    <Spacer />
                    <ContextSetters />
                </main>
            </div>
        )
    }

    connect = () => {
        ipc.send(IPC.SOCKET_CONNECT, {hostname: 'localhost', port:'1502'})
    }

    disconnect = () => {
        ipc.send(IPC.SOCKET_DISCONNECT);
    }

    enqueue = () => {
        ipc.send(IPC.TEST, {delay:1200})
    }
}

export default withContext(ApplicationContext)(withStyles(styles)(Layout));
