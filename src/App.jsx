import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((err) => console.error('Error:', err));
  }, []);

  return (
    <div className=" mx-auto">
      <Navbar />
      <h1>List Data</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>
            {item.name} - {item.time} menit
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
