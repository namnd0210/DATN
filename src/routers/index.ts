import { RouteType } from 'types/routers';

import { adminRoutes } from './admin';
import { commonRoutes } from './common';

export const routes: Array<RouteType> = [...commonRoutes, ...adminRoutes];
