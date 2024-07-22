import React, { useMemo } from 'react';

// Define the prop types for the Button component
interface ButtonProps {
  text?: string; // Optional text for the button
  title?: string; // Optional text for the button
  icon?: string; // Optional icon class name for the button
  className?: string; // Optional class name for the button
  onClick: () => void; // Click handler for the button
}

const Button: React.FC<ButtonProps> = ({ text, icon, title , className, onClick }) => {
  const memoizedIcon = useMemo(() => {
    return icon ? <span className={icon}></span> : null;
  }, [icon]);

  const memoizedText = useMemo(() => {
    return text ? <span>{text}</span> : null;
  }, [text]);

  return (
    <button className={className} onClick={onClick} title={title}>
      {memoizedIcon}
      {memoizedText}
    </button>
  );
};

export default Button;
