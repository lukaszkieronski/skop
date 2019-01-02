import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles, TextField, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, FormGroup, Switch } from '@material-ui/core';

import { clearBit, setBit } from 'utils/conversion'

const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    textField: {
        marginRight: theme.spacing.unit * 3
    }
})

class StepEditor extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        step: PropTypes.object,
        updateCB: PropTypes.func
    }

    onParameterChange = event => {
        const { value, checked } = event.target
        const { step, updateCB } = this.props;
        switch (+value) {
            case 0:
            case 1:
                step.parameters = setBit(step.parameters & 0xFFFC, +value);
                updateCB(step);
                break;
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 9:
                step.parameters = setBit(step.parameters & 0xFD03, +value);
                updateCB(step);
                break;
            case 7:
            case 8:
                if (checked) {
                    step.parameters = setBit(step.parameters & 0xFD03, +value);
                } else {
                    step.parameters = clearBit(step.parameters & 0xFD03, +value);
                }
                updateCB(step);
                break;
            default:
                break;
        }


    }

    onValueChange = event => {
        const { step, updateCB } = this.props;
        step[event.target.id] = +event.target.value;
        updateCB(step)
    }

    render = () => {
        const { classes, step } = this.props;
        const speedValue = Math.log2(step.parameters & 3);
        const conditionValue = Math.log2(step.parameters & 764);
        console.log(conditionValue)
        return (
            <div className={classes.root}>
                <FormGroup row onChange={this.onParameterChange} >
                    <FormControlLabel control={<Switch value="7" color="primary" checked={conditionValue===7}/>} label="Krok kończący" />
                    <FormControlLabel control={<Switch value="8" color="primary" />} label="SCOPE" />
                </FormGroup>

                <FormGroup row>
                    <FormControl component="fieldset" className={classes.formControl} onChange={this.onParameterChange} >
                        <FormLabel component="legend">Zmiana napięcia</FormLabel>
                        <RadioGroup name="direction" className={classes.group} value={`${speedValue}`} row>
                            <FormControlLabel value="0" control={<Radio />} label="W górę" />
                            <FormControlLabel value="1" control={<Radio />} label="W dół" />
                        </RadioGroup>

                    </FormControl>
                    <TextField
                        id="speed"
                        className={classes.textField}
                        value={step.speed}
                        onChange={this.onValueChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                </FormGroup>
                <FormGroup row>
                    <FormControl component="fieldset" className={classes.formControl} onChange={this.onParameterChange}>
                        <FormLabel component="legend">Warunek zakończenia kroku</FormLabel>
                        <RadioGroup name="direction" className={classes.group} value={`${conditionValue}`} row>
                            <FormControlLabel value="2" control={<Radio />} label="Urms" />
                            <FormControlLabel value="3" control={<Radio />} label="Upeak" />
                            <FormControlLabel value="4" control={<Radio />} label="Irms" />
                            <FormControlLabel value="5" control={<Radio />} label="Ipeak" />
                            <FormControlLabel value="6" control={<Radio />} label="T" />
                            <FormControlLabel value="9" control={<Radio />} label="Iref" />
                        </RadioGroup>

                    </FormControl>
                    <TextField
                        id="speed"
                        className={classes.textField}
                        value={step.speed}
                        onChange={this.onValueChange}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                </FormGroup>
            </div>
        )
    }
}

export default withStyles(styles)(StepEditor);

