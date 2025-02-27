import { addCompany } from '@/entities/Company/model/redux/companyThanks';
import { useAppDispatch } from '@/shared/api/hooks/hooks';
import React from 'react';
import { useNavigate } from 'react-router';

export default function HrAddCompanyPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleAddCompany = async (el: React.FormEvent<HTMLFormElement>): Promise<void> => {
    el.preventDefault();
    try {
      const formData = new FormData(el.currentTarget);
      if (!formData.get('title') || !formData.get('description') || !formData.get('location')) {
        throw new Error('All fields are required');
      }
      void dispatch(addCompany(formData));
      void navigate('/hrCabinet');
    } catch (error) {
      console.error('Ошибка при создании компании', error);
    }
  };

  return (
    <div>
      <h1>Add Company</h1>
      <form onSubmit={handleAddCompany}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input type="text" id="title" name="title" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="logo" className="form-label">
            Logo URL
          </label>
          <input type="file" id="logo" name="logo" className="form-control" required />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input type="text" id="location" name="location" className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Company
        </button>
      </form>
    </div>
  );
}
