import { configureStore } from '@reduxjs/toolkit';
// import itemReducer from '@entities/item/redux/itemSlice';
import userReducer from '@entities/user/model/redux/userSlice';

export const store = configureStore({
  reducer: {
    user.userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
