import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';

const styles = theme => createStyles({
    root: {
        display: 'flex',
        flexWrap: true,
        minWidth: 0
    },
    child: {
        flex: '1 1 0',
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
})

class EvenSize extends React.Component {
    applyClass = (child, index) => {
        return React.cloneElement(child, {
            key: index,
            className: `${this.props.classes.child} ${child.props.className||''}`,
            style: { minWidth: `${this.props.itemMinWidth||0}px`}
        })
    }

    render = () => {
        const { classes, children } = this.props;
        return (
            <div className={classes.root}>
                { children.map(this.applyClass) }
            </div>
        )}
};

export default withStyles(styles)(EvenSize);
