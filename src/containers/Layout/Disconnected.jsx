import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles } from '@material-ui/core';
import { Button } from 'components';

import { ModbusContext, withContext } from 'utils/contexts';


const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

class Disconnected extends React.Component {

    static propTypes = {
        classes: PropTypes.object
    }

    render = () => {
        const { classes, context } = this.props;
        return (
            <div className={classes.root}>
                <Button onClick={context.connect}>Połącz</Button>
            </div>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(Disconnected));

