import { getResumeById } from '@/entities/Resume/model/redux/resumeThunks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import MyResumesList from '@/widgets/MyResumesList/MyResumesList';
import React, { useEffect } from 'react';
import styles from './MyResumesPage.module.scss';

export default function MyResumesPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.data);
  const resumes = useAppSelector((store) => store.resume.resumesById);

  useEffect(() => {
    if (user?.id) {
      void dispatch(getResumeById(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1 className={styles.title}>Мои резюме</h1>
      <div className={styles.container}>
        {resumes.map((resume) => (
          <div key={resume.id} className={styles.resumeItem}>
            <MyResumesList resume={resume} />
          </div>
        ))}
      </div>
    </div>
  );
}
