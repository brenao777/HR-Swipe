import React from 'react';
import styles from './LoginPage.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../entities/user/hooks/userHook';
import type { LoginCredentials } from '@/entities/user/model/types/types';
import { loginSchema } from '@/entities/user/model/schema/schema';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(): React.JSX.Element {
  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const { loginHandler } = useUser();

  async function onSubmit(data: LoginCredentials): Promise<void> {
    await loginHandler(data);
    reset();
    await redirect('/');
  }

  return (
    <>
      <main className={styles.main}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={styles.title}>Войти</h1>
          <input
            className={styles.input}
            type="email"
            {...register('email')}
            placeholder="Почта"
          />
          {errors.email && <p className={styles.text}>{errors.email.message}</p>}

          <input
            className={styles.input}
            type="password"
            {...register('password')}
            placeholder="Пароль"
          />
          {errors.password && <p className={styles.text}>{errors.password.message}</p>}

          <button className={styles.button} type="submit">
            Вход
          </button>
        </form>
      </main>
    </>
  );
}
