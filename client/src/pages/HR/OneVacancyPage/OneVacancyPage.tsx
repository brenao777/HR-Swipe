import { findVacancyById } from '@/entities/Vacancy/model/redux/vacancyThunk';
import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import ResumeCarousel from './ResumeCarousel/ResumeCarousel';

export default function OneVacancyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { vacancyId } = useParams();
  const { resumesById, loading, error } = useAppSelector((state) => state.resume);

  console.log('Резюме:', resumesById);

  useEffect(() => {
    if (vacancyId) {
      void dispatch(findVacancyById(Number(vacancyId)));
    }
  }, [dispatch, vacancyId]);

  if (loading) {
    return <div>Загрузка резюме...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div>
      <h1>Резюме для вакансии #{vacancyId}</h1>
      <ResumeCarousel />
    </div>
  );
}

// import { findVacancyById } from '@/entities/Vacancy/model/redux/vacancyThunk';
// import { useAppDispatch, useAppSelector } from '@/shared/api/hooks/hooks';
// import React, { useEffect } from 'react';
// import { useParams } from 'react-router';

// export default function OneVacancyPage(): React.JSX.Element {
//   const dispatch = useAppDispatch();
//   const vacancyId = useParams();
//   const resumes = useAppSelector((store) => store.resume.resumesById);

//   console.log(resumes);
//   useEffect(() => {
//     void dispatch(findVacancyById(Number(vacancyId.vacancyId)));
//   }, []);

//   return (
//     <div>
//       {resumes.map((resume) => (
//         <div key={resume.id}>
//           <p>
//             {resume.User.firstName} {resume.User.secondName}
//           </p>
//           <p>{resume.experience}</p>
//           <p>{resume.age}</p>
//           <p>{resume.number}</p>
//         </div>
//       ))}
//     </div>
//   );
// }
