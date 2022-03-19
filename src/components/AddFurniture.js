import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, TextField } from '@material-ui/core';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { successNotification } from '../utils/Notifications';
import ImageUploader from 'react-images-upload';
import Autocomplete from "@mui/material/Autocomplete";

export default function AddFurniture(props) {

    const { t } = useTranslation();
    const classes = useStyles();
    const { control, formState } = useForm({ mode: "onChange" });
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [price, setPrice] = useState("");
    const [amount, setAmount] = useState("");
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        FetchService.getCategories()
            .then(response => {
                if (response) {
                    setCategories(response);
                    console.log(response);
                }
            })
    }, []);

    const handleImageUpload = (event) => {
        if (event.length > 0) {
            let reader = new FileReader();
            reader.readAsDataURL(event[0]);
            reader.onloadend = () => {
                setPhoto(reader.result);
            }
        }
    }

    const addFurniture = async (event) => {
        event.preventDefault();
        setLoading(true);
        FetchService.createFurniture(name, description, category, price, photo.substring("data:image/png;base64,".length + 1), amount)
            .then(response => {
                if (response) {
                    successNotification("success", " ");
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
                            <Autocomplete
                                className={classes.autocomplete}
                                fullWidth
                                error={!!error}
                                value={category}
                                onChange={(event, newCategory) => {
                                    onChange(event);
                                    setCategory(newCategory);
                                }}
                                options={categories}
                                getOptionLabel={option => t(option)}
                                renderInput={(params) => <TextField {...params} label={t('category')} />}
                            />
                        }
                    />
                    <Controller
                        name={"amount"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') }
                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                fullWidth
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
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                            />
                        }
                    />
                    <br />
                    <Controller
                        name={"price"}
                        control={control}
                        defaultValue=""
                        rules={{
                            required: { value: true, message: t('required') },
                            pattern: { value: /^(?=.*[1-9])[0-9]*[.,]?[0-9]{1,2}$/, message: t('wrong.format') },

                        }}
                        render={({ field: { onChange }, fieldState: { error } }) =>
                            <TextField
                                fullWidth
                                type="number"
                                margin="dense"
                                label={t('price')}
                                variant="filled"
                                error={!!error}
                                helperText={error ? error.message : null}
                                value={price}
                                onChange={event => {
                                    onChange(event);
                                    setPrice(event.target.value);
                                }}
                            />
                        }
                    />
                    <br />
                    <ImageUploader singleImage withPreview
                        label={t('file.details')}
                        buttonText={t('upload.file')}
                        fileTypeError={t('wrong.file.extension')}
                        fileSizeError={t('wrong.file.size')}
                        onChange={(event) => handleImageUpload(event)} />
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