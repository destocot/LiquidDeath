import React from 'react'

function Navbar({ setColorMode, setColorStyle, colorMode }) {

  const changeColor = () => {
    if (colorMode === 'Dark Mode') {
      setColorMode('Light Mode')
      setColorStyle("bg-[#1a1c20] bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] text-white");
    } else {
      setColorMode('Dark Mode')
      setColorStyle("bg-[#f0f4f8] bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] text-[#333333]");
    }
  }


  return (
    <div
      className="h-[4vh] w-[100vw] bg-[#263238] flex justify-around items-center border-b-white border-b border-solid text-white">
      <h1>Liquid Death Inc</h1>
      <button onClick={() => changeColor()}>{colorMode}</button>
      <input className="h-[3vh] border" type="text" value="Search disabled" disabled></input>
    </div>
  )
}

export default Navbar