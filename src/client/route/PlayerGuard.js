
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PlayerGuard = ({component: Component, selected, ...rest}) => {
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={(props) => ( selected !== null && selected !== '' ?<Component {...props} />: <Redirect to="/" />)} />
    );
};

export default PlayerGuard;