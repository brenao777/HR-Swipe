import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/entities/user/model/redux/userSlice';
import resumeSlice from '@/entities/Resume/model/redux/resumeSlice';
import companyReducer from '@/entities/Company/model/redux/companySlice';
import vacanciesSlice from '@/entities/Vacancy/model/redux/vacancySlice';
import chatSlice from '@/entities/Chat/model/redux/chatSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    chat: chatSlice.reducer,
    company: companyReducer,
    resume: resumeSlice.reducer,
    vacancies: vacanciesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
