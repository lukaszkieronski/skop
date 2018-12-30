import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles, Typography, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { withContext } from 'utils/contexts';
import { ModbusContext } from 'utils/contexts';

import { getBit, setBit } from 'utils/conversion'

const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
    },
    panel: {
        flex: '1 1 0',
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing.unit * 5
    },
    paper: {
        flex: '1 1 0',
        overflowY: 'auto'
    }
})

class AutomaticModeControlls extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    getLimiterProgramNames = _ => {
        return ['O1', 'O2'];
    }

    getProgramNames = _ => {
        return ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10']
    }


    isProgramSelected = (isLimiterProgram, index) => {
        const { context } = this.props;
        const register = context.registers[9002];
        if (isLimiterProgram) {
            if ( getBit(register, 12) !== 1) return false;
            const foo = getBit(register,index);
            return foo === 1;
        } else {
            if ( getBit(register, 12) !== 0) return false;
            const bar = getBit(register,(index+2));
            return bar === 1;
        }
    }

    selectProgram = (isLimiterProgram, index) => () => {
        const { context } = this.props;
        let value = 0;
        if (isLimiterProgram) {
            value = setBit(value, 12);
            value = setBit(value, index);
        } else {
            value = setBit(value, index + 2);
        }
        const register = 9006;
        context.saveRegister({register, value})
    }

    renderProgram = (isLimiterProgram) => (programName, index) => {
        const isSelected = this.isProgramSelected(isLimiterProgram, index);
        return <ListItem key={index} selected={isSelected} onClick={this.selectProgram(isLimiterProgram, index)} button><ListItemText primary={programName} /></ListItem>
    }

    render = () => {
        const { classes } = this.props;
        const limiterProgramNames = this.getLimiterProgramNames();
        const programNames = this.getProgramNames();
        return (
            <div className={classes.root}>
                <div className={classes.panel}>
                    <Typography variant="h4" gutterBottom>Ochronniki</Typography>
                    <Paper className={classes.paper}>
                        <List>
                            {limiterProgramNames.map(this.renderProgram(true))}
                        </List>
                    </Paper>
                </div>
                <div className={classes.panel}>
                    <Typography variant="h4" gutterBottom>Podstawowe</Typography>
                    <Paper className={classes.paper}>
                        <List>
                            {programNames.map(this.renderProgram(false))}
                        </List>
                    </Paper>
                </div>
            </div>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(AutomaticModeControlls));
