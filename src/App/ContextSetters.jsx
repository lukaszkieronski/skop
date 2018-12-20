import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import { withAppContext } from './AppContext';
import { Button } from '@material-ui/core';

import Spacer from './Spacer'

const styles = theme => createStyles({
    root: {
    },
    button: {
        margin: theme.spacing.unit,
    },
    flex: {
        display: 'flex'
    }
})

class ContextSetters extends React.Component {
    setFoo = foo => () => this.props.appContext.set({ foo })

    render = () => {
        const { classes, appContext } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.flex}>
                    <Button className={classes.button} variant="contained" color={appContext.foo} onClick={this.setFoo("primary")}> Primary </Button>
                    <Spacer/>
                    <Button className={classes.button} variant="contained" color={appContext.foo} onClick={this.setFoo("secondary")}> Secondary </Button>
                </div>
            </div>
        )
    }
};

export default withAppContext(withStyles(styles)(ContextSetters));