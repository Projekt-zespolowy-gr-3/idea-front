import React, { useEffect } from 'react';
import FetchService from '../services/FetchService';
import { errorNotification } from '../utils/Notifications';
import { useTranslation } from 'react-i18next';

export default function Confirm() {

    const { t } = useTranslation();

    useEffect(() => {

        const token = new URLSearchParams(window.location.search).get("token");
        if (token === null || token === "") {
            errorNotification("unexpected.error", " ");
        } else {
            FetchService.confirm(token)
                .then(response => {
                    if(response) {
                        localStorage.setItem("confirmed", "");
                        window.location.replace("/");
                    }
                })
        }
    }, [])


    return (
        <div>
            <h1>{t('confirm.processing')}</h1>
        </div>
    )
}