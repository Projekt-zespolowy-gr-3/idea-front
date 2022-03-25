import React, { useState } from 'react';
import { Typography, Toolbar, FormControl, Select, MenuItem, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useStyles } from '../css/Styles';
import { useHistory } from "react-router-dom";
import { deleteFromCookies, getAccessLevels, getCurrentAccessLevel, getLanguage, getUsername } from '../services/UserDataService';
import CartService from '../services/CartService';

export default function NavigationBar() {

    let history = useHistory();
    const { t } = useTranslation();
    const classes = useStyles();
    const [language, setLanguage] = useState(getLanguage());
    const [role, setRole] = useState(getCurrentAccessLevel());

    return (
        <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} onClick={() => history.push("/")}>
                <img className={classes.logo} src="logo.png" alt="IDEA" height="64px" />
            </Typography>

            {getCurrentAccessLevel() === "ADMIN" ?
                <div className={classes.toolbarRoleDiv}>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/users">
                        {t('list.users')}
                    </Typography>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/furniture">
                        {t('add.furniture')}
                    </Typography>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/orders">
                        {t('list.all.orders')}
                    </Typography>
                </div>
                : null}

            {getCurrentAccessLevel() === "CLIENT" ?
                <div className={classes.toolbarRoleDiv}>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/user">
                        {t('user.details')}
                    </Typography>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/myorders">
                        {t('list.my.orders')}
                    </Typography>
                </div>
                : null}

            {getUsername() !== "" && getAccessLevels().length > 1 ?
                <FormControl>
                    <Select className={classes.navigationLabel} value={role} onChange={event => {
                        setRole(event.target.value);
                        sessionStorage.setItem("role", event.target.value);
                        window.location.reload();
                    }}>
                        {getAccessLevels().includes("ADMIN") ? <MenuItem value={"ADMIN"}>{t('ADMIN')}</MenuItem> : null}
                        {getAccessLevels().includes("CLIENT") ? <MenuItem value={"CLIENT"}>{t('CLIENT')}</MenuItem> : null}
                    </Select>
                </FormControl> : null}


            <FormControl>
                <Select className={classes.navigationLabel} value={language} onChange={event => {
                    setLanguage(event.target.value);
                    localStorage.setItem("lang", event.target.value);
                    window.location.reload();
                }}>
                    <MenuItem value={"pl"}>Polski</MenuItem>
                    <MenuItem value={"en"}>English</MenuItem>
                </Select>
            </FormControl>

            {getCurrentAccessLevel() === "CLIENT" ?
                <FormControl>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/cart">
                        {t('cart')}
                    </Typography>
                </FormControl> : null}

            {getUsername() ?
                <React.Fragment>
                    <Button className={classes.navigationLabel} onClick={() => {
                        deleteFromCookies('token');
                        CartService.clearCart();
                        window.location.replace("/");
                        sessionStorage.removeItem("role");
                    }}>
                        {t('logout')}
                    </Button>
                </React.Fragment> :
                <React.Fragment>
                    <Typography className={classes.navigationLabel} component={Link} to="/register">
                        {t('register')}
                    </Typography>
                    <Typography className={classes.navigationLabel} component={Link} to="/login">
                        {t('login')}
                    </Typography>
                </React.Fragment>}
        </Toolbar>
    )
}