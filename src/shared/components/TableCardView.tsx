import React from 'react';
import Button from './Button'; // Make sure this imports the correct Button component
import { Link } from 'react-router-dom';

interface TableCardViewProps {
  data: any[];
  columns: string[];
  actions: any;
}

const TableCardView: React.FC<TableCardViewProps> = ({ data, columns, actions }) => {
  return (
    <div className="table-card card-container">
      {data.map((item, index) => (
        <div key={index} className="card">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="card-item">
              <strong>{column}:</strong> {column === 'web_pages' ? <Link to={`${item[column]}`}  >{item[column]}</Link> : item[column]}
            </div>
          ))}
          {actions && (
            <div className="card-actions">
              {actions.map((action: any, actionIndex: number) => (
                <Button 
                  key={actionIndex} 
                  text={action.name}
                  title={action.title}
                  className={action?.style} 
                  icon={action?.icon} 
                  onClick={() => action?.actionHandler(item)} 
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableCardView;
