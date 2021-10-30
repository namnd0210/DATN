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

export type AuthState = {
  isAuthenticated: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  user: {
    role: number;
    name: string;
  };
  error: string;
};
