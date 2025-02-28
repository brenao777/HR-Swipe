import type { RootState } from '@/app/store/store';
import { message, setChatHistory } from '@/entities/Chat/model/redux/chatSlice';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { v4 as uuidv4 } from 'uuid';
import styles from './Chat.module.scss';

type ChatMessage = {
  message: string;
  name: string;
};

const socket = io('http://localhost:3000/');

export default function Chat(): React.JSX.Element {
  const user = useAppSelector((store: RootState) => store.user.data);
  const chat = useAppSelector((store: RootState) => store.chat);
  const [msg, setMsg] = useState('');
  const dispatch = useAppDispatch();

  const sendMessage = (): void => {
    if (msg.trim()) {
      const newMessage = { message: msg, name: user?.firstName ?? 'Человек' };
      socket.emit('chat', newMessage);
      setMsg('');
    }
  };

  useEffect(() => {
    // Получение истории чата при подключении
    socket.on('chatHistory', (history: ChatMessage[]) => {
      dispatch(setChatHistory(history));
    });

    // Получение новых сообщений
    socket.on('chat', (data: ChatMessage) => {
      dispatch(message(data));
    });

    // Очистка слушателей при размонтировании
    return () => {
      socket.off('chatHistory');
      socket.off('chat');
    };
  }, [dispatch]);

  return (
    <div className={styles.chatContainer}>
      <h1>Чат</h1>
      <div className={styles.messages}>
        {chat.map((item) => (
          <div
            key={uuidv4()}
            className={`${styles.message} ${user?.name === item.name ? styles.you : styles.other}`}
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
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
