import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  StatusName: [],
};

const refDataSlice = createSlice({
  name: 'statusname',
  initialState,
  reducers: {
    setReferenceName: (state, action) => {
  
      // state.StatusName = action.payload;
    },
  },
});

export const { setReferenceName } = refDataSlice.actions;
export const getrefrenceData = (state) => state.refdata.StatusName;

export default refDataSlice.reducer;
