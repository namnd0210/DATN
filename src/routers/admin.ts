import CategoryManagement from 'container/admin/category';
import ClassManagement from 'container/admin/class/index';
import { QuestionManagement } from 'container/admin/question';
import UserManagement from 'container/admin/user';
import { RouteType } from 'types/routers';

import { ExamManagement } from './../container/admin/exam/index';

export const adminRoutes: Array<RouteType> = [
  {
    path: '/manage/class',
    component: ClassManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
  {
    path: '/manage/category',
    component: CategoryManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
  {
    path: '/manage/question',
    component: QuestionManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
  {
    path: '/manage/users',
    component: UserManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
  {
    path: '/manage/exams',
    component: ExamManagement,
    role: [0],
    exact: true,
    isPublic: false,
  },
];
