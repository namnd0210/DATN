export type Action = {
  type: string;
  payload?: any;
};

export type UserProps = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  date: string;
  role: number;
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

export type ExamProps = {
  _id: string;
  title: string;
  description: string;
  questions: QuestionProps[];
  created_by: string;
  created_at: string;
};

export type ResultProps = {
  _id: string;
  exam: ExamProps;
  user: UserProps;
  result: string;
  updated_at: string;
  created_at: string;
};

export type AssignmentProps = {
  _id: string;
  title: string;
  description: string;
  images?: string[];
  comments?: any[];
  due_at: string;
  user: UserProps;
  created_by: UserProps;
};

export type ClassProps = {
  _id: string;
  name: string;
  teacher: UserProps;
  exam: ExamProps;
  students: UserProps[];
  updated_at: string;
  updated_by: string;
  created_at: string;
  created_by: string;
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
  total: number;
};

export type QuestionState = {
  loadingQuestion: boolean;
  questions: QuestionProps[];
  total: number;
};

export type ClassState = {
  loading: boolean;
  classes: ClassProps[];
  total: number;
  currentClass: any;
};

export type UserState = {
  loading: boolean;
  users: UserProps[];
  total: number;
};

export type ExamState = {
  loading: boolean;
  exams: ExamProps[];
  total: number;
  exam: ExamProps | {};
};

export type ResultState = {
  loading: boolean;
  results: ResultProps[];
  total: number;
  result: ResultProps | {};
};

export type AssignmentState = {
  loading: boolean;
  assignments: AssignmentProps[];
  total: number;
};
