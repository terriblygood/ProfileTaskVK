import React, { useState, useEffect } from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const handleError = (error: Error) => {
    setHasError(true);
    setErrorMessage(error.message);
  };

  
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      handleError(new Error(event.message));
    };

    window.addEventListener('error', errorHandler);
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  
  if (hasError) {
    return <h1>Что-то пошло не так: {errorMessage}</h1>;
  }

  return <>{children}</>;
};

export default ErrorBoundary;
