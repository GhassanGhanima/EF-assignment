import React from 'react';
import '@testing-library/jest-dom';
import App from './App';
import { Provider } from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { universityReducer } from './reducer/universitiesReducers';
import { createRoot } from 'react-dom/client';

const rootReducer = combineReducers({
  university: universityReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

describe('App Component', () => {
  test('renders Universities', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<Provider store={store}><App /></Provider>);
    root.unmount();
    document.body.removeChild(container);
  });
});
