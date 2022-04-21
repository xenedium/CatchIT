import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface IUser {
  id: number;
  name: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<IUser[]>([]);
  useEffect(() => {
    fetch('/api/users/?format=json')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {users.map(user => (
          <div key={user.id}>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        ))}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
