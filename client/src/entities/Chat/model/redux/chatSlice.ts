import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ChatState = {
  message: string;
  name: string;
};

const initialState: ChatState[] = [];

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    message: (state, action: PayloadAction<ChatState>) => {
      state.push(action.payload);
    },
  },
});

export const { message } = chatSlice.actions;
export default chatSlice;
