import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from '../shared/components/Table';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { universityReducer } from '../reducer/universitiesReducers';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock Redux store
const rootReducer = combineReducers({
  university: universityReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});


const mockData = [
  { name: 'University A', web_pages: ['www.universitya.com'], state_province: 'State A', country: 'Country A', alpha_two_code: 'US' },
  { name: 'University B', web_pages: ['www.universityb.com'], state_province: 'State B', country: 'Country B', alpha_two_code: 'GB' },
];

const columns = ['name', 'web_pages', 'state_province', 'country', 'alpha_two_code'];
const actions = [
  {
    name: 'View',
    title: 'View',
    style: 'btn btn-outline-primary btn-sm',
    icon: 'main-icon-eye',
    actionHandler: jest.fn(),
  },
  {
    name: 'Delete',
    title: 'Delete',
    style: 'btn btn-danger btn-sm',
    icon: 'main-icon-bin',
    actionHandler: jest.fn(),
  },
];

describe('Table Component', () => {
  
  test('renders table with data and actions', () => {
     render(
      <Provider store={store}>
        <Router>
          <Table
            data={mockData}
            columns={columns}
            currentPage={1}
            itemsPerPage={10}
            actions={actions}
          />
        </Router>
      </Provider>
    );



    // Check if data rows render
    mockData.forEach((item) => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
      expect(screen.getByText(item.web_pages[0])).toBeInTheDocument();
      expect(screen.getByText(item.state_province)).toBeInTheDocument();
      expect(screen.getByText(item.country)).toBeInTheDocument();
      expect(screen.getByText(item.alpha_two_code)).toBeInTheDocument();
    });


  });

  test('handles sort functionality', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Table
            data={mockData}
            columns={columns}
            currentPage={1}
            itemsPerPage={10}
            actions={actions}
          />
        </Router>
      </Provider>
    );

    // Use a function matcher to find the header
    const firstColumn = screen.getByText((content, element) =>
      content.startsWith('name')
    );

    fireEvent.click(firstColumn);

    // Check if dispatch was called
    const sortState = store.getState().university.sortColumn;
    expect(sortState).toEqual({
      sortColumn: 'name',
      sortDirection: 'asc',
    });
  });


  test('applies row animations', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <Table
            data={mockData}
            columns={columns}
            currentPage={1}
            itemsPerPage={10}
            actions={actions}
          />
        </Router>
      </Provider>
    );

  // Get only the rows from the <tbody> element
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const rows = container.querySelectorAll('tbody tr');
  expect(rows).toHaveLength(mockData.length);

  // Test animation classes (assuming 'fade-in' class is applied)
  rows.forEach((row) => {
    expect(row).toHaveClass('fade-in');
  });
  });

  test('triggers action handlers on button clicks', () => {
    render(
      <Provider store={store}>
        <Router>
          <Table
            data={mockData}
            columns={columns}
            currentPage={1}
            itemsPerPage={10}
            actions={actions}
          />
        </Router>
      </Provider>
    );

  // Find all buttons with the title 'View'
  const viewButtons = screen.getAllByTitle('View');
  // Assuming you want to click the first 'View' button
  fireEvent.click(viewButtons[0]);

  // Similarly handle delete button
  const deleteButtons = screen.getAllByTitle('Delete');
  fireEvent.click(deleteButtons[0]);
  });
});
