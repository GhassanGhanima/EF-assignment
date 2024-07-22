import React, { useEffect, useState } from 'react';
import Card from '../shared/components/Card';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { University, UniversityState } from '../shared/interface/universitiesInterFace';
import universityImage from './../assets/images/university.png';
import Button from '../shared/components/Button';



const UniversitiesDetails: React.FC = () => {

  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>();
  const items = useSelector((state: UniversityState) => state.items);
  const [currentUniversity, setCurrentUniversity] = useState<University>()


  useEffect(() => {
    const selectUniversity = items.filter((University: University) => { return University.name === id })
    setCurrentUniversity(selectUniversity[0])
    // eslint-disable-next-line
  }, [id]);

  const goBackHandler = () => {
    navigate(`/`);
  }
  return (
    <div className='container'>
      <h1 className='page-title'>university Details</h1>
      <Card className='mb-3 university-card'>
        <div className='card-header'>
          <img src={universityImage} alt="Description of the " />
          <h3 className='university-name'>{currentUniversity?.name}</h3>
        </div>
        <hr />
        <div className="card-details">
          <div className='form-group-details'>
            <label htmlFor="name">Name</label>
            <span id='name'>{currentUniversity?.name || 'null'}</span>
          </div>
          <div className='form-group-details'>
            <label htmlFor="web_pages">Web pages</label>
            <Link to={`${currentUniversity?.web_pages}`} id='web_pages' >{currentUniversity?.web_pages || 'null'}</Link>
          </div>
          <div className='form-group-details'>
            <label htmlFor="state-province">State Province</label>
            <span id='state-province'>{currentUniversity?.state_province || 'null'}</span>
          </div>
          <div className='form-group-details'>
            <label htmlFor="country">country</label>
            <span id='country'>{currentUniversity?.country || 'null'}</span>
          </div>
          <div className='form-group-details'>
            <label htmlFor="alpha_two_cod">Alpha Two Cod</label>
            <span id='alpha_two_cod'>{currentUniversity?.alpha_two_code || 'null'}</span>
          </div>
        </div>
      </Card>
      <div className='flex-end'>
        <Button text='Back' title="Back" className="btn btn-primary" onClick={goBackHandler} />
      </div>
    </div>
  );
};

export default UniversitiesDetails;