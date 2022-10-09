import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TUserState {
  isPermission: boolean;
  user: {
    accout?: string;
    name?: string;
    firstName?: string;
    lastName?: string;
    userId?: string;
    email?: string;
    tel?: string;
    addressCountry?: string;
  };
}

const initialState: TUserState = {
  isPermission: false,
  user: {},
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        accout?: string;
        name?: string;
      }>,
    ) => {
      state.user = action.payload;
    },
    setIsPermission: (state) => {
      state.isPermission = true;
    },
    resetUserStore: (state) => {
      state.isPermission = false;
      state.user = {};
    },
    // decrement: (state) => {
    // 	state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    // 	state.value += action.payload;
    // },
  },
});
export const { setUser, setIsPermission, resetUserStore } = UserSlice.actions;

export default UserSlice.reducer;
