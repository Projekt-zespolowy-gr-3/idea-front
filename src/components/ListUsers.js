import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Checkbox, FormControlLabel, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';

export default function ListUsers() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        setLoading(true);
        FetchService.getAccounts()
            .then(response => {
                if (response) {
                    setList(response);
                }
            }).then(() => {
                setLoading(false);
            })
    }, [])

    const handleRoleChange = (login, role) => {
        setLoading(true);
        FetchService.changeRole(login, role)
            .then(response => {
                if (response) {
                    window.location.reload();
                }
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
            <Paper className={classes.table}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('username')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('email')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('name')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('surname')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('role.admin')}
                            </TableCell>
                            <TableCell align="center" className={classes.tableHeaders}>
                                {t('role.client')}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(row => (
                            <TableRow key={row.login}>
                                <TableCell align="center">
                                    {row.login}
                                </TableCell>
                                <TableCell align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell align="center">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">
                                    {row.surname}
                                </TableCell>
                                <TableCell align="center">
                                    <FormControlLabel control={
                                        <Checkbox checked={row.accessLevels.includes("ADMIN")} onChange={() => handleRoleChange(row.login, "ADMIN")} />
                                    } />
                                </TableCell>
                                <TableCell align="center">
                                    <FormControlLabel control={
                                        <Checkbox checked={row.accessLevels.includes("CLIENT")} onChange={() => handleRoleChange(row.login, "CLIENT")} />
                                    } />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}