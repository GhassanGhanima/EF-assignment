// // src/tests/universityActions.test.tsx
// import { createStore } from 'redux';
// import { Provider } from 'react-redux';
// import { render, screen, waitFor } from '@testing-library/react';
// import  Axios  from './shared/services/axiosInstance';

// import MockAdapter from 'axios-mock-adapter';
// import '@testing-library/jest-dom';

// import { UniversityState } from './shared/interface/universitiesInterFace';
// import { universityReducer } from './reducer/universitiesReducers';
// import Universities from './pages/universities';
// import { initialUniversityState } from './models/universities';

// // Mock the axios instance
// const mockAxios = new MockAdapter(Axios);



// const renderWithProviders = (ui: React.ReactElement, { reduxState }: { reduxState?: UniversityState } = {}) => {
//   const store = createStore(universityReducer, reduxState || initialUniversityState);
//   return render(<Provider store={store}>{ui}</Provider>);
// };

// describe('University Actions', () => {
//   beforeEach(() => {
//     // Clear all mocks before each test
//     mockAxios.reset();
//     localStorage.clear();
//   });

//   it('fetches and displays universities from API', async () => {
//     const mockData = [{ name: 'Test University' }];

//     // Mock API response
//     mockAxios.onGet('/search').reply(200, mockData);

//     renderWithProviders(<Universities />);

//     await waitFor(() => {
//       expect(screen.getByText('Test University')).toBeInTheDocument();
//     });
//   });

//   it('fetches and displays universities from localStorage when API fails', async () => {
//     const mockData = [{ name: 'Local University' }];

//     // Set localStorage data
//     localStorage.setItem('university_data', JSON.stringify(mockData));

//     // Mock API response to fail
//     mockAxios.onGet('/search').reply(500);

//     renderWithProviders(<Universities />);

//     await waitFor(() => {
//       expect(screen.getByText('Local University')).toBeInTheDocument();
//     });
//   });

//   it('saves fetched universities to localStorage', async () => {
//     const mockData = [{ name: 'Test University' }];

//     // Mock API response
//     mockAxios.onGet('/search').reply(200, mockData);

//     renderWithProviders(<Universities />);

//     await waitFor(() => {
//       expect(localStorage.getItem('university_data')).toEqual(JSON.stringify(mockData));
//     });
//   });

//   it('sets error state when both API and localStorage fail', async () => {
//     // Mock API response to fail
//     mockAxios.onGet('/search').reply(500);

//     renderWithProviders(<Universities />);

//     await waitFor(() => {
//       expect(screen.getByText('Failed to fetch items from Api')).toBeInTheDocument();
//     });
//   });
// });

