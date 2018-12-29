import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, Typography } from '@material-ui/core';
import { Button } from 'components';

import { ModbusContext, withContext } from 'utils';


const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

class Disconnected extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    render = () => {
        const { classes, context } = this.props;
        return (
            <div className={classes.root}>
                <Typography variant='headline'>Brak połączenia z urządzeniem !</Typography>
                <Button onClick={context.connect}>Połącz ponownie</Button>
            </div>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(Disconnected));

