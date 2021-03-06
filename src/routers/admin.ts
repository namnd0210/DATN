import AssignmentManagement from 'container/admin/assignment';
import AssignmentResultDetail from 'container/admin/assignment/AssignmentResultDetail';
import CategoryManagement from 'container/admin/category';
import ClassManagement from 'container/admin/class/index';
import { QuestionManagement } from 'container/admin/question';
import UserManagement from 'container/admin/user';
import AssignmentDetail from 'container/AssignmentDetail';
import ClassDetail from 'container/ClassDetail';
import { Report } from 'container/report/Report';
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
    path: '/manage/class/:classId',
    component: ClassDetail,
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
  {
    path: '/manage/assignment',
    component: AssignmentManagement,
    role: [1],
    exact: true,
    isPublic: false,
  },
  {
    path: '/manage/class/:classId/assignment/:assignmentId',
    component: AssignmentDetail,
    role: [0, 1],
    exact: true,
    isPublic: false,
  },
  {
    path: '/my-class/:classId/assignment/:assignmentId/assignment-result/:assignmentResultId',
    component: AssignmentResultDetail,
    role: [0, 1, 2],
    exact: true,
    isPublic: false,
  },
  {
    path: '/manage/report',
    component: Report,
    role: [0, 1],
    exact: true,
    isPublic: false,
  },
];
