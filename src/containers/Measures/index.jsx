import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles, Paper, List, ListItem, ListItemText } from '@material-ui/core';

import Report from './Report'
import { Button } from 'components';

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
        margin: theme.spacing.unit *3
    }
})

class Component extends React.Component {

    static propTypes = {
        classes: PropTypes.object
    }

    state = {

    }

    componentDidMount() {
        this.selectCurrentMeasures()
    }

    renderItem = (item, index) => <ListItem key={index} button><ListItemText primary={item} /></ListItem>

    selectCurrentMeasures = _ => {
        this.setState({
            urmsMean: { name: 'Urms śr', unit:"kV", value: 1},
            irmsMean: { name: 'Irms śr', unit:"mA", value: 1}
        })
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
                    <Report data={this.state}/>
                    <div className="no-print">
                        <Button onClick={this.printReport}>Drukuj</Button>
                        {/* <Button onClick={this.printReport}>Zapisz</Button> */}

                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Component);
