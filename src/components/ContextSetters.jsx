import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';

import { Spacer, Button, EvenSize } from 'components'
import { withContext, ApplicationContext } from 'utils/contexts';

const styles = theme => createStyles({
    root: {
        display: 'flex'
    }
})

class ContextSetters extends React.Component {
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
};

export default withContext(ApplicationContext)(withStyles(styles)(ContextSetters));
