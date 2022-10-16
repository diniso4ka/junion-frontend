import React from 'react';
import * as routes from '../../app/routes/consts';

export const RegisterAsync = React.lazy(() => import(routes.ROUTE_REGISTER));
