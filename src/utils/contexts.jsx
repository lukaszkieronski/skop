import React from 'react';

export const ApplicationContext = React.createContext();

export const withContext = Context => Component => (props) => (
    <Context.Consumer>
        {context => <Component {...props} context={context}/>}
    </Context.Consumer>
)

