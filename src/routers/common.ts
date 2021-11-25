import { Home } from 'container/home/Home';
import { Landing } from 'container/landing';
import { Report } from 'container/report/Report';
import MyClasses from 'container/user/MyClasses';
import { TakeExam } from 'container/user/TakeExam';
import { RouteType } from 'types/routers';

import AssignmentList from '../container/user/AssignmentList/index';

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
  {
    path: '/exam/take/:id',
    component: TakeExam,
    role: [0, 1, 2],
    exact: true,
    isPublic: false,
  },
  {
    path: '/manage/report',
    component: Report,
    role: [0, 1, 2],
    exact: true,
    isPublic: false,
  },
  {
    path: '/my-class',
    component: MyClasses,
    role: [2],
    exact: true,
    isPublic: false,
  },
  {
    path: '/my-class/:classId',
    component: MyClass,
    role: [2],
    exact: true,
    isPublic: false,
  },
  {
    path: '/assignment/:assignmentId',
    component: AssignmentList,
    role: [2],
    exact: true,
    isPublic: false,
  },
];
