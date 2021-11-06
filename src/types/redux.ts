export type Action = {
  type: string;
  payload?: any;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type QuestionProps = {
  _id: string;
  category: string;
  question: string;
  answers: string[];
  correctAnswer: number;
  updated_at: string;
  created_at: string;
  updated_by: string;
};

export type RegisterProps = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type CategoryProps = {
  _id: string;
  name: string;
  updated_at: Date;
  created_at: Date;
  updated_by: string;
  created_by: string;
};

export type UserProps = {
  _id: string;
  title: string;
  description: string;
  questions: QuestionProps[];
  created_by: string;
  created_at: string;
};

export type ExamProps = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  date: string;
  role: number;
};

export type AuthState = {
  isAuthenticated: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  user: {
    role: number;
    name: string;
  };
  error: string;
  isAdmin: boolean;
  isTeacher: boolean;
};

export type CategoryState = {
  loadingCategory: boolean;
  categories: CategoryProps[];
};

export type QuestionState = {
  loadingQuestion: boolean;
  questions: any[];
};

export type ClassState = {
  loading: boolean;
  classes: any[];
  currentClass: any;
};

export type UserState = {
  loading: boolean;
  users: UserProps[];
};

export type ExamState = {
  loading: boolean;
  exams: ExamProps[];
};
