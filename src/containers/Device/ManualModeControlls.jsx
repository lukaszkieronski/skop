import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles, TextField, Typography } from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { Button } from 'components';
import { withContext } from 'utils/contexts';
import { ModbusContext } from 'utils/contexts';


const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    speed: {
        display: 'flex',
        alignItems: "baseline"
    },
    textField: {
        marginLeft: theme.spacing.unit * 2
    },
    buttons: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    slider: {
        marginTop: theme.spacing.unit * 3
    }
})

class ManualModeControlls extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    state = {
        uspeed: {
            value: 0,
            min: 0,
            max: 10000
        }
    }

    lastUpdate = Date.now()

    componentDidMount() {
        const { context } = this.props;
        const uspeed = context.getParameter('uspeed')
        this.setState({uspeed});
    }

    sendSpeed = () => {
        const { context } = this.props;
        context.saveParameters(this.state);
        this.timeout = undefined
    }

    setValue = value => {
        const { uspeed } = this.state;
        if (value > uspeed.max || value < uspeed.min) return;
        const state = JSON.parse(JSON.stringify(this.state))
        state.uspeed.value = +value;
        this.lastUpdate = Date.now()
        this.setState(state, () => {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(this.sendSpeed, 500);
        });
    }

    handleInputChange = event => this.setValue(event.target.value)
    handleSliderChange = (event, value) => this.setValue(value)
    handleButtonChange = value => () => this.setValue(value)

    render = () => {
        const { classes, context } = this.props;
        const { uspeed } = this.state;
        const updateSource = Date.now() - this.lastUpdate > 1000;
        const speed = updateSource ? context.getParameter('uspeed').value : uspeed.value;
        return (
            <div className={classes.root}>
                <div>
                    <div className={classes.speed}>
                        <Typography variant="headline">Prędkość zmiany napięcia :</Typography>
                        <TextField
                            className={classes.textField}
                            value={speed}
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            type="number"
                            inputProps={{ min: uspeed.min, max: uspeed.max, step: 1 }}
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className={classes.buttons}>
                        <Button className={classes.button} size="small" onClick={this.handleButtonChange(500)}>0.5 kV/s</Button>
                        <Button className={classes.button} size="small" onClick={this.handleButtonChange(1000)}>1.0 kV/s</Button>
                        <Button className={classes.button} size="small" onClick={this.handleButtonChange(1500)}>1.5 kV/s</Button>
                        <Button className={classes.button} size="small" onClick={this.handleButtonChange(2000)}>2.0 kV/s</Button>
                        <Button className={classes.button} size="small" onClick={this.handleButtonChange(2500)}>2.5 kV/s</Button>
                        <Button className={classes.button} size="small" onClick={this.handleButtonChange(3000)}>3.0 kV/s</Button>
                    </div>
                        <Slider
                            classes={{ container: classes.slider }}
                            value={speed}
                            min={uspeed.min}
                            max={uspeed.max}
                            step={500}
                            onChange={this.handleSliderChange}
                        />
                </div>

            </div>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(ManualModeControlls));
