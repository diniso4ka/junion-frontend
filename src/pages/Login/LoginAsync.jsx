import React from 'react';
import * as routes from '../../app/routes/consts';

export const LoginAsync = React.lazy(() => import(routes.ROUTE_LOGIN));
