import React, { useEffect, useState } from 'react';
import { LoadingCss } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Paper, Button, TextField } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { successNotification } from '../utils/Notifications';
import FurnitureDetails from './FurnitureDetails';

export default function ListFurnitures() {

    const { t } = useTranslation();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [furnitureKey, setFurnitureKey] = useState("");

    const columns = [
        {
            field: 'name', headerName: t('furniture.name'), flex: 1,
        },
        { field: 'category', headerName: t('category'), flex: 1 },
        { field: 'description', headerName: t('description'), flex: 1 },
        { field: 'amount', headerName: t('amount'), flex: 1 },
        { field: 'price', headerName: t('price'), flex: 1 },
        {
            field: 'details', headerName: t('details'), flex: 1,
            renderCell: (params) => (
                <Button variant="contained" color="secondary"
                    onClick={() => {
                        setFurnitureKey(params.row.businessKey);
                        setShowDetails(true);
                    }}>
                    {t('details')}
                </Button>)
        }
    ];

    function changePage(newPage) {
        fetchFurnitures(undefiend, newPage, pageSize);
        setCurrentPage(newPage);
        console.log(newPage);
    }

    function changePageSize(newPageSize) {
        setPageSize(newPageSize);
        fetchFurnitures(undefiend, currentPage, newPageSize);
        console.log(newPageSize);
    }

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
        fetchFurnitures(query, currentPage, pageSize, true);

    }, [currentPage, pageSize])

    function fetchFurnitures(query, currentPage, pageSize, spinner) {
        if (spinner) {
            setLoading(true);
        }
        FetchService.getFurnitures(query, currentPage, pageSize)
            .then(response => {
                if (response) {
                    response.furnitureList.forEach(f => f.category = t(f.category));
                    setList(response);
                }
            }).then(() => {
                setLoading(false);
            })
    }

    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        if (showDetails !== true) {
            return (
                <div style={{ height: 650, width: '100%' }}>
                    <Paper style={{ fontSize: '32px' }}>
                        {t('furniture.list')}
                    </Paper>
                    <TextField
                        fullWidth
                        margin="dense"
                        label={t('search')}
                        variant="filled"
                        value={query}
                        onChange={event => {
                            setQuery(event.target.value);
                            fetchFurnitures(event.target.value, currentPage, pageSize, false);
                        }}
                    />
                    <DataGrid
                        paginationMode="server"
                        getRowId={(row) => row.businessKey}
                        rows={list.furnitureList}
                        columns={columns}
                        page={currentPage}
                        rowCount={list.totalRows}
                        onPageChange={(newPage) => changePage(newPage)}
                        onPageSizeChange={(newPageSize) => changePageSize(newPageSize)}
                        pageSize={pageSize}
                        rowsPerPageOptions={[5, 10, 20]}
                        pagination
                    />
                </div>
            )
        } else {
            return (<FurnitureDetails furnitureKey={furnitureKey} />)
        }

    }
}