import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';

export default function AddFurniture() {

    const { t } = useTranslation();
    const classes = useStyles();
    const { control, formState, getValues } = useForm({ mode: "onChange" });
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [amount, setAmount] = React.useState("");

    const addFurniture = (event) => {
        event.preventDefault();
    }

    return (
        <div className={classes.loginWindow}>
            <form onSubmit={event => addFurniture(event)}>
                <Controller
                    name={"name"}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: { value: true, message: t('required') },
                    }}
                    render={({ field: { onChange }, fieldState: { error } }) =>
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            label={t('furniture.name')}
                            variant="filled"
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={name}
                            onChange={event => {
                                onChange(event);
                                setName(event.target.value);
                            }}
                        />
                    }
                />
                <br />
                <Controller
                    name={"description"}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: { value: true, message: t('required') },
                    }}
                    render={({ field: { onChange }, fieldState: { error } }) =>
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            label={t('description')}
                            variant="filled"
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={description}
                            onChange={event => {
                                onChange(event);
                                setDescription(event.target.value);
                            }}
                        />
                    }
                />
                <br />
                <Controller
                    name={"category"}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: { value: true, message: t('required') },
                    }}
                    render={({ field: { onChange }, fieldState: { error } }) =>
                        <TextField
                            fullWidth
                            autoFocus
                            margin="dense"
                            label={t('category')}
                            variant="filled"
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={category}
                            onChange={event => {
                                onChange(event);
                                setCategory(event.target.value);
                            }}
                        />
                    }
                />
                <br />
                <Controller
                    name={"amount"}
                    control={control}
                    defaultValue=""
                    rules={{
                        required: { value: true, message: t('required') },
                    }}
                    render={({ field: { onChange }, fieldState: { error } }) =>
                        <TextField
                            fullWidth
                            autoFocus
                            type="number"
                            margin="dense"
                            label={t('amount')}
                            variant="filled"
                            error={!!error}
                            helperText={error ? error.message : null}
                            value={amount}
                            onChange={event => {
                                onChange(event);
                                setAmount(event.target.value);
                            }}
                        />
                    }
                />
                <br />
            </form>
        </div>
    )
}