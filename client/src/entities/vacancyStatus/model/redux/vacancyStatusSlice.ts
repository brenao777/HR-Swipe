import { createSlice } from '@reduxjs/toolkit';
import { createResponse } from './vacancyStatusThunk';

type InitialState = {
  error: string | null;
};

const InitialState: InitialState = {
  error: null,
};

export const vacancyStatusSlice = createSlice({
  name: 'vacancyStatus',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createResponse.rejected, (state, action) => {
      state.error = action.payload as string;
      console.log('ОШИБКА В СЛАЙСЕ ---->', action.payload);
    });
  },
});

export default { vacancyStatusSlice };
