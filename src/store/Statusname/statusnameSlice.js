import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  StatusName: '',
};

const statusSlice = createSlice({
  name: 'statusname',
  initialState,
  reducers: {
    setStatusName: (state, action) => {
      state.StatusName = action.payload;
    },
  },
});

export const { setStatusName } = statusSlice.actions;
export const getstatusname = (state) => state.statusName.StatusName;

export default statusSlice.reducer;
