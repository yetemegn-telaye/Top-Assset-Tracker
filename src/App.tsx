import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './constants/routes';
import ProtectedRoute from './constants/ProtectedRoute'; 

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Element = route.protected ? (
            <ProtectedRoute element={<route.component />} />
          ) : (
            <route.component />
          );

          return (
            <Route
              key={index}
              path={route.path}
              element={Element}
            />
          );
        })}
      </Routes>
    </Router>
  );
};

export default App;
