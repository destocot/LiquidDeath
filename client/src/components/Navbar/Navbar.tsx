import React, { Dispatch, SetStateAction } from 'react'

interface NavbarProps {
  setColorMode: Dispatch<SetStateAction<string>>;
  setColorStyle: Dispatch<SetStateAction<string>>;
  colorMode: string;
}

function Navbar({ setColorMode, setColorStyle, colorMode }: NavbarProps) {

  const changeColor = () => {
    if (colorMode === 'Dark Mode') {
      setColorMode('Light Mode')
      setColorStyle("bg-[#121212] bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] text-[gold]");
    } else {
      setColorMode('Dark Mode')
      setColorStyle("bg-[#ffffff] bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] text-[#333333]");
    }
  }

  const choices = ['Liquid Death', 'muerte liquida', '液体の死', 'Mort liquide', '액체 죽음', 'مائع موت', '液体死亡', 'الموت السائل'];
  const title = choices[Math.floor(Math.random() * choices.length)];

  return (
    <div className="h-[10vh] bg-[rgba(250,249,248,0.65)] px-[28px] py-[12px] text-[black]">
      <div className="flex items-center">
        <div className="flex-1 flex justify-center mr-auto">
          <span className="mr-[16px]">Customer Sevice</span>
          <span className="mr-[16px]">Students get 20% off</span>
          <span className="mr-[16px]">Find a store</span>
          <span>. . .</span>
        </div>
        <h1 className="flex-1 flex justify-center text-[32px] self-end">{title}</h1>
        <div className="flex-1 flex justify-center ml-auto">
          <span className="mr-[12px]"><i className="fa-regular fa-user mr-[5px]" />Sign in</span>
          <span className="mr-[12px]"><i className="fa-regular fa-heart  mr-[5px]" />Favorites</span>
          <span><i className="fa-solid fa-cart-shopping mr-[5px]" />Shopping bag(0)</span>
        </div>
      </div>
      <div className="flex items-center">
        <div className="flex-1 flex justify-center mr-auto"></div>
        <div className="flex-1 flex justify-center">
          <span className="mr-[16px]">Home</span>
          <span className="mr-[16px]">Sale</span>
          <span className="mr-[16px]">About</span>
          <button className="hover:underline" onClick={() => changeColor()}>{colorMode}</button>
        </div>
        <div className="flex-1 flex justify-center ml-auto" >
          <input className="border-2 p-[2px]" type="text" value="Search products"></input>
        </div>
      </div>
    </div >
  )
}

export default Navbar