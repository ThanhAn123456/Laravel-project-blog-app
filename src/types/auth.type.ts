export interface SignInType {
  email: string;
  password: string;
}

export interface SignUpType {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ResetPasswordType {
  email: string | null;
  password: string;
  password_confirmation: string;
  token: string | null;
}

export interface ForgotPasswordType {
  email: string;
}
