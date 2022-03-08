import { useTranslation } from 'react-i18next';

export default function AccessDenied() {

    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('access.denied')}</h1>
        </div>
    )
}