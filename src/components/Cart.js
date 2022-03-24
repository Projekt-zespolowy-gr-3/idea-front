import React, { useEffect, useState } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import { Paper, Button, Table, TableBody, TableCell, TableHead, TableRow, Input } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import CartService from '../services/CartService';

export default function Cart(props) {

    const { t } = useTranslation();
    const classes = useStyles();
    const [loading, setLoading] = useState(false);

    function totalPrice() {
        let cart = CartService.getItems();
        let totalPrice = 0.0;
        for (let i = 0 ; i < cart.length ; i ++ ){
            totalPrice = cart[i].price * cart[i].quantity;
        }
        return totalPrice;
    }

    const columns = [
        { field: 'name', headerName: t('furniture.name'), flex: 1 },
        { field: 'price', headerName: t('price'), flex: 1 },
        { field: 'quantity', headerName: t('quantity'), flex: 1 },
    ];

    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        return (
            <div style={{ height: 650, width: '100%' }}>
                <Paper style={{ fontSize: '32px' }}>
                    {t('cart')}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('furniture.name')}
                                </TableCell>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('price')}
                                </TableCell>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('quantity')}
                                </TableCell>
                                <TableCell align="center" className={classes.tableHeaders}>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {CartService.getItems().map(row => (
                                <TableRow key={row.id}>
                                    <TableCell align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.price}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.quantity}
                                    </TableCell>
                                    <TableCell align="center">
                                            <Button onClick={() => {
                                                CartService.removeItemFromTheCart(row.id);
                                                props.history.push("/cart");
                                            }}>{t('remove')}</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div>
                        {t('totalPrice')} {totalPrice()}
                        <br/>
                        <Button >
                            {t('placeOrder')}
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}