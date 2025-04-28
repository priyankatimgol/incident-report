import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  file: '',
};

const signatureSlice = createSlice({
  name: 'signature',
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.processTypeList = action.payload;
    },
  },
});

export const { setFile } = signatureSlice.actions;
export const getFile = (state) => state.signature.file;

export default signatureSlice.reducer;
