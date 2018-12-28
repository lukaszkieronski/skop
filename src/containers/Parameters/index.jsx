import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles } from '@material-ui/core';

const styles = theme => createStyles({
    root: {
    }
})

class Component extends React.Component {

    static propTypes = {
        classes: PropTypes.object
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            </div>
        )
    }
}

export default withStyles(styles)(Component);
