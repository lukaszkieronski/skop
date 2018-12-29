import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles } from '@material-ui/core';

import { withContext, ModbusContext } from 'utils';

const styles = theme => createStyles({
    root: {
        display: 'flex'
    }
})

class ContextSetters extends React.Component {

    static propTypes = {
        context: PropTypes.object,
        index: PropTypes.number
    }

    render = () => {
        const { registers } = this.props.context;
        const { index } = this.props;
        return (
            <div>R[{index}] = {registers[index]}</div>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(ContextSetters));
