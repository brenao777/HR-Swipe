import { useUser } from '@/entities/user/hooks/userHook';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React from 'react';
import { Link } from 'react-router';
import styles from './NavBar.module.scss';
import { handleShow } from '@/entities/Vacancy/model/redux/vacancySlice';

export default function NavBar(): React.JSX.Element {
  const status = useAppSelector((store) => store.user.status);
  const user = useAppSelector((store) => store.user.data);
  const { logoutHandler } = useUser();
  const dispatch = useAppDispatch();
  const openModal = useAppSelector((state) => state.vacancies.openModal);

  const logout = async (): Promise<void> => {
    await logoutHandler();
  };

  // const toggleMenu = (): void => setIsOpen((prev) => !prev);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <h1 className={styles.brand}>
          HR-Swipe
        </h1>
        <ul className={`${styles.nav} ${openModal ? styles.navOpen : ''}`}>
          {status === 'logged' && (
            <>
              {user?.company ? (
                <>
                  <li>
                    <Link to="/company" className={styles.navLink}>
                      Компания
                    </Link>
                  </li>
                  <li>
                    <Link to="/hrCabinet" className={styles.navLink}>
                      Личный кабинет
                    </Link>
                  </li>
                  <li>
                    <Link to="/chat" className={styles.navLink}>
                      Чат
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/" className={styles.navLink}>
                      Вакансии
                    </Link>
                  </li>
                  <li>
                    <Link to="/cabinet" className={styles.navLink}>
                      Личный кабинет
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => dispatch(handleShow())} className={styles.logoutBtn}>
                      Фильтр
                    </button>
                  </li>
                </>
              )}
            </>
          )}
          {status === 'guest' && (
            <>
              <li>
                <Link to="/login" className={styles.navLink}>
                  Войти
                </Link>
              </li>
              <li>
                <Link to="/register" className={styles.navLink}>
                  Регистрация
                </Link>
              </li>
            </>
          )}
        </ul>
        {status === 'logged' && (
          <button onClick={logout} className={styles.logoutBtn}>
            Выход
          </button>
        )}
        <button
          className={`${styles.toggle} ${openModal ? styles.toggleOpen : ''}`}
          onClick={() => dispatch(handleShow())}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburger}></span>
        </button>
      </div>
    </nav>
  );
}
