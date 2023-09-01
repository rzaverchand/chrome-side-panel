import React from 'react';
import './App.css';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src="/logo.png" alt="Logo" className="logo-img"/>
      </header> */}
      <img src="/logo.png" alt="Logo" className="logo-img"/>
      <ChatWindow />
    </div>
  );
}

export default App;