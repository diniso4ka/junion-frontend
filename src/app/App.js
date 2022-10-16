import React from 'react';
import cls from 'classnames';
import './styles/index.css';
import { useTranslation } from 'react-i18next';

const App = () => {
    const [theme, setTheme] = React.useState('default');
    const { t, i18n } = useTranslation();
    const toggleTheme = () => {
        setTheme((prev) => (prev === 'default' ? 'dark' : 'default'));
    };
    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <div className={cls('app', theme === 'default' ? '' : 'dark')}>
            {t('main')}
            <button type='button' onClick={toggleLang}>{t('button')}</button>
            <button type='button' onClick={toggleTheme}>{t('toggle')}</button>
        </div>
    );
};

export default App;
