import React from 'react';

const ApplicationContext = React.createContext();

export const withApplicationContext = Component => (props) => (
    <ApplicationContext.Consumer>
        {applicationContext => <Component {...props} applicationContext={applicationContext}/>}
    </ApplicationContext.Consumer>
)

export default ApplicationContext;
