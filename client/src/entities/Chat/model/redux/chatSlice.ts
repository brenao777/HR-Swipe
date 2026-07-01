import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export type ChatMessage = {
  id: string;
  userId?: number;
  message: string;
  name: string;
};

const initialState: ChatMessage[] = [];

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    message: (state, action: PayloadAction<ChatMessage>) => {
      state.push(action.payload);
    },
    setChatHistory: (_state, action: PayloadAction<ChatMessage[]>) => action.payload,
  },
});

export const { message, setChatHistory } = chatSlice.actions;
export default chatSlice;
