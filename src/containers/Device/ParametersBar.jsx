import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, Paper, Typography } from '@material-ui/core';

import { withContext, ModbusContext } from 'utils/contexts'

const styles = theme => createStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    item: {
        flex: '1 1 150px',
        display: 'flex',
        justifyContent: "space-around"
    },
    paper: {
        margin: theme.spacing.unit,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        minWidth: '120px',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        fontVariant: 'small-caps'
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
            <div className={classes.item}>
            <Paper key={index} className={classes.paper}>
                <Typography className={classes.subtitle} variant="subtitle1" color="textSecondary">
                    {parameter.name} {parameter.unit && `[${parameter.unit}]`}
                </Typography>
                <Typography variant="display1" color={"textPrimary"}>
                    {parameter.value}
                </Typography>
            </Paper>
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
