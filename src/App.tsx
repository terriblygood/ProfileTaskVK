// src/App.tsx
import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const InfiniteScrollList = lazy(() => import('./components/InfiniteScrollList/InfiniteScrollList'));
const NotFound = lazy(() => import('./components/NotFound'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<InfiniteScrollList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
