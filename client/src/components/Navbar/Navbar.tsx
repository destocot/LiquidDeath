import React, { Dispatch, SetStateAction, useState } from 'react'

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
      setHeaderColors("gold");
    } else {
      setColorMode('Dark Mode')
      setColorStyle("bg-[rgb(250,249,248)] bg-[url('https://www.transparenttextures.com/patterns/60-lines.png')] text-[#333333]");
      setHeaderColors("black");
    }
  }

  // English, Spanish, Japanese, French, Korean, Urdu, Chinese, Arabic, Italian
  const choices = ['Liquid Death', 'muerte liquida', '液体の死', 'Mort liquide', '액체 죽음', 'مائع موت', '液体死亡', 'الموت السائل', 'Morte liquida'];
  const title = choices[Math.floor(Math.random() * choices.length)];
  const [headerColors, setHeaderColors] = useState("black");

  return (
    <div className={` border-b grid grid-cols-[repeat(6,1fr)] grid-rows-[repeat(2,1fr)] gap-x-0 gap-y-0  px-[28px] py-[12px] text-[${headerColors}] h-fit  ]`}>
      <div className="row-start-1 row-end-3 col-start-1 col-end-3">
        <h1 className="text-[36px] self-end py-1 px-2" >{title}<i className="fa-solid fa-skull hover:animate-[fa-spin_2s_infinite_linear] ml-[10px] line-through" /></h1>
      </div>
      <div className="row-start-2 row-end-3 col-start-3 col-end-5">
        <div className="flex-1 flex justify-center">
          <span className="mr-[16px]">Home</span>
          <span className="mr-[16px]">Sale</span>
          <span className="mr-[16px]">About</span>
          <button className="hover:underline" onClick={() => changeColor()}>{colorMode}</button>
        </div>
      </div>
      <div className="row-start-1 row-end-2 col-start-5 col-end-7 justify-self-end">
        <div className="flex-1 flex justify-center mr-auto">
          <span className="cursor:pointer hover:underline">Customer Sevice</span>
          <span className="ml-[16px]">Students get 20% off</span>
          <span className="ml-[16px]">Find a store</span>
        </div>
      </div>
      <div className="row-start-2 row-end-3 col-start-6 col-end-7">
        <div className="flex-1 flex justify-center ml-auto items-center" >
          <input className="border-2 py-1 px-2 rounded-[1.625rem] text-[black]" type="text" value="Search products"></input>
          <i className="fa-regular fa-user fa-lg ml-2" />
          <i className="fa-regular fa-heart  fa-lg ml-2" />
          <i className="fa-solid fa-cart-shopping fa-lg ml-2" />
        </div>
      </div>
    </div>
    // <div className=" bg-[rgba(250,249,248,0.65)] px-[28px] py-[12px] text-[black] h-fit">
    //   <div className="flex items-center">
    //     <div className="flex-1 flex justify-center mr-auto">
    //       <span className="mr-[16px] cursor:pointer hover:underline">Customer Sevice</span>
    //       <span className="mr-[16px]">Students get 20% off</span>
    //       <span className="mr-[16px]">Find a store</span>
    //       <span>. . .</span>
    //     </div>
    //     <h1 className="flex-1 flex justify-center text-[32px] self-end italic bg-[rgba(0,0,0,0.1)] ">{title}<i className="fa-solid fa-skull leading-normal ml-[10px]" /></h1>
    //     <div className="flex-1 flex justify-center ml-auto">
    //       <span className="mr-[12px]"><i className="fa-regular fa-user mr-[5px]" />Sign in</span>
    //       <span className="mr-[12px]"><i className="fa-regular fa-heart  mr-[5px]" />Favorites</span>
    //       <span><i className="fa-solid fa-cart-shopping mr-[5px]" />Shopping bag(0)</span>
    //     </div>
    //   </div>
    //   <div className="flex items-center">
    //     <div className="flex-1 flex justify-center mr-auto"></div>
    //     <div className="flex-1 flex justify-center">
    //       <span className="mr-[16px]">Home</span>
    //       <span className="mr-[16px]">Sale</span>
    //       <span className="mr-[16px]">About</span>
    //       <button className="hover:underline" onClick={() => changeColor()}>{colorMode}</button>
    //     </div>
    //     <div className="flex-1 flex justify-center ml-auto" >
    //       <input className="border-2 p-[2px]" type="text" value="Search products"></input>
    //     </div>
    //   </div>
    // </div >
  )
}

export default Navbar