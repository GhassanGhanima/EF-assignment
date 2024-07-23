import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../shared/components/Pagination';

describe('Pagination Component', () => {
  const totalItems = 100;
  const itemsPerPage = 10;
  const onPageChange = jest.fn();

  const renderComponent = (currentPage: number) => {
    render(
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    );
  };



  test('calls onPageChange with correct page number when page is clicked', () => {
    renderComponent(1);
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  test('displays ellipsis when there are more than 5 pages', () => {
    renderComponent(1);
    const ellipsis = screen.getAllByText('...');
    expect(ellipsis.length).toBe(1);
  });

  test('renders correct pages around current page', () => {
    renderComponent(5);
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument();
    expect(screen.getByText('7')).toBeInTheDocument();
  });

  test('handles page change correctly', () => {
    renderComponent(1);
    const pageButton = screen.getByText('2');
    fireEvent.click(pageButton);
    expect(onPageChange).toHaveBeenCalledWith(2);

    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('handles ellipsis click correctly', () => {
    renderComponent(3);
    const ellipsis = screen.getByText('...');
    expect(ellipsis).toBeInTheDocument();
  });

  test('renders correct page number when at the start', () => {
    renderComponent(1);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();

  });

  test('renders correct page number when at the end', () => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    renderComponent(totalPages);
    
    expect(screen.getByText(`${totalPages - 2}`)).toBeInTheDocument();
    expect(screen.getByText(`${totalPages - 1}`)).toBeInTheDocument();
    expect(screen.getByText(`${totalPages}`)).toBeInTheDocument();
  });
});
