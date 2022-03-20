import React, { useEffect, useState } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import { Paper } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import BeatLoader from 'react-spinners/BeatLoader';
import { successNotification } from '../utils/Notifications';
import FurnitureDetails from './FurnitureDetails';

export default function ListFurnitures() {

    const classes = useStyles();
    const { t } = useTranslation();
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pageSize, setPageSize] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [showDetails, setShowDetails] = useState(false);
    const [furnitureKey, setFurnitureKey] = useState("");

    const columns = [
        {
            field: 'name', headerName: t('furniture.name'), flex: 1,
            disableClickEventBubbling: true, renderCell: (params) => (
                <label onClick={() => {
                    setFurnitureKey(params.row.businessKey);
                    setShowDetails(true);
                }}>
                    {params.row.name}
                </label>
            )
        },
        { field: 'category', headerName: t('category'), flex: 1 },
        { field: 'description', headerName: t('description'), flex: 1 },
        { field: 'amount', headerName: t('amount'), flex: 1 },
        { field: 'price', headerName: t('price'), flex: 1 }
    ];

    function changePage(newPage) {
        fetchFurnitures(newPage, pageSize);
        setCurrentPage(newPage);
        console.log(newPage);
    }

    function changePageSize(newPageSize) {
        setPageSize(newPageSize);
        fetchFurnitures(currentPage, newPageSize);
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
        fetchFurnitures(currentPage, pageSize);

    }, [currentPage, pageSize])

    function fetchFurnitures(currentPage, pageSize) {
        setLoading(true);
        FetchService.getFurnitures(currentPage, pageSize)
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

        {/* TODO przykład */ }
        let image = "";
        if (list[19]) {
            image = "data:image/png;base64," + list.furnitureList[1].photo;
        }

        if (showDetails !== true) {
            return (
                <div style={{ height: 650, width: '100%' }}>
                    <Paper style={{ fontSize: '32px' }}>
                        {t('furniture.list')}
                    </Paper>

                    {/* TODO przykład */}
                    <img src={image} />


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