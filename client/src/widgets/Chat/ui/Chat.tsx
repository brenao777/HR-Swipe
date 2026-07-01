import type { RootState } from '@/app/store/store';
import type { ChatMessage } from '@/entities/Chat/model/redux/chatSlice';
import { message, setChatHistory } from '@/entities/Chat/model/redux/chatSlice';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import styles from './Chat.module.scss';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
const socket = io(SOCKET_URL);

export default function Chat(): React.JSX.Element {
  const user = useAppSelector((store: RootState) => store.user.data);
  const chat = useAppSelector((store: RootState) => store.chat);
  const [msg, setMsg] = useState('');
  const dispatch = useAppDispatch();

  const sendMessage = (): void => {
    const text = msg.trim();
    if (!text) return;
    const newMessage: ChatMessage = {
      id: uuidv4(),
      userId: user?.id,
      message: text,
      name: user?.firstName ?? 'Гость',
    };
    socket.emit('chat', newMessage);
    setMsg('');
  };

  useEffect(() => {
    socket.on('chatHistory', (history: ChatMessage[]) => {
      dispatch(setChatHistory(history));
    });
    socket.on('chat', (data: ChatMessage) => {
      dispatch(message(data));
    });

    return () => {
      socket.off('chatHistory');
      socket.off('chat');
    };
  }, [dispatch]);

  return (
    <div className={styles.chatContainer}>
      <h1>Чат</h1>
      <div className={styles.messages}>
        {chat.length === 0 && <p className={styles.empty}>Сообщений пока нет — начните диалог!</p>}
        {chat.map((item) => (
          <div
            key={item.id}
            className={`${styles.message} ${item.userId === user?.id ? styles.you : styles.other}`}
          >
            {item.message}
            <small>{item.name}</small>
          </div>
        ))}
      </div>
      <div className={styles.chatInput}>
        <input
          type="text"
          placeholder="Введите сообщение..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Отправить</button>
      </div>
    </div>
  );
}
