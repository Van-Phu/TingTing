import React, { useState } from 'react';

const UserContext = React.createContext({
  username: 'unknown',
  setUsername: () => {},
  refreshCount: 0,
  increaseRefreshCount: () => {},
});

export function UserProvider({ children }) {
  const [username, setUsername] = useState('unknown');
  const [refreshCount, setRefreshCount] = useState(0);

  const increaseRefreshCount = () => {
    setRefreshCount(refreshCount + 1);
  };

  return (
    <UserContext.Provider value={{ username, setUsername, refreshCount, increaseRefreshCount }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
