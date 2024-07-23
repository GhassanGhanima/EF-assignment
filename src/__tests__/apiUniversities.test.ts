// src/__tests__/apiUniversities.test.ts
import { getUniversities } from '../shared/services/apiService/apiUniversities';
import { ThunkDispatch } from 'redux-thunk';
import { universityActionTypes, setLoading, setItems, setError } from '../store/universitiesStore/actions'; // Adjust path as needed
import * as apiService from '../shared/services/apiService/apiUniversities'; // Adjust path as needed

type AppDispatch = ThunkDispatch<any, undefined, universityActionTypes>;

// Create a mock store and mock dispatch
const dispatch: jest.MockedFunction<AppDispatch> = jest.fn() as any;

const mockData = [
  { name: 'University A', web_pages: ['www.universitya.com'], state_province: 'State A', country: 'Country A', alpha_two_code: 'US' },
  // Add more mock data as needed
];

beforeEach(() => {
  jest.clearAllMocks();
});

test('fetches and stores universities successfully', async () => {
  // Mock fetchItems to return mockData
  jest.spyOn(apiService, 'fetchItems').mockResolvedValue(mockData as any);

  await getUniversities()(dispatch);

  // Check if dispatch was called with the expected actions
  expect(dispatch).toHaveBeenCalledWith(setLoading(true));
  expect(dispatch).toHaveBeenCalledWith(setItems(mockData));
  expect(dispatch).toHaveBeenCalledWith(setLoading(false));
});

test('handles error and fallback to localStorage', async () => {
  // Mock fetchItems to throw an error
  jest.spyOn(apiService, 'fetchItems').mockRejectedValue(new Error('Failed to fetch'));

  // Set localStorage item
  localStorage.setItem('university_data', JSON.stringify(mockData));

  await getUniversities()(dispatch);

  // Check if dispatch was called with the expected actions
  expect(dispatch).toHaveBeenCalledWith(setLoading(true));
  expect(dispatch).toHaveBeenCalledWith(setItems(mockData));
  expect(dispatch).toHaveBeenCalledWith(setError('Failed to fetch items from Api'));
  expect(dispatch).toHaveBeenCalledWith(setLoading(false));

});
