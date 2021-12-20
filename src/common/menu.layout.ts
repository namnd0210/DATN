export const menus: any[] = [
  {
    title: 'Quản lí',
    role: [0, 1],
    items: [
      {
        title: 'Thành viên',
        link: '/manage/users',
        role: [0],
      },
      {
        title: 'Bài thi',
        link: '/manage/exams',
        role: [0, 1],
      },
      {
        title: 'Câu hỏi',
        link: '/manage/question',
        role: [0, 1],
      },
      {
        title: 'Các loại câu hỏi',
        link: '/manage/category',
        role: [0, 1],
      },
      {
        title: 'Các lớp',
        link: '/manage/class',
        role: [0, 1],
      },
      {
        title: 'Bài tập',
        link: '/manage/assignment',
        role: [0, 1],
      },
    ],
  },
  {
    title: 'Kết quả',
    link: '/manage/report',
    role: [0, 1],
    items: [],
  },
  {
    title: 'Lớp học của tôi',
    link: '/manage/my-class',
    role: [2],
    items: [],
  },
  {
    title: 'Thông tin cá nhân',
    link: '/setting/profile',
    role: [0, 1],
    items: [],
  },
  {
    title: 'Đổi mật khẩu',
    link: '/setting/change-password',
    role: [0, 1],
    items: [],
  },
];

export const translateData: any = {
  manage: 'Quản lí',
  users: 'Thành viên',
  exams: 'Bài thi',
  question: 'Câu hỏi',
  category: 'Các loại câu hỏi',
  class: 'Các lớp',
  assignment: 'Bài tập',
  report: 'Kết quả',
  'my-class': 'Lớp học của tôi',
  setting: 'Cài đặt',
  profile: 'Thông tin cá nhân',
  'change-password': 'Đổi mật khẩu',
};
