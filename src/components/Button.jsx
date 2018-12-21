import React from 'react';
import { createStyles, withStyles, Button as MButton } from '@material-ui/core';

const styles = theme => createStyles({
    root: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        padding: theme.spacing.unit * 2
    }
})

class Button extends React.Component {
    render = () => {
        const { classes, children, ...otherProps } = this.props;
        return (
            <MButton
                className={classes.root}
                variant="contained"
                {...otherProps}
            >{children}</MButton>
        )
    }
};

export default withStyles(styles)(Button);
