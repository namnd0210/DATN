import { Home } from 'container/home/Home';
import { Landing } from 'container/landing';
import { Report } from 'container/report/Report';
import Assignment from 'container/user/assignment';
import MyClass from 'container/user/MyClass';
import { TakeExam } from 'container/user/TakeExam';
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
    component: MyClass,
    role: [2],
    exact: true,
    isPublic: false,
  },
  {
    path: '/assignment',
    component: Assignment,
    role: [2],
    exact: true,
    isPublic: false,
  },
];
