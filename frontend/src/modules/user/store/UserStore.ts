import { RootStore } from 'modules/shared';
import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';

import { UserService } from './UserService';
import { UNAUTHORIZED_ERR } from '../constants';
import { Profile } from '../types';

export class UserStore {
  userService = new UserService();

  profile: Profile | null = null;

  constructor(private rootStore: RootStore) {
    makeAutoObservable(this);
  }

  async loadProfile() {
    const { authStore } = this.rootStore;

    if (!authStore.authToken) return;

    try {
      const profile = await this.userService.getProfile(authStore.authToken);
      this.profile = profile;
    } catch (err: any) {
      if (err.message === UNAUTHORIZED_ERR) {
        authStore.logout();
        toast('Auth session expired, please relogin.', { type: 'error' });
      } else {
        toast(`Error while loading the profile page: ${err.message}`, {
          type: 'error',
        });
      }
    }
  }
}
