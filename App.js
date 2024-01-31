import React from "react";
import ReactDOM from "react-dom";
import ProviderRedirect from "./ProviderRedirect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthComponent from './AuthComponent';
import UserContextProvider from './UserContextProvider';


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

ReactDOM.render(<App />, document.getElementById("root"));