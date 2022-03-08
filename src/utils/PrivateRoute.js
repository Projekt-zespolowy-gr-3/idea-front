import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getUsername, hasActiveRole } from '../services/UserDataService';

export const PrivateRoute = ({ roles, ...props }) => {
    return (
        getUsername() !== "" && checkRoles(roles) ?
            <Route {...props} /> :
            <Redirect to="/accessDenied" />
    )
}

const checkRoles = (roles) => {
    let hasRole = false;
    if (roles) {
        roles.forEach(role => {
            if (hasActiveRole(role)) {
                hasRole = true;
            }
        })
    }
    return hasRole;
}