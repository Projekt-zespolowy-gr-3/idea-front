import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Paper, Table, TableHead, TableRow } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { successNotification } from '../utils/Notifications';

export default function ListFurnitures() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (localStorage.getItem("logged") !== null) {
            successNotification("login.success", " ");
            localStorage.removeItem("logged");
        }
        if (localStorage.getItem("registered") !== null) {
            successNotification("registration.success", " ", 0);
            localStorage.removeItem("registered");
        }
        if (localStorage.getItem("confirmed") !== null) {
            successNotification("confirmation.success", " ", 0);
            localStorage.removeItem("confirmed");
        }
        setLoading(true);
        FetchService.getFurnitures()
            .then(response => {
                if (response) {
                    setList(response);
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

                        </TableRow>
                    </TableHead>
                </Table>
            </Paper>
        )
    }
}