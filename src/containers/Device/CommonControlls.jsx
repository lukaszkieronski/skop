import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles } from '@material-ui/core';
import { Button } from 'components';
import { withContext, ModbusContext } from 'utils';

const styles = theme => createStyles({
    root: {
        display: 'flex',
        margin: theme.spacing.unit * 3
    },
    button: {
        flex: '1 0',
        marginLeft: theme.spacing.unit * 5,
        marginRight: theme.spacing.unit * 5
    }
})

class CommonControlls extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    handleStart = _ => {
        this.props.context.switch({ register: 9007, bit: 2, delay: 500 });
    }

    handleStop = _ => {
        this.props.context.switch({ register: 9007, bit: 3, delay: 500 });
    }

    handleClear = _ => {
        this.props.context.switch({ register: 9006, bit: 15, delay: 500 });
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Button className={classes.button} onClick={this.handleStart}>Start</Button>
                <Button className={classes.button} onClick={this.handleStop}>Stop</Button>
                <Button className={classes.button} onClick={this.handleClear}>Wyczyść</Button>
            </div>
        )
    }
}

export default withStyles(styles)(withContext(ModbusContext)(CommonControlls));
