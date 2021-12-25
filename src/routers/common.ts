import AssignmentDetail from 'container/AssignmentDetail';
import ClassDetail from 'container/ClassDetail';
import { Home } from 'container/home/Home';
import { Landing } from 'container/landing';
import { Report } from 'container/report/Report';
import MyClasses from 'container/user/MyClasses';
import Profile from 'container/user/Profile';
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
    path: '/report',
    component: Report,
    role: [2],
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
    component: ClassDetail,
    role: [2],
    exact: true,
    isPublic: false,
  },
  {
    path: '/my-class/:classId/assignment/:assignmentId',
    component: AssignmentDetail,
    role: [2],
    exact: true,
    isPublic: false,
  },
  {
    path: '/setting/profile',
    component: Profile,
    role: [0, 1, 2],
    exact: true,
    isPublic: false,
  },
];
