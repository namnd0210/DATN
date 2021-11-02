export type Action = {
  type: string;
  payload?: any;
};

export type LoginProps = {
  email: string;
  password: string;
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
