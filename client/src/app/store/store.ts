import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/entities/user/model/redux/userSlice';
import companyReducer from '@/entities/Company/model/redux/companySlice'
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    company: companyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
