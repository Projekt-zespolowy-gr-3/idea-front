import React, { useEffect, useState } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { getUsername } from '../services/UserDataService';

export default function ListUserOrders() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        FetchService.getUserOrders(getUsername())
            .then(response => {
                if (response) {
                    setList(response);
                    console.log(response)
                }
            }).then(() => {
                setLoading(false);
            })
    }, [])


    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        return (
            <Paper className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('id')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('order.date')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(row => (
                            <TableRow key={row.businessKey}>
                                <TableCell align="center">
                                    {row.businessKey}
                                </TableCell>
                                <TableCell align="center">
                                    {row.date}
                                </TableCell>
                                <TableCell align="center">
                                    <Button variant="contained" color="secondary">
                                        {t('details')}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}