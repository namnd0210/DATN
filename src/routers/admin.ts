import ClassManagement from 'container/admin/class/index';
import { RouteType } from 'types/routers';

export const adminRoutes: Array<RouteType> = [
  {
    path: '/class',
    component: ClassManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
];
