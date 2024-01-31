import React, { useState } from 'react';
import UserContext from './UserContext';

function UserContextProvider({ children }) {
  const [session, setSession] = useState(null);

  return (
    <UserContext.Provider value={{ session, setSession }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
