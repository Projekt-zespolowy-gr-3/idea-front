import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import FetchService from '../services/FetchService';
import { getUsername } from '../services/UserDataService';
import { LoadingCss } from '../css/Styles';
import BeatLoader from 'react-spinners/BeatLoader';

export default function UserDetails() {

    const { t } = useTranslation();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        FetchService.getUser(getUsername())
            .then(response => {
                if (response) {
                    setUser(response);
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
            <div>
                <h2>{t('username')}: {user.login}</h2>
                <h2>{t('name.surname')}: {user.name} {user.surname}</h2>
                <h2>{t('email')}: {user.email}</h2>
            </div>
        )
    }
}