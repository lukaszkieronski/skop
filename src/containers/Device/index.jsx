import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles } from '@material-ui/core';

import ParametersBar from './ParametersBar'

const styles = theme => createStyles({
    root: {
        margin: theme.spacing.unit,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    grow: {
        flex: 1
    }
})

class Device extends React.Component {

    static propTypes = {
        classes: PropTypes.object
    }

    state = {
        topParameters: ['urange', 'urms', 'upeak', 'irange', 'irms', 'ipeak' ],
        bottomParameters: ['temperature', 'humidity', 'mode', 'hv', 'hour', 'date']
    }

    render = () => {
        const { classes } = this.props;
        const { topParameters, bottomParameters } = this.state;
        return (
            <div className={classes.root}>
            <ParametersBar parameters={topParameters}/>
            <div className={classes.grow}></div>
            <ParametersBar parameters={bottomParameters}/>
            </div>
        )
    }
}

export default withStyles(styles)(Device);
