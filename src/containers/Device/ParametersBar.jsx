import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles } from '@material-ui/core';

import { withContext, ModbusContext } from 'utils'
import { ParameterBox }  from 'components';

const styles = theme => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    item: {
        flex: '1 1 0',
        display: 'flex',
        justifyContent: "space-around"
    }
})

class ParametersBar extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        parameters: PropTypes.array,
        context: PropTypes.object
    }

    renderParameter = (parameterName, index) => {
        const { classes, context } = this.props;
        const parameter = context.getParameter(parameterName)
        return (
            <div className={classes.item} key={index}>
                <ParameterBox parameter={parameter} />
            </div>
        );
    }

    render = () => {
        const { classes, parameters } = this.props;
        return (
            <div className={classes.root}>
                {parameters.map(this.renderParameter)}
            </div>
        )
    }
}

export default withStyles(styles)(withContext(ModbusContext)(ParametersBar));
