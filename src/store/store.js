import { configureStore } from '@reduxjs/toolkit';
import checklistSlice from './Checklist/checklistSlice';
import refDataSlice from './RefDataStore/refDataSlice';
import signatureSlice from './Signature/signatureSlice';

import statusSlice from './Statusname/statusnameSlice';
import processidSlice from './processId/processidSlice';
import urlslice from './url/urlslice';
export const store = configureStore({
  reducer: {
    checklist: checklistSlice,
    signature: signatureSlice,
    statusName: statusSlice,
    Baseurlname: urlslice,
    processid: processidSlice,
    refdata: refDataSlice,
  },
});
