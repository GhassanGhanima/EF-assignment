import React, { useMemo } from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  [x: string]: any; // This allows additional props such as onClick, id, etc.
}

const Card: React.FC<CardProps> = ({ children, className = '', style, ...rest }) => {
  const memoizedClassName = useMemo(() => `card ${className}`, [className]);
  const memoizedChildren = useMemo(() => children, [children]);

  return (
    <div className={memoizedClassName} style={style} {...rest}>
      <div className="card-body">
        {memoizedChildren}
      </div>
    </div>
  );
}

export default Card;
