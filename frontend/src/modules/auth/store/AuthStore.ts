import { ChangeEvent } from 'react';
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

import { RootStore, browserHistory } from 'modules/shared';
import { AuthService } from './AuthService';
import { formatError } from '../utils';
import { LoginParams, RegisterParams } from '../types';

const AUTH_TOKEN_LS_KEY = 'app.authToken';

export class AuthStore {
  private authService = new AuthService();

  authToken = localStorage.getItem(AUTH_TOKEN_LS_KEY);

  loginError = '';
  registerError = '';

  registerPhotos: File[] = [];

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async login(params: LoginParams, setSubmitting: (v: boolean) => void) {
    this.loginError = '';

    const {
      success,
      access_token: token,
      message,
    } = await this.authService.login(params);

    if (success) {
      localStorage.setItem(AUTH_TOKEN_LS_KEY, token);
      this.authToken = token;
      browserHistory.push('/profile');
    } else {
      this.loginError = formatError(message);
    }

    setSubmitting(false);
  }

  async register(
    params: Omit<RegisterParams, 'photos'>,
    setSubmitting: (v: boolean) => void,
  ) {
    this.registerError = '';

    const { success, message } = await this.authService.register({
      ...params,
      photos: this.registerPhotos,
    });

    if (success) {
      browserHistory.push('/login');
      toast(
        `You've successfuly registered. Now, please log in with your credentials.`,
        { type: 'success' },
      );
    } else {
      this.registerError = formatError(message);
    }

    setSubmitting(false);
  }

  logout() {
    this.authToken = '';
    localStorage.setItem(AUTH_TOKEN_LS_KEY, '');
  }

  setPhotos(event: ChangeEvent<HTMLInputElement>) {
    this.registerPhotos = [...(event.target.files || [])];
  }
}
