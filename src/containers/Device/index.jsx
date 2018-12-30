import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles } from '@material-ui/core';

import ParametersBar from './ParametersBar'
import CommonControlls from './CommonControlls';
import AutomaticModeControlls from './AutomaticModeControlls'
import ManualModeControlls from './ManualModeControlls'

import { withContext } from 'utils/contexts';
import { ModbusContext } from 'utils/contexts';

const styles = theme => createStyles({
    root: {
        margin: theme.spacing.unit,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
    },
    grow: {
        flex: 1,
        display: 'flex'
    }
})

class Device extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    state = {
        topParameters: ['urange', 'urms', 'upeak', 'irange', 'irms', 'ipeak'],
        bottomParameters: ['temperature', 'humidity', 'mode', 'hv', 'time', 'date']
    }

    render = () => {
        const { classes, context } = this.props;
        const mode = context.getParameter('mode');
        const { topParameters, bottomParameters } = this.state;
        return (
            <div className={classes.root}>
                <ParametersBar parameters={topParameters} />
                <div className={classes.grow}>
                    {mode.value === 'Auto' && <AutomaticModeControlls />}
                    {mode.value === 'Manual' && <ManualModeControlls />}
                </div>
                <CommonControlls />
                <ParametersBar parameters={bottomParameters} />
            </div>
        )
    }
}

export default withStyles(styles)(withContext(ModbusContext)(Device));
