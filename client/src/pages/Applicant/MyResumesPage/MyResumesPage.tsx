import { getResumeById } from '@/entities/Resume/model/redux/resumeThunks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import MyResumesList from '@/widgets/MyResumesList/MyResumesList';
import React, { useEffect } from 'react';

export default function MyResumesPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.user.data);
  const resumes = useAppSelector((store) => store.resume.resumesById);
  console.log(resumes, 'MyResumesPage - store.resume.resumes');

  useEffect(() => {
    if (user?.id) {
      void dispatch(getResumeById(user.id));
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1 style={{display: 'flex', justifyContent: 'center'}}>Мои резюме</h1>
      {resumes.map((resume) => (
        <div key={resume.id}>
          <MyResumesList resume={resume} />
        </div>
      ))}
    </div>
  );
}
