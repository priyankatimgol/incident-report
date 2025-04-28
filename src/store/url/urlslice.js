import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  urlName: '',
};

const urlslice = createSlice({
  name: 'Baseurlname',
  initialState,
  reducers: {
    setStatusUrlName: (state, action) => {
      state.urlName = action.payload;
    },
  },
});

export const { setStatusUrlName } = urlslice.actions;
export const geturlname = (state) => state.Baseurlname.urlName;

export default urlslice.reducer;
