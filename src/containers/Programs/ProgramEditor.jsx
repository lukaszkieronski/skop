import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles } from '@material-ui/core';

const styles = theme => createStyles({
    root: {
    }
})

class ProgramEditor extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        program: PropTypes.object
    }

    render = () => {
        const { classes, program } = this.props;

        return (
            <div className={classes.root}>
                <pre>{JSON.stringify(program)}</pre>
            </div>
        )
    }
}

export default withStyles(styles)(ProgramEditor);
