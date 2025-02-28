import React from 'react';
import type { RegisterFormData } from '@/entities/user/model/types/types';
import { registerSchema } from '@/entities/user/model/schema/schema';
import { submitHandler } from '@/entities/user/model/redux/userThunk';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styles from './RegisterPage.module.scss';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/shared/api/hooks/hooks';

export default function RegisterPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const redirect = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData): Promise<void> => {
    try {
      await dispatch(submitHandler(data)).unwrap();
      reset();

      if (data.company) {
        void redirect('/addcompany');
      } else {
        void redirect('/');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
    }
  };
  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1 className={styles.title}>Регистрация</h1>
        <input
          className={styles.input}
          type="text"
          {...register('firstName')}
          placeholder="Имя..."
        />
        {errors.firstName && <p className={styles.text}>{errors.firstName.message}</p>}
        <input
          className={styles.input}
          type="text"
          {...register('secondName')}
          placeholder="Фамилия..."
        />
        {errors.secondName && <p className={styles.text}>{errors.secondName.message}</p>}
        <input
          className={styles.input}
          type="email"
          {...register('email')}
          placeholder="Email..."
        />

        <input
          className={styles.input}
          type="password"
          {...register('password')}
          placeholder="Пароль..."
        />
        {errors.password && <p className={styles.text}>{errors.password.message}</p>}
        {errors.company && <p className={styles.text}>{errors.company.message}</p>}
        <div className={styles.isCompany}>
          <p className={styles.isCompanyText}>Компания?</p>
          <input className={styles.checkbox} type="checkbox" {...register('company')} />
        </div>

        <button className={styles.button}>Зарегистрироваться</button>
      </form>
    </main>
  );
}
