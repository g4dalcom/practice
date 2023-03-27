import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [arr, setArr] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
  ]);

  const clickHandle = () => {
    setArr((arr) => arr.slice().sort(() => Math.random() - 0.5));
  };

  return (
    <>
      <div className='grid w-[400px] mx-auto py-4 grid-cols-4 gap-4'>
        {arr.map((item) => (
          <div className='bg-gray-700 w-full aspect-square flex items-center justify-center rounded'>
            {item}
          </div>
        ))}
      </div>
      <button
        onClick={clickHandle}
        className='h-10 flex items-center justify-center text-sm bg-blue-600 text=white w-[400px] mx-auto rounded'
      >
        Random!
      </button>
    </>
  );
}

export default App;
