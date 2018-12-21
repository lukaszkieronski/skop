import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import { AppBar, Toolbar } from '@material-ui/core';

import ContextSetters from 'components/ContextSetters';
import Spacer from 'components/Spacer'
import { withApplicationContext } from 'contexts/ApplicationContext';

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
        const { foo } = this.props.applicationContext;
        return (
            <div className={classes.root}>
                <AppBar color={foo} className={classes.appBar} position="static">
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

export default withApplicationContext(withStyles(styles)(Layout));
