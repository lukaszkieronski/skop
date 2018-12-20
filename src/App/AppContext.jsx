import React from 'react';

const AppContext = React.createContext(null);

export const withAppContext = Component => (props) => (
    <AppContext.Consumer>
        {appContext => <Component {...props} appContext={appContext}/>}
    </AppContext.Consumer>
)

export default AppContext;