import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: localStorage.getItem('user_id') ? JSON.parse(localStorage.getItem('user_id')) : 1,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.userId = payload;
      localStorage.setItem('user_id', JSON.stringify(state.userId));
    },
  },
});

export const { setUser } = userSlice.actions;
export const getUser = (state) => state.user.userId;
export default userSlice.reducer;
