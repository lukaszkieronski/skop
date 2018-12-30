import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';
import { createStyles, withStyles, Tabs, Tab } from '@material-ui/core';

const styles = theme => createStyles({
    root: {
    }
})

class Navigation extends React.Component {

    static propTypes = {
        classes: PropTypes.object,
        location: PropTypes.object,
        history: PropTypes.object
    }

    render = () => {
        const { location, history } = this.props;
        return (
            <Tabs value={location.pathname} onChange={ (_, location) => history.push(location) }>
                <Tab value="/device" label="Urządzenie" />
                <Tab value="/measures" label="Pomiary" />
                <Tab value="/programs" label="Programy" />
                <Tab value="/parameters" label="Parametry" />
                <Tab value="/settings" label="Ustawienia" />
                <Tab value="/debug" label="Debug" />
            </Tabs>
        )
    }
}

export default withRouter(withStyles(styles)(Navigation));
