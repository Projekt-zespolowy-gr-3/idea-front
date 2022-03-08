import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUsername } from '../services/UserDataService';

export const RestrictedRoute = ({ ...props }) => {
    return (
        getUsername() === "" ?
            <Route {...props} /> :
            <Redirect to="/accessDenied" />
    )
}