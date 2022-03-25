import React, { useState, useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import { Button, TextField } from '@material-ui/core';
import FetchService from '../services/FetchService';
import BeatLoader from 'react-spinners/BeatLoader';
import { useTranslation } from 'react-i18next';
import { useHistory } from "react-router-dom";
import CartService from '../services/CartService';
import { successNotification } from '../utils/Notifications';
import { getCurrentAccessLevel } from '../services/UserDataService';

export default function FurnitureDetails(props) {
    let history = useHistory();
    const classes = useStyles();
    const { t } = useTranslation();
    const [furniture, setFurniture] = useState({});
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState("");

    useEffect(() => {
        setLoading(true);
        FetchService.getFurniture(props.furnitureKey)
            .then(response => {
                if (response) {
                    setFurniture(response);
                    setImage("data:image/png;base64," + response.photo);
                }
            }).then(() => {
                setLoading(false);
            })
    }, [props.furnitureKey])

    function  isButtonDisabled(furniture){
        let currentCartQuantity = CartService.getItemQuantity(furniture.businessKey);
        if( currentCartQuantity + 1 > furniture.amount ){
            return true;
        }else{
            return false;
        }
    };

    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        return (
            <div className={classes.loginWindow}>
                <img className={classes.image} src={image} alt="" />
                <TextField
                    fullWidth
                    autoFocus
                    disabled={true}
                    margin="dense"
                    label={t('furniture.name')}
                    variant="filled"
                    value={furniture.name}
                />
                <br />
                <TextField
                    fullWidth
                    disabled={true}
                    margin="dense"
                    label={t('description')}
                    variant="filled"
                    value={furniture.description}
                />

                <br />
                <TextField
                    fullWidth
                    margin="dense"
                    disabled={true}
                    label={t('category')}
                    variant="filled"
                    value={t(furniture.category)}
                />
                <TextField
                    fullWidth
                    type="number"
                    margin="dense"
                    disabled={true}
                    label={t('amount')}
                    variant="filled"
                    value={furniture.amount}
                />
                <br />
                <TextField
                    fullWidth
                    disabled={true}
                    type="number" 
                    margin="dense"
                    label={t('price')}
                    variant="filled"
                    value={furniture.price}
                />
                <br />
                <div className={classes.loginButton}>
                    {getCurrentAccessLevel() === "CLIENT" ? 
                        <Button type="submit" disabled={isButtonDisabled(furniture)} variant="contained"  onClick={() => {
                            CartService.addItem(furniture, 1);
                            history.push("/");
                            successNotification(t('success'),t('added.cart.message'),3000)
                            }}>
                            {t('add.cart')}
                        </Button> : null }
                    <br/>
                    <br/>
                    <form onSubmit={() => {
                        history.push("/")
                    }}>
                        <Button type="submit" variant="contained">
                            {t('go.back')}
                        </Button>
                    </form>
                </div>
            </div >
        )
    }
}