import React from 'react';
import { Typography, Toolbar, FormControl, Select, MenuItem, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useStyles } from '../css/Styles';
import { deleteFromCookies, getAccessLevels, getCurrentAccessLevel, getLanguage, getUsername } from '../services/UserDataService';

export default function NavigationBar() {
    const { t } = useTranslation();
    const classes = useStyles();
    const [language, setLanguage] = React.useState(getLanguage());
    const [role, setRole] = React.useState(getCurrentAccessLevel());

    return (
        <Toolbar className={classes.toolbar}>
            <Typography className={classes.title} variant="h6" noWrap component={Link} to="/">
                KAPJ
            </Typography>

            {getCurrentAccessLevel() === "ADMIN" ?
                <div className={classes.toolbarRoleDiv}>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/users">
                        {t('list.users')}
                    </Typography>
                </div>
                : null}

            {getCurrentAccessLevel() === "CLIENT" ?
                <div className={classes.toolbarRoleDiv}>
                    <Typography className={classes.navigationRoleLabel} component={Link} to="/user">
                        {t('user.details')}
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

            {getUsername() ?
                <React.Fragment>
                    <Button className={classes.navigationLabel} onClick={() => {
                        deleteFromCookies('token');
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