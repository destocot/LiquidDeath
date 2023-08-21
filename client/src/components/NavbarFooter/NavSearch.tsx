import React, { useState } from 'react'
import list from './productList';

function NavSearch({ changeSearch }) {
  const =[searchProducts, setSearchProducts] = useState([]);

  const navSearch = (e) => {
    if (e.target.value.length > 2) {
      setSearchProducts(list.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase())))
    } else {
      setSearchProducts([]);
    }
  }

  return (
    <div>
      <input id="nav-search-bar" className="border-2 py-1 px-2 rounded-[1.625rem] text-[black]" type="text" placeholder="Search products" onChange={(e) => navSearch(e)}></input>
      {
        !!searchProducts.length && <div className="bg-[black]/[0.8] z-[10] absolute flex flex-col px-[calc(1.3vw_+_0.5rem)] mt-[0.25vh]">
          {
            searchProducts.map((searchProduct) => (<span className="searchProd text-white hover:text-[#007185]" onClick={() => {
              changeSearch(searchProduct.id);
              setSearchProducts([]);
            }
            }

              key={searchProduct.id}>{searchProduct.name}</span>))
          }
        </div>
      }
    </div>
  )
}

export default NavSearch