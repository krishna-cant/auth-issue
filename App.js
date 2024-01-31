import React from "react";
import ProviderRedirect from "./ProviderRedirect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthComponent from './AuthComponent';
import UserContextProvider from './UserContextProvider';
import { createRoot } from 'react-dom/client';


function App() {
  return (
    <Router>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<AuthComponent />} />
          <Route path="/auth/provider" element={<ProviderRedirect />} />
        </Routes>
      </UserContextProvider>
    </Router>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(<App />);