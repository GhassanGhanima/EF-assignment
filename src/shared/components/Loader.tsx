// this is the loader components for the all applications

import React from 'react';
import { useSelector } from 'react-redux';
import { UniversityState } from '../interface/universitiesInterFace';

function Loader() {
    const loading = useSelector((state: UniversityState) => state.loading)
    if (!loading) return null
    return (
        <div className='loader-container'>
            <div className="loader"></div>
        </div>
    );
}
export default Loader;