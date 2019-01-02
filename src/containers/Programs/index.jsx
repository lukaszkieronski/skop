import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles, Paper, List, ListItem, ListItemText, ListSubheader } from '@material-ui/core';
import { withContext, ModbusContext } from 'utils/contexts';

import ProgramEditor from './ProgramEditor'

const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex'
    },
    drawer: {
        minWidth: '200px',
        overflowY: 'auto'
    },
})

class Programs extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    state = {
        selectedProgram: -1
    }

    componentDidMount() {
        this.props.context.getProgramNames();
    }

    renderListItem = (startIndex) => (name, index) => {
        const { selectedProgram } = this.state;
        return (
            <ListItem button selected={selectedProgram === startIndex+index} onClick={this.selectProgram(startIndex+index)} key={index}>
                <ListItemText primary={name} />
            </ListItem>
        )
    }

    selectProgram = selectedProgram => () => {
        this.setState({ selectedProgram })
        this.props.context.getProgram(selectedProgram);
    }

    render = () => {
        const { classes, context } = this.props;
        const { programNames } = context;
        const { selectedProgram } = this.state;

        return (
            <div className={classes.root}>
                <Paper className={classes.drawer}>
                    <List dense>
                        <ListSubheader component="div">Programy podstawowe</ListSubheader>
                        {programNames.basic.map(this.renderListItem(0))}
                        <ListSubheader component="div">Programy ochronników</ListSubheader>
                        {programNames.limiter.map(this.renderListItem(10))}

                    </List>
                </Paper>
                <ProgramEditor selected={selectedProgram} />
            </div>
        )
    }
}

export default withStyles(styles)(withContext(ModbusContext)(Programs));
