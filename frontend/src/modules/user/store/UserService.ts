import { API_URL } from 'modules/shared';
import { Profile } from '../types';
import { UNAUTHORIZED_ERR } from '../constants';

export class UserService {
  async getProfile(authToken: string): Promise<Profile> {
    return fetch(`${API_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((res) => {
      if (res.status === 401) throw new Error(UNAUTHORIZED_ERR);
      return res.json();
    });
  }
}
