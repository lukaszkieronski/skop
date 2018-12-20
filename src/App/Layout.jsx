import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';

import ContextSetters from './ContextSetters';
import Spacer from './Spacer'
import { withAppContext } from './AppContext';

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
        const { foo } = this.props.appContext;
        return (
            <div className={classes.root}>
                <AppBar color={foo} className={classes.appBar} position="static">
                    <Toolbar></Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <ContextSetters/>
                    <Spacer/>
                    <ContextSetters/>
                </main>
            </div>
        )
    }
};

export default withAppContext(withStyles(styles)(Layout));