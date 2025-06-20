import React from 'react';
import './App.css';
import MainContainer from './MainContainer';
import { AppProvider } from './context/AppContext';

// PUBLIC_INTERFACE
function App() {
  /** Root application component, provides global state via AppProvider. */
  return (
    <AppProvider>
      <div className="app">
        <MainContainer />
      </div>
    </AppProvider>
  );
}

export default App;