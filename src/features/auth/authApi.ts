import { instance } from 'common/instance/instance';
import { BaseResponseType } from 'common/types/types';

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<BaseResponseType<{ userId?: number }>>('auth/login', data);
  },
  logout() {
    return instance.delete<BaseResponseType<{ userId?: number }>>('auth/login');
  },
  me() {
    return instance.get<BaseResponseType<{ id: number; email: string; login: string }>>('auth/me');
  },
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
