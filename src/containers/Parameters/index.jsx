import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, Typography, TextField } from '@material-ui/core';
import { Button } from 'components';
import { withContext } from 'utils/contexts';
import { ModbusContext } from 'utils/contexts';

const styles = theme => createStyles({
    root: {
        margin: theme.spacing.unit * 3,
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
    },
    spacer: {
        flex: 1
    },
    parameter: {
        width: '150px',
        marginRight: theme.spacing.unit * 1
    }
})

class Parameters extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    constructor(props) {
        super(props);
        const { context } = props;
        this.state = [
            'urms200', 'urms100', 'irms200', 'irms20', 'irms2', 'irms02',
            'upeak200', 'upeak100', 'ipeak200', 'ipeak20', 'ipeak2','ipeak02',
            'iref1', 'iref2'
        ].reduce((p, c) => {
            p[c] = context.getParameter(c)
            return p
        }, {})

        this.form = [React.createRef(), React.createRef(), React.createRef()]
    }

    renderParameter = (parameterName, index) => {
        const { classes } = this.props;
        const parameter = this.state[parameterName];
        const step = 1 / 10 ** parameter.digits
        return (
            <TextField
                className={classes.parameter}
                key={index}
                id={parameterName}
                label={parameter.name}
                value={parameter.value}
                margin="normal"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="outlined"
                type="number"
                error={parameter.value > parameter.max || parameter.value < parameter.min}
                inputProps={{ min: parameter.min, max: parameter.max, step }}
            />
        );
    }

    handleParamChange = event => {
        const { target } = event;
        const register = JSON.parse(JSON.stringify(this.state[target.id]));
        register.value = target.value
        this.setState({ [target.id]: register })
    }

    handleSave = () => {
        console.log("should save");
    }


    render = () => {
        const { classes } = this.props;
        const canSave = this.form.reduce((p, c) => { return p && c.current && c.current.checkValidity && c.current.checkValidity() }, true)
        return (
            <div className={classes.root}>
                <Typography variant="headline"> Wartości graniczne dla prądów i napięć : </Typography>
                <form onChange={this.handleParamChange} ref={this.form[0]}>
                    {['urms200', 'urms100', 'irms200', 'irms20', 'irms2', 'irms02'].map(this.renderParameter)}
                </form>
                <form onChange={this.handleParamChange} ref={this.form[1]}>
                    {['upeak200', 'upeak100', 'ipeak200', 'ipeak20', 'ipeak2','ipeak02'].map(this.renderParameter)}
                </form>
                <Typography variant="headline"> Prądy odniesienia ograniczników : </Typography>
                <form onChange={this.handleParamChange} ref={this.form[2]}>
                    {['iref1', 'iref2'].map(this.renderParameter)}
                </form>
                <Typography variant="headline"> Prędkość zapisu przebiegu próby : </Typography>
                <div className={classes.spacer} />
                <div>
                    <Button onClick={this.handleSave} disabled={!canSave}>Zapisz</Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withContext(ModbusContext)(Parameters));
