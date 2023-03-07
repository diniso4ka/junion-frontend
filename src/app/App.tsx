import cls from 'classnames';
import { FC, useEffect } from 'react';

import { thunkGetCategoriesList } from 'entities/Categories/model/services/thunkGetCategoriesList';
import { thunkFetchProductList } from 'entities/Products/model/services/thunkGetProductsList';
import { getAuthData, getInitialize, thunkCheckAuthMe } from 'entities/User';
import { getPopupInfo, Popup } from 'features/PopupInfo';
import { useMountEffect } from 'shared/hooks/useMountEffect';

import Header from 'widgets/Header/Header';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import Sidebar from 'widgets/Sidebar/Sidebar';

import { thunkGetVendorsList } from '../entities/Vendors';
import AppRouter from './providers/router/AppRouter';
import { Theme } from './providers/ThemeProvider/ThemeContext';
import { useTheme } from './providers/ThemeProvider/useTheme';
import { useAppDispatch, useAppSelector } from './store/config/StateSchema';

import './styles/index.scss';

const App: FC = () => {
	const popupInfo = useAppSelector(getPopupInfo);
	const authData = useAppSelector(getAuthData);
	const initialize = useAppSelector(getInitialize);
	const dispatch = useAppDispatch();
	const { theme } = useTheme();

	useMountEffect(() => {
		dispatch(thunkCheckAuthMe());
	});

	useEffect(() => {
		if (authData) {
			dispatch(thunkFetchProductList());
			dispatch(thunkGetCategoriesList());
			dispatch(thunkGetVendorsList());
		}
	}, [dispatch, authData]);

	return (
		<div className={cls('app', theme === Theme.LIGHT ? 'default' : 'dark')}>
			<Header onClick={(e) => e.stopPropagation()} />
			{!initialize && <PageLoader />}
			{initialize && (
				<div className='pageWrapper'>
					{authData && <Sidebar />}
					<AppRouter />
				</div>
			)}
			{popupInfo.visible && <Popup />}
		</div>
	);
};

export default App;
