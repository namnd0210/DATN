import { Home } from 'container/home/Home';
import { Landing } from 'container/landing';
import { RouteType } from 'types/routers';

export const commonRoutes: Array<RouteType> = [
  {
    path: '/',
    component: Landing,
    role: [0, 1, 2],
    exact: true,
    isPublic: true,
  },
  {
    path: '/home',
    component: Home,
    role: [0, 1, 2],
    exact: true,
    isPublic: false,
  },
];
