import React, { useState, useEffect } from 'react';
import { LoadingCss, useStyles } from '../css/Styles';
import FetchService from '../services/FetchService';
import BeatLoader from 'react-spinners/BeatLoader';


export default function FurnitureDetails(props) {

    const [furniture, setFurniture] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        FetchService.getFurniture(props.furnitureKey)
            .then(response => {
                if (response) {
                    setFurniture(response);
                }
            }).then(() => {
                setLoading(false);
            })
    }, [props.furnitureKey])

    if (loading) {
        return (
            <div>
                <BeatLoader css={LoadingCss} />
            </div>
        )
    } else {
        return (
            <div>
                {furniture.name}
            </div>
        )
    }
}