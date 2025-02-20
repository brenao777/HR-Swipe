import { getResumes } from '@/entities/Resume/model/redux/resumeThunks';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import ResumeList from '@/widgets/resumeList/ResumeList';
import React, { useEffect } from 'react';

export default function HrResponsesPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const resumes = useAppSelector((store) => store.resume.resumes);

  useEffect(() => {
    void dispatch(getResumes());
  }, []);

  return (
    <>
      {resumes.map((resume) => (
        <div key={resume.id}>
          <ResumeList resume={resume} />
        </div>
      ))}
    </>
  );
}

// на отклики можно нажать и откроется HrDetailsModal с описанием резюме соискателя
