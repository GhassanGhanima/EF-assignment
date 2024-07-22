import React, { useCallback, useMemo } from 'react';
import Button from './Button';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange, currentPage }) => {
  const totalPages = useMemo(() => Math.ceil(totalItems / itemsPerPage), [totalItems, itemsPerPage]);

  const handleClick = useCallback((pageNumber: number) => {
    onPageChange(pageNumber);
  },[onPageChange]);

  const renderPageNumbers = useMemo(() => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <li key={1}>
          <Button text='1' title='1' onClick={() => handleClick(1)} />
        </li>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <li key="ellipsis1" title='...' className="Pagination-ellipsis">
            <span>...</span>
          </li>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={currentPage === i ? 'active' : ''}>
          <Button text={`${i}`} title={`${i}`} onClick={() => handleClick(i)} />
        </li>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <li key="ellipsis2" title='...'  className="Pagination-ellipsis">
            <span>...</span>
          </li>
        );
      }
      pageNumbers.push(
        <li key={totalPages}>
          <Button text={`${totalPages}`} onClick={() => handleClick(totalPages)} />
        </li>
      );
    }

    return pageNumbers;
  }, [currentPage, handleClick, totalPages]);

  return (
    <nav>
      <ul id="pagination">
        {renderPageNumbers}
      </ul>
    </nav>
  );
};

export default Pagination;
