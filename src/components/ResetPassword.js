import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import BeatLoader from 'react-spinners/BeatLoader';
import { successNotification } from '../utils/Notifications';

export default function ResetPassword(props) {

    const { t } = useTranslation();
    const classes = useStyles();
    const { control, formState } = useForm({ mode: "onChange" });
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const reset = (event) => {
        event.preventDefault();
        setLoading(true);
        FetchService.reset(email)
            .then(response => {
                if(response) {
                    successNotification("reset.link.sent", " ");
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
                <form onSubmit={event => reset(event)}>
                <Controller
                        name={"email"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            maxLength: { value: 32, message: t('too.long') },
                            pattern: { value: /^([a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,})$/, message: t('wrong.format') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                className={classes.loginForm}
                                fullWidth
                                margin="dense"
                                label={t('email') + "*"}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={email}
                                onChange={event => {
                                    onChange(event);
                                    setEmail(event.target.value);
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