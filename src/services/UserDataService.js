import Cookies from 'js-cookie';

let token = require("jsonwebtoken");

export const saveToCookies = (key, value) => {
    Cookies.set(key, value, { path: '/' });
}

export const getFromCookies = (key) => {
    const valueCookies = Cookies.get(key);
    if (valueCookies) return valueCookies;
    else return null;
}

export const deleteFromCookies = (key) => {
    Cookies.remove(key, { path: '/' });
}

export const getUsername = () => {
    let jwt = getFromCookies("token");
    if (jwt) {
        return token.decode(jwt)["sub"];
    } else {
        return "";
    }
}

export const getRoles = () => {
    let jwt = getFromCookies("token");
    if (jwt) {
        return token.decode(jwt)["roles"];
    } else {
        return null;
    }
}

export const hasActiveRole = (roleName) => {
    let roleSet = [];
    roleSet = getRoles();
    if (roleSet != null) {
        if (roleSet.includes(roleName)) {
            return true;
        } else return false;
    } else return false;
}

export const getLanguage = () => {
    return window.localStorage.lang ? window.localStorage.lang : "pl";
}

export const getAccessLevels = () => {
    let jwt = getFromCookies("token");
    if (jwt) {
        return token.decode(jwt)["roles"];
    } else {
        return "";
    }
}

export const getFirstAccessLevel = () => {
    let roles = getAccessLevels();
    if (roles) {
        if (roles.includes("ADMIN")) return "ADMIN";
        else if (roles.includes("CLIENT")) return "CLIENT";
    }
}

export const getCurrentAccessLevel = () => {
    return sessionStorage.getItem("role");
}

export const getHeader = () => {
    let jwt = getFromCookies("token");
    if(jwt) {
        return { Authorization: 'Bearer ' + jwt, "Content-Type": "application/json" };
    } else {
        return { "Content-Type": "application/json" };
    }
}