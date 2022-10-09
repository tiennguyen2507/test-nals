import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface TUserState {}

const initialState: TUserState = {};

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,
  reducers: {},
});

export default blogSlice.reducer;
