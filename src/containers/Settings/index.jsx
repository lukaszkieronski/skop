import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, Typography, TextField } from '@material-ui/core';
import { Button } from 'components';
import { withContext } from 'utils/contexts';
import { ModbusContext } from 'utils/contexts';

const styles = theme => createStyles({
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        margin: theme.spacing.unit * 3
    },
    spacer: {
        flex: 1
    },
    buttons: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex'
    },
    textField: {
        marginRight: theme.spacing.unit * 3,
    }
})

class Settings extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        context: PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = {
            ...props.context.config
        }
    }

    handleSocketChange = event => {
        const { target } = event;
        let config = JSON.parse(JSON.stringify(this.state))
        config.socket[target.id] = target.value
        this.setState(config);
    }

    applyConfig = _ => {
        const { context } = this.props;
        context.setConfig(this.state);
    }

    render = () => {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Typography component='h2' variant='headline'>Parametry połączenia</Typography>
                <form noValidate autoComplete="off" onChange={this.handleSocketChange}>
                    <TextField
                        label="Adres"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        id="host"
                        value={this.state.socket.host}
                    />
                    <TextField
                        label="Port"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        id="port"
                        value={this.state.socket.port}
                    />

                </form>
                <div className={classes.spacer} />
                <div className={classes.buttons}>
                    <Button onClick={this.applyConfig}>Zastosuj</Button>
                    <div className={classes.spacer} />
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(withContext(ModbusContext)(Settings));
