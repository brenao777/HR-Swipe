import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/entities/user/model/redux/userSlice';
import resumeSlice from '@/entities/Resume/model/redux/resumeSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    resume: resumeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
