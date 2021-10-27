export type Action = {
  type: string;
  payload?: any;
};

export type LoginProps = {
  email: string;
  password: string;
};

export type AuthState = {
  authenticated: boolean;
  loginLoading: boolean;
};
