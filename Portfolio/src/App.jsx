import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import MainContent from './components/MainContent';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true); 
      setTimeout(() => {
        setIsLoading(false); 
      }, 1000); 
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen overflow-x-hidden overflow-y-auto bg-gray-950">
      {isLoading ? <Loading fadeOut={fadeOut} /> : <MainContent />}
      {/* <MainContent /> */}
    </div>
  );
};

export default App;
