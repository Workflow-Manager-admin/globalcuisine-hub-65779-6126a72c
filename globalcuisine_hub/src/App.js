import React from 'react';
import './App.css';
import MainContainer from './MainContainer';

// PUBLIC_INTERFACE
function App() {
  /** Root application component, prepares the primary container for the GlobalCuisine Hub. */
  return (
    <div className="app">
      <MainContainer />
    </div>
  );
}

export default App;