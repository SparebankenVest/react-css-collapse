import React, { useState } from 'react';
import Collapse from '../components/Collapse';

export default function App() {
  const [isOpen, toggle] = useState(true);
  return (
    <>
      <button type="button" onClick={() => toggle(!isOpen)}>
        {isOpen ? 'Close' : 'open'}
      </button>
      <Collapse isOpen={isOpen}>
        <div className="App">
          Inspect me
          <div className="App-under-overflow">This should be visible</div>
        </div>
      </Collapse>
    </>
  );
}
