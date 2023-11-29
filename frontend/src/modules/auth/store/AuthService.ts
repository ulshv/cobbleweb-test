import { API_URL } from 'modules/shared';
import { LoginParams, RegisterParams } from '../types';

type LoginResponse = {
  success: boolean;
  access_token: string;
  message: string | string[];
};

type RegisterResponse = {
  success: boolean;
  message: string | string[];
};

export class AuthService {
  async login({ email, password }: LoginParams): Promise<LoginResponse> {
    return fetch(`${API_URL}/api/login`, {
      method: 'POST',
      headers: {
        ['Content-Type']: 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .catch((err) => ({ message: err.message }));
  }

  async register(params: RegisterParams): Promise<RegisterResponse> {
    const data = new FormData();

    data.append('firstName', params.firstName);
    data.append('lastName', params.lastName);
    data.append('email', params.email);
    data.append('password', params.password);

    params.photos.forEach((file) => {
      data.append('photos', file, file.name);
    });

    return fetch(`${API_URL}/api/register`, {
      method: 'POST',
      body: data,
    })
      .then((res) => res.json())
      .catch((err) => ({ message: err.message }));
  }
}
