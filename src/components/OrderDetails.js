import React, { useState, useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import FetchService from '../services/FetchService';
import BeatLoader from 'react-spinners/BeatLoader';
import { useTranslation } from 'react-i18next';

export default function OrderDetails(props) {

    const classes = useStyles();
    const { t } = useTranslation();
    const [order, setOrder] = useState({});
    const [furnitures, setFurnitures] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        FetchService.getOrder(props.orderKey)
            .then(response => {
                if (response) {
                    setOrder(response);
                    setFurnitures(response.furnitureObjects);
                }
            }).then(() => {
                setLoading(false);
            })
    }, [props.orderKey])


    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        return (
            <div>
                <h2>{t('id')}: {order.businessKey}</h2>
                <h2>{t('user')}: {order.username}</h2>
                <h2>{t('order.date')}: {order.date}</h2>
                <br />
                <h2>{t('order.furnitures')}:</h2>
                <Paper className={classes.table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('furniture.name')}
                                </TableCell>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('description')}
                                </TableCell>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('category')}
                                </TableCell>
                                <TableCell align="center" className={classes.tableHeaders}>
                                    {t('price')}
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {furnitures.map(row => (
                                <TableRow key={row.businessKey}>
                                    <TableCell align="center">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.description}
                                    </TableCell>
                                    <TableCell align="center">
                                        {t(row.category)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {row.price}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
                <br /><br />
                <Button variant="contained" color="secondary" onClick={() => {
                    window.location.reload();
                }}>
                    {t('return')}
                </Button>
            </div>
        )
    }
}