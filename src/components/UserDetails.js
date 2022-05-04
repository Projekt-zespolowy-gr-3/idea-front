import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import FetchService from '../services/FetchService';
import {getUsername} from '../services/UserDataService';
import {LoadingCss, useStyles} from '../css/Styles';
import BeatLoader from 'react-spinners/BeatLoader';
import {Controller} from "react-hook-form";
import {Button, TextField} from "@material-ui/core";

export default function UserDetails() {

    const {t} = useTranslation();
    const classes = useStyles();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        FetchService.getUser(getUsername())
            .then(response => {
                if (response) {
                    setUser(response);
                }
            }).then(() => {
            setLoading(false);
        })
    }, [])

    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss}/>
            </div>
        )
    } else {
        return (
            <div className={classes.loginWindow}>
                <h1>{t('userDetails')}</h1>
                <TextField
                    fullWidth
                    autoFocus
                    margin="dense"
                    label={t('username')}
                    variant="filled"
                    disabled={true}
                    value={user.login}
                />
                <br/>
                <TextField
                    className={classes.loginForm}
                    fullWidth
                    margin="dense"
                    disabled={true}
                    label={t('name')}
                    variant="filled"
                    value={user.name}
                />
                <br/>
                <TextField
                    className={classes.loginForm}
                    fullWidth
                    margin="dense"
                    label={t('surname')}
                    variant="filled"
                    disabled={true}
                    value={user.surname}
                />
                <br/>
                <TextField
                    className={classes.loginForm}
                    fullWidth
                    disabled={true}
                    margin="dense"
                    label={t('email')}
                    variant="filled"
                    value={user.email}
                />
            </div>
        )
    }
}