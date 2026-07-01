import React from 'react';
import styles from './LoginPage.module.scss';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUser } from '../../entities/user/hooks/userHook';
import type { LoginCredentials } from '@/entities/user/model/types/types';
import { loginSchema } from '@/entities/user/model/schema/schema';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage(): React.JSX.Element {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const { loginHandler, error } = useUser();

  async function onSubmit(data: LoginCredentials): Promise<void> {
    const result = await loginHandler(data);
    if (result.type.endsWith('fulfilled')) {
      reset();
      void navigate('/');
    }
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>С возвращением 👋</h1>
        <p className={styles.subtitle}>Войдите, чтобы продолжить свайпать вакансии</p>

        <input className={styles.input} type="email" {...register('email')} placeholder="Почта" />
        {errors.email && <p className={styles.text}>{errors.email.message}</p>}

        <input
          className={styles.input}
          type="password"
          {...register('password')}
          placeholder="Пароль"
        />
        {errors.password && <p className={styles.text}>{errors.password.message}</p>}
        {error && <p className={styles.text}>{error}</p>}

        <button className={styles.button} type="submit">
          Войти
        </button>

        <p className={styles.switch}>
          Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
        </p>

        <div className={styles.demo}>
          <strong>Демо-доступ</strong>
          <span>Соискатель: ivan@hr.dev</span>
          <span>HR: hr@hr.dev</span>
          <span>Пароль: qwerty123</span>
        </div>
      </form>
    </main>
  );
}
