import { useState } from 'react'
import './App.css'
import "./assets/fonts/fonts.css";
import LeftPart from './components/leftPart';
import RightPart from './components/RightPart';

function App() {


  return (
    <>
      <div className="flex flex-col lg:flex-row h-auto lg:h-screen">
        <LeftPart className="flex-grow" />
        <RightPart className="flex-grow" />
      </div>
    </>
  );
}

export default App


