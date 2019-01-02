import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles, TextField } from '@material-ui/core';
import { withContext, ModbusContext } from 'utils/contexts';
import { Button } from 'components';
import StepEditor from './StepEditor';

import IPC from 'electron/ipcCommon'
const ipc = window.require('electron').ipcRenderer


const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing.unit*3,
        overflowY: 'auto'
    },
    textField: {
        marginRight: theme.spacing.unit*3
    }
})

class ProgramEditor extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object,
        selected: PropTypes.number
    }

    state = {
        name: '',
        program: undefined,
        currentStep: 0
    }

    componentDidMount() {
        ipc.on(IPC.PROGRAM_RESPONSE, this.updateProgram)
    }

    componentWillUnmount() {
        ipc.off(IPC.PROGRAM_RESPONSE, this.updateProgram);
    }

    updateProgram = (_, program) => {
        const { index } = program;
        const { context } = this.props;
        const name = index < 10 ? context.programNames.basic[index] : context.programNames.limiter[index-10]
        const currentStep = 0;
        this.setState({name, program, currentStep})
    }

    changeName = event => {
        const { target } = event;
        const name = target.value;
        this.setState({ name })
    }

    updateCurrentStep = direction => () => {
        const currentStep = this.state.currentStep + direction;
        if (currentStep<0 || currentStep>=this.state.program.steps.length) return
        this.setState({currentStep});
    }

    updateStep = (step) => {
        const { program } = this.state;
        const { index, parameters, speed, value } = step
        program.steps[index] = {
            parameters, speed, value
        }
        this.setState({program});
    }

    save = () => {
        console.log(this.state)
    }

    render = () => {
        const { classes } = this.props;
        const { program, currentStep } = this.state;
        if (!program) return <div/>
        const step = {
            index: currentStep,
            ...program.steps[currentStep]
        }
        return (
            <div className={classes.root}>
                <pre>state: {JSON.stringify(this.state)}</pre>
                <div>
                <TextField
                    label="Nazwa"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.changeName}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="Krok"
                    className={classes.textField}
                    value={this.state.currentStep + 1}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true, readOnly: true  }}
                />

                </div>
                <StepEditor step={step} updateCB={this.updateStep}/>
                <div>
                <Button onClick={this.updateCurrentStep(-1)}>Poprzedni krok</Button>
                <Button onClick={this.updateCurrentStep(1)}>Następny krok</Button>
                <Button onClick={this.save}>Zapisz</Button>

                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withContext(ModbusContext)(ProgramEditor));
