import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, Paper, List, ListItem, ListItemText } from '@material-ui/core';

import IPC from 'electron/ipcCommon'

import { Button } from 'components';
import { withContext, ModbusContext } from 'utils/contexts';
import Report from './Report'
import { getBit } from 'utils/conversion'

const ipc = window.require('electron').ipcRenderer

const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
    },
    drawer: {
        minWidth: '200px',
        overflowY: 'auto'
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing.unit * 3
    }
})

class Measures extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    state = {}

    componentDidMount() {
        ipc.on(IPC.REPORT_RESPONSE, this.updateCurrentMeasures);
        this.selectCurrentMeasures()
    }

    componentWillUnmount() {
        ipc.off(IPC.REPORT_RESPONSE, this.updateCurrentMeasures);
    }

    renderItem = (item, index) => <ListItem key={index} button><ListItemText primary={item} /></ListItem>

    selectCurrentMeasures = _ => {
        ipc.send(IPC.REPORT_REQUEST);
    }

    updateCurrentMeasures = (event, response) => {
        const { context } = this.props;
        const { info, values } = response;

        const newState = {
            values: []
        }

        const Urange = context.getParameter('plotUrange').value;
        const UrmsC = context.getParameter('plotUrmsCorrection').value;
        const UpeakC = context.getParameter('plotUpeakCorrection').value;
        const Irange = context.getParameter('plotIrange').value;
        const IrmsC = context.getParameter('plotIrmsCorrection').value;
        const IpeakC = context.getParameter('plotIpeakCorrection').value;

        for (let step=0; step<info.steps; step++) {
            const stepData = values[step];
            stepData.ipeak = stepData.ipeak * Irange * IpeakC / 1000;
            stepData.irms = stepData.irms * Irange * IrmsC / 1000;
            stepData.upeak = stepData.upeak * Urange * UpeakC / 1000;
            stepData.urms =  stepData.urms * Urange * UrmsC / 1000;
            newState.values.push(stepData);
        }

        if (getBit(context.registers[9002], 12) === 1) {

            const UrmsRef = context.getParameter('plotLimUrmsRef').value;
            const IrmsRef = context.getParameter('plotLimIrmsRef').value;
            const Irms = context.getParameter('plotLimUrms').value;
            const Urms = context.getParameter('plotLimIrms').value;


            newState.urms = {
                name: 'Urms',
                unit: '[kV]',
                value: `${UrmsRef} +/- ${Irms}`
            }
            newState.irms = {
                name: 'Irms',
                unit: '[mA]',
                value: `${IrmsRef} +/- ${Urms}`
            }
            newState.fi = context.getParameter('plotLimFi')
            newState.urmsMean = undefined
            newState.irmsMean = undefined
        } else {
            newState.urmsMean = context.getParameter('plotLimUrmsMean')
            newState.irmsMean = context.getParameter('plotLimIrmsMean')
            newState.urms = undefined
        }
        this.setState(newState);

    }

    printReport = _ => {
        window.print()
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Paper className={`${classes.drawer} no-print`}>
                    <List dense>
                        <ListItem button selected onClick={this.selectCurrentMeasures}><ListItemText primary="Aktualny pomiar" /></ListItem>
                    </List>
                </Paper>
                <div className={classes.content}>
                    <Report data={this.state} />
                    <div className="no-print">
                        <Button onClick={this.printReport}>Drukuj</Button>
                        {/* <Button onClick={this.printReport}>Zapisz</Button> */}

                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withContext(ModbusContext)(Measures));
