import React from 'react';
import PropTypes from 'prop-types';
import { createStyles, withStyles } from '@material-ui/core';

import { Button, EvenSize } from 'components'
import { withContext, ModbusContext } from 'utils/contexts';

const styles = theme => createStyles({
    root: {
        display: 'flex'
    }
})

class ContextSetters extends React.Component {

    static propTypes = {
        context: PropTypes.object
    }

    setColor = color => () => this.props.context.set({ color })

    render = () => {
        const { color } = this.props.context;
        return (
            <EvenSize itemMinWidth={100}>
                    <Button color={color} onClick={this.setColor("primary")}> Primary </Button>
                    <Button color={color} onClick={this.setColor("secondary")}> Secondary </Button>
                    <Button color={color} onClick={this.setColor("primary")}> Primary </Button>
                    <Button color={color} onClick={this.setColor("secondary")}> Secondary </Button>
                    <Button color={color} onClick={this.setColor("primary")}> Primary </Button>
                    <Button color={color} onClick={this.setColor("secondary")}> Secondary </Button>
                    <Button color={color} onClick={this.setColor("primary")}> Primary </Button>
                    <Button color={color} onClick={this.setColor("secondary")}> Secondary </Button>
                    <Button color={color} onClick={this.setColor("primary")}> Primary </Button>
                    <Button color={color} onClick={this.setColor("secondary")}> Secondary </Button>
            </EvenSize>
        )
    }
}

export default withContext(ModbusContext)(withStyles(styles)(ContextSetters));
