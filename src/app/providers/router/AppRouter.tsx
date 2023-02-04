import React from 'react';

import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from 'app/store/config/StateSchema';
import { getAuthData } from 'entities/User';
import NotFound from 'pages/NotFound/NotFound';
import {
	privateRoutes,
	publicRoutes,
} from 'shared/config/routeConfig/routeConfig';

import { PageLoader } from 'widgets/PageLoader/PageLoader';

const AppRouter = () => {
	const authData = useAppSelector(getAuthData);

	return authData ? (
		<React.Suspense fallback={<PageLoader />}>
			<Routes>
				{privateRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path={'*'} element={<NotFound />} />
			</Routes>
		</React.Suspense>
	) : (
		<React.Suspense fallback={<PageLoader />}>
			<Routes>
				{publicRoutes.map(({ path, Component }) => (
					<Route key={path} path={path} element={<Component />} />
				))}
				<Route path={'*'} element={<NotFound />} />
			</Routes>
		</React.Suspense>
	);
};

export default AppRouter;
