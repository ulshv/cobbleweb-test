import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ACCESS_TOKEN_LS_KEY } from '../../constants';

export interface UserState {
  accessToken: string;
  profile: null | {
    firstName: string;
    lastName: string;
    avatar: string;
    photos: Array<{ url: string }>;
  };
}

const initialState: UserState = {
  accessToken: localStorage.getItem(ACCESS_TOKEN_LS_KEY) || '',
  profile: null,
};

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setProfile: (state, action: PayloadAction<UserState['profile']>) => {
      state.profile = action.payload;
    },
    logout: (state) => {
      state.accessToken = '';
      state.profile = null;
    },
  },
});

export const { setAccessToken, setProfile, logout } = counterSlice.actions;

export default counterSlice.reducer;
