import React from 'react';
import { createStyles, withStyles, Button } from '@material-ui/core';

import { Spacer } from 'components'
import { withContext, ApplicationContext } from 'utils/contexts';

const styles = theme => createStyles({
    root: {
    },
    button: {
        margin: theme.spacing.unit,
    },
    flex: {
        display: 'flex'
    }
})

class ContextSetters extends React.Component {
    setColor = color => () => this.props.context.set({ color })

    render = () => {
        const { classes } = this.props;
        const { color } = this.props.context;
        return (
            <div className={classes.root}>
                <div className={classes.flex}>
                    <Button className={classes.button} variant="contained" color={color} onClick={this.setColor("primary")}> Primary </Button>
                    <Spacer/>
                    <Button className={classes.button} variant="contained" color={color} onClick={this.setColor("secondary")}> Secondary </Button>
                </div>
            </div>
        )
    }
};

export default withContext(ApplicationContext)(withStyles(styles)(ContextSetters));
