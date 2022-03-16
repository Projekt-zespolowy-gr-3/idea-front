import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { saveToCookies, getFirstAccessLevel } from "../services/UserDataService";
import BeatLoader from 'react-spinners/BeatLoader';

export default function Login() {

    const { t } = useTranslation();
    const classes = useStyles();
    const { control, formState } = useForm({ mode: "onChange" });
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = (event) => {
        event.preventDefault();
        setLoading(true);
        FetchService.login(username, password)
            .then(response => {
                if (response && response.token) {
                    saveToCookies("token", response.token);
                    localStorage.setItem("logged", "");
                    sessionStorage.setItem("role", getFirstAccessLevel());
                    window.location.replace("/");
                }
            }).then(() => {
                setLoading(false);
            })
    }


    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        return (
            <div className={classes.loginWindow}>
                <form onSubmit={event => login(event)}>
                    <Controller
                        name={"login"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            pattern: { value: /^([a-zA-Z0-9!@$^&*]+)$/, message: t('wrong.format') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                fullWidth
                                autoFocus
                                margin="dense"
                                label={t('username')}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={username}
                                onChange={event => {
                                    onChange(event);
                                    setUsername(event.target.value);
                                }}
                            />
                        }
                    />
                    <br />
                    <Controller
                        name={"password"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            minLength: { value: 8, message: t('pswd.too.short') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                className={classes.loginForm}
                                fullWidth
                                margin="dense"
                                label={t('password')}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={password}
                                type="password"
                                onChange={event => {
                                    onChange(event);
                                    setPassword(event.target.value);
                                }}
                            />
                        }
                    />
                    <div className={classes.loginButton}>
                        <Button type="submit" variant="contained" disabled={!formState.isValid}>
                            {t('confirm')}
                        </Button>
                    </div>
                </form>
            </div>
        )
    }
}