import React from 'react';
import { createStyles, withStyles, AppBar, Toolbar } from '@material-ui/core';

import { ContextSetters, Spacer } from 'components'
import { ApplicationContext, withContext } from 'utils/contexts'

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
    render = () => {
        const { classes } = this.props;
        const { color } = this.props.context;
        return (
            <div className={classes.root}>
                <AppBar color={color} className={classes.appBar} position="static">
                    <Toolbar></Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <ContextSetters />
                    <Spacer />
                    <ContextSetters />
                </main>
            </div>
        )
    }
};

export default withContext(ApplicationContext)(withStyles(styles)(Layout));
