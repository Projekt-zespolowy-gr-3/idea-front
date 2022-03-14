import React, { useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { successNotification } from '../utils/Notifications';


export default function ListFurnitures() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [pageSize, setPageSize] = React.useState(5);

    const columns = [
        // { field: "businessKey", hide: true },
        { field: 'name', headerName: t('furniture.name'), flex: 1 },
        { field: 'category', headerName: t('category'), flex: 1 },
        { field: 'description', headerName: t('description'), flex: 1 },
        { field: 'amount', headerName: t('amount'), flex: 1 },
        { field: 'price', headerName: t('price'), flex: 1 }
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

        {/* TODO przykład */}
        let image = "";
        if(list[19]) {
            image = "data:image/png;base64," + list[19].photo;
        }

        return (
            <div style={{ height: 650, width: '100%' }}>
                <Paper style={{ fontSize: '32px' }}>
                    {t('furniture.list')}
                </Paper>

                {/* TODO przykład */}
                <img src={image} />


                <DataGrid
                    getRowId={(row) => row.businessKey}
                    rows={list}
                    columns={columns}
                    onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    pageSize={pageSize}
                    rowsPerPageOptions={[5, 10, 20]}
                    pagination
                />
            </div>
        )
    }
}