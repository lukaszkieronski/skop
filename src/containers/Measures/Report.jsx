import React from 'react';
import PropTypes from 'prop-types';

import { createStyles, withStyles, TextField } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, Legend } from 'recharts';
import { ParameterBox } from 'components';

const styles = theme => createStyles({
    root: {
        flex: 1,
        margin: theme.spacing.unit * 1,
        display: 'flex'
    },
    page: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
        // backgroundColor: 'red'
    },
    params: {
        display: 'flex'
    }
})

class Report extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        data: PropTypes.object
    }

    render = () => {
        const { classes, data } = this.props;
        return (
            <div className={classes.root} >
                <div className={classes.page} >
                    <TextField
                        label="Data"
                        className={classes.textField}
                        defaultValue={(new Date()).toLocaleDateString('pl-PL')}
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Lokalizacja"
                        className={classes.textField}
                        defaultValue=" "
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        label="Sporządził"
                        className={classes.textField}
                        defaultValue=""
                        margin="normal"
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                    />
                    <div className={classes.params}>
                        {data.urms &&
                            <>
                                <ParameterBox parameter={data.urms} />
                                <ParameterBox parameter={data.irms} />
                                <ParameterBox parameter={data.fi} />
                            </>
                        }
                        {data.urmsMean &&
                            <>
                                <ParameterBox parameter={data.urmsMean} />
                                <ParameterBox parameter={data.irmsMean} />
                            </>
                        }

                    </div>


                    <LineChart width={600} height={300} data={this.data} >
                        <Line yAxisId="left" type="monotone" dataKey="urms" stroke="#1a4859" isAnimationActive={true} dot={false} />
                        <Line yAxisId="left" type="monotone" dataKey="upeak" stroke="#2aa069" isAnimationActive={false} dot={false} />
                        <Line yAxisId="right" type="monotone" dataKey="irms" stroke="#fbc42c" isAnimationActive={false} dot={false} />
                        <Line yAxisId="right" type="monotone" dataKey="ipeak" stroke="#f67129" isAnimationActive={false} dot={false} />
                        <XAxis dataKey="step" tick={false} />
                        <YAxis yAxisId="left" unit=" kV" />
                        <YAxis yAxisId="right" orientation="right" unit=" mA" />
                        <Legend />

                    </LineChart>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Report);
