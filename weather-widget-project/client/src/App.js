import React from 'react';
import './App.css';
import MeteorologyData from "./components/meteorologyData.js";

function App() {
  const [error, setError] = React.useState(false);

  const handleError = (error) => {
    setError(error);
  };

  return (
    <div>
        <h1 className='App-h1'>Today's Weather in Portugal</h1>
        {error && <h2 className='App-h2'>An unexpected error occurred. Please try again later.</h2>}

        {/* Grid with the weather widgets*/}
        <div className='App-rows'>
          <div className='App-column App-image App-image-lisbon'><MeteorologyData city="lisbon" handleError={handleError}/></div>
          <div className='App-column App-image App-image-leiria'><MeteorologyData city="leiria" handleError={handleError}/></div>
          <div className='App-column App-image App-image-coimbra'><MeteorologyData city="coimbra" handleError={handleError}/></div>
        </div>
        <div className='App-rows'>
          <div className='App-column App-image App-image-porto'><MeteorologyData city="porto" handleError={handleError}/></div>
          <div className='App-column App-image App-image-faro'><MeteorologyData city="faro" handleError={handleError}/></div></div>
    </div>
  );
}

export default App;
