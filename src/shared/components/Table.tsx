
// table components render the data in table with actions and sorting 

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import Button from './Button';
import TableCardView from './TableCardView';
import { useResponsive } from '../hooks';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../store/universitiesStore/actions';
import { UniversityState } from '../interface/universitiesInterFace';

interface TableProps {
  data: any[];
  columns: string[];
  currentPage: number;
  itemsPerPage: number;
  actions: any;
}

const Table: React.FC<TableProps> = ({ data, columns, currentPage, itemsPerPage, actions }) => {

  const dispatch = useDispatch();
  const sortDirection  = useSelector((state: UniversityState) => state.sortColumn?.sortDirection );
  const  sortColumn = useSelector((state: UniversityState) => state.sortColumn?.sortColumn );


  const { isMobile } = useResponsive();

  const [cardTableView, setCardTableView] = useState('table');
  const [animatingRows, setAnimatingRows] = useState<string>('')
  const [deletedRows] = useState<number[]>([]);

  // paginate the data 
  const paginatedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const slicedData = data.slice(startIndex, endIndex);
    return slicedData;
  }, [data, currentPage, itemsPerPage]);


  // watch mobile card table view 
  useEffect(() => {
    setCardTableView(isMobile ? 'card' : 'table');
  }, [isMobile]);


  useEffect(() => {
    setAnimatingRows('fade-in');
    const timer = setTimeout(() => setAnimatingRows(''), 500); // Match the timeout with the animation duration
    return () => clearTimeout(timer);
  }, [paginatedData]);



  // sorting the data array 
  const handleSort = useCallback((column: any) => {
    if (sortColumn === column) {
      dispatch(setSort(column, sortDirection === 'asc' ? 'desc' : 'asc'));
    } else {
      dispatch(setSort(column, 'asc'));
    }
  }, [sortColumn, sortDirection, dispatch]);


  // Active table card handler
  const activeCardTableHandler = useCallback((type: string) => {
    return cardTableView === type ? 'btn btn-primary btn-md' : 'btn btn-outline-primary btn-md';
  }, [cardTableView]);

  // Render table header
  const renderTableHeader = useMemo(() => {
    return (
      <tr>
        {columns.map((column) => (
          <th key={column} onClick={() => handleSort(column)}>
            {column}
            {sortDirection === 'asc' && sortColumn === column ? ' ▲' : ' ▼'}
          </th>
        ))}
        {actions && <th>Actions</th>}
      </tr>
    );
  }, [columns, sortColumn, sortDirection, handleSort, actions]);

  // Render table body
  const renderTableBody = useMemo(() => {
    return paginatedData.map((item, index) => (
        <tr key={index} className={`${deletedRows.includes(item.name) ? 'fade-out' : animatingRows}`}>
            {columns.map((column, index) => (
          <td key={index}>
            {column === 'web_pages' ? <Link to={`${item[column]}`} target="_blank">{item[column]}</Link> : item[column]}
          </td>
        ))}
        {actions && (
          <td key="actions">
            <div className="table-actions">
              {actions.map((action: any) => (
                <Button
                  key={action.name}
                  title={action.title}
                  className={action?.style}
                  icon={action?.icon}
                  onClick={() => action?.actionHandler(item)}
                />
              ))}
            </div>
          </td>
        )}
      </tr>
    ));
  }, [paginatedData, columns, actions,animatingRows,deletedRows]);

  // Switch between card and table
  const renderTableCardView = useMemo(() => {
    return (
      <div>
        {cardTableView === 'table' && (
          <table>
            <thead>{renderTableHeader}</thead>
            <tbody>{renderTableBody}</tbody>
          </table>
        )}
        {cardTableView === 'card' && <TableCardView data={paginatedData} columns={columns} actions={actions} />}
      </div>
    );
  }, [cardTableView, renderTableHeader, renderTableBody, paginatedData, columns, actions]);

  return (
    <>
      <div className="table-card-view">
        <h3>Number of records: {data?.length}</h3>
        <div className={`table-card-view-actions ${isMobile ? 'remove-on-mobile' : ''}`}>
          <Button title='table' className={activeCardTableHandler('table')} icon="main-icon-list" onClick={() => setCardTableView('table')} />
          <Button title='card' className={activeCardTableHandler('card')} icon="main-icon-dashboard-patient" onClick={() => setCardTableView('card')} />
        </div>
      </div>
      {renderTableCardView}
    </>
  );
};



export default Table


