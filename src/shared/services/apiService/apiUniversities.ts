import { Dispatch } from 'react';
import { setError, setItems, setLoading, universityActionTypes } from '../../../store/universitiesStore/actions';
import { University } from '../../interface/universitiesInterFace';
import Axios from './../axiosInstance';
import axios from 'axios';
import * as localStorage from './../localStorage'
import { Country } from '../../interface/country';

export const fetchItems = async (): Promise<University[]> => {
  const response = await Axios.get<University[]>('/search', {});
  return response.data;
};


export const getUniversities = () => async (
  dispatch: Dispatch<universityActionTypes>
) => {
  dispatch(setLoading(true));
  let items: any = [];
  try {
    items = await fetchItems();
    localStorage.setItem('university_data', items)
    dispatch(setItems(items));
    dispatch(setLoading(false));
  } catch (error) {
    let localStorageDate: any = localStorage.getItem('university_data')
    if (localStorageDate && localStorageDate.length > 0) {
      items = localStorageDate
    } else {
      dispatch(setError('Failed to fetch items from Local Storage'));
    }
    dispatch(setItems(items));
    dispatch(setError('Failed to fetch items from Api'));
    dispatch(setLoading(false));
  }
};

// export const fetchCountries = async (): Promise<Country[]> => {
//   try {
//     const response = await fetch('/json/countries.json'); 
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data: Country[] = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching countries:', error);
//     throw error;
//   }
// };
export const fetchCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get('/json/countries.json'); 
    return response.data;
  } catch (error:any) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching countries:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};