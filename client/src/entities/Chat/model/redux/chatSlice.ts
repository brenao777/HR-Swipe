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
    // Новый редюсер для установки полной истории
    setChatHistory: (state, action: PayloadAction<ChatState[]>) => action.payload, // Заменяем текущее состояние на полную историю
  },
});

export const { message, setChatHistory } = chatSlice.actions;
export default chatSlice;
