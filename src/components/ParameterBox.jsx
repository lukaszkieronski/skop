import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles, Paper, Typography } from '@material-ui/core';

const styles = theme => createStyles({
    root: {
        margin: theme.spacing.unit,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        minWidth: '120px',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        fontVariant: 'small-caps',
        textAlign: "center",
    }
})

class ParameterBox extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        parameter: PropTypes.object
    }

    render = () => {
        const { classes, parameter } = this.props;
        const { name, unit, value } = parameter || {
            name: '', unit: '', value:''
        };
        return (
            <div className={classes.root}>
                <Paper className={classes.root}>
                    <Typography variant="subtitle1" color="textSecondary">
                        {name} {unit}
                    </Typography>
                    <Typography variant="display1" color={"textPrimary"}>
                        {value}
                    </Typography>
                </Paper>

            </div>
        )
    }
}

export default withStyles(styles)(ParameterBox);
