import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';  

export function Login() {
  const { user, setUser } = useContext(UserContext);

  const handleLogin = () => {
    setUser({ name: 'Vasanth' });
  };

  return (
    <div>
      {!user ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <p>Logged in as {user.name}</p>
      )}
    </div>
  );
}
