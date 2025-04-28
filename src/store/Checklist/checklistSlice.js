import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  processTypeList: '',
  type: '',
};

const checklistSlice = createSlice({
  name: 'checklist',
  initialState,
  reducers: {
    setProcessTypeList: (state, action) => {
      state.processTypeList = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setProcessTypeList, setType } = checklistSlice.actions;
export const getProcessTypeList = (state) => state.checklist.processTypeList;
export const getType = (state) => state.checklist.type;
export default checklistSlice.reducer;
