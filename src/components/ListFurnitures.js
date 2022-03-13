import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { successNotification } from '../utils/Notifications';
import { fontSize } from '@mui/system';


export default function ListFurnitures() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const columns = [
        // { field: "businessKey", hide: true },
        { field: 'name', headerName: t('furniture.name'), flex: 1},
        { field: 'category', headerName: t('category'), flex: 1},
        { field: 'description', headerName: t('description'), flex: 1},
        { field: 'amount', headerName: t('amount'), flex: 1},
        { field: 'price', headerName: t('price'), flex: 1}
    ];


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
                    console.log(response);
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
            <div style={{ height: 400, width: '100%' }}>
                <Paper style={{fontSize: '32px'}}>
                    {t('furniture.list')}
                </Paper>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            getRowId={(row) => row.businessKey}
                            rows={list}
                            columns={columns}
                            pageSize={5}
                        />
                    </div>
                </div>
            </div>
        )
    }
}