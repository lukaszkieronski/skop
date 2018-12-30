import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles } from '@material-ui/core';
import { Button } from 'components';
import { withContext } from 'utils/contexts';
import { ModbusContext } from 'utils/contexts';

const styles = theme => createStyles({
    root: {
        display: 'flex',
        margin: theme.spacing.unit * 3
    }
})

class Debug extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    setAutomatic = _ => {
        const { context } = this.props;
        context.saveParameters({
            mode: {
                "type": "flag",
                "register": 9003,
                "shift": 1,
                "mask": 6,
                "value": "Auto",
                "values": [
                    "Auto",
                    "Manual"
                ],
            }
        });
    }

    setManual = _ => {
        const { context } = this.props;
        context.saveParameters({
            mode: {
                "type": "flag",
                "register": 9003,
                "shift": 1,
                "mask": 6,
                "value": "Manual",
                "values": [
                    "Auto",
                    "Manual"
                ],
            }
        });
    }

    saveDump = _ => {
        const { context } = this.props;
        context.saveDump();
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Button onClick={this.setAutomatic}>Automatic</Button>
                <Button onClick={this.setManual}>Manual</Button>
                <Button onClick={this.saveDump}>Zrzut pamięci</Button>
            </div>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(Debug));
