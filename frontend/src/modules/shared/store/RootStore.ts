import { AuthStore } from 'modules/auth';
import { UserStore } from 'modules/user';

export class RootStore {
  authStore = new AuthStore(this);
  userStore = new UserStore(this);
}
