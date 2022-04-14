import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import BeatLoader from 'react-spinners/BeatLoader';
import { successNotification, errorNotification } from '../utils/Notifications';

export default function ChangeResetPassword(props) {

    const { t } = useTranslation();
    const classes = useStyles();
    const { control, formState, getValues } = useForm({ mode: "onChange" });
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const tokenURL = new URLSearchParams(window.location.search).get("token");
        if (tokenURL === null || tokenURL === "") {
            errorNotification("unexpected.error", " ");
        } else {
            setToken(tokenURL);
        }
    }, [])

    const reset = (event) => {
        event.preventDefault();
        setLoading(true);
        FetchService.changeReset(token, password)
            .then(response => {
                if (response) {
                    successNotification("reset.success", " ");
                }
            }).then(() => {
                props.history.push("/");
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
                <h1>{t('reset')}</h1>
                <form onSubmit={event => reset(event)}>
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
                                label={t('password') + "*"}
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
                    <br />
                    <Controller
                        name={"repeatPassword"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            validate: (value) => getValues("password") === value || t('password.repeat.error')
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                className={classes.loginForm}
                                fullWidth
                                margin="dense"
                                label={t('password.repeat') + "*"}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={repeatPassword}
                                type="password"
                                onChange={event => {
                                    onChange(event);
                                    setRepeatPassword(event.target.value);
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