import React, { useState } from 'react';
import FacialExpression from './components/FacialExpression';
import MoodSong from './components/MoodSong';

const App = () => {
  const [Songs, setSongs] = useState([]);

  return (
    <div>
      <FacialExpression setSongs={setSongs} />
      {Songs.length > 0 && <MoodSong Songs={Songs} />}
    </div>
  );
};

export default App;
