import CategoryManagement from 'container/admin/category';
import ClassManagement from 'container/admin/class/index';
import { QuestionManagement } from 'container/admin/question';
import UserManagement from 'container/admin/user';
import { RouteType } from 'types/routers';

export const adminRoutes: Array<RouteType> = [
  {
    path: '/class',
    component: ClassManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
  {
    path: '/category',
    component: CategoryManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
  {
    path: '/question',
    component: QuestionManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
  {
    path: '/users',
    component: UserManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
];
