import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles } from '@material-ui/core';

const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

class AutomaticModeControlls extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
            <div>Automatic</div>
            </div>
        )
    }
}

export default withStyles(styles)(AutomaticModeControlls);
