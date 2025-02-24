import { configureStore } from '@reduxjs/toolkit';
import userSlice from '@/entities/user/model/redux/userSlice';
import resumeSlice from '@/entities/Resume/model/redux/resumeSlice';
import companyReducer from '@/entities/Company/model/redux/companySlice';
import vacanciesSlice from '@/entities/Vacancy/model/redux/vacancySlice';
import conditionsReduser from '@/entities/Conditions/modal/redux/conditionsSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    company: companyReducer,
    resume: resumeSlice.reducer,
    vacancies: vacanciesSlice.reducer,
    conditions: conditionsReduser,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
