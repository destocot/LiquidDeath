import React, { useState } from 'react'
import list from './productList';

function NavSearch({ changeSearch }) {
  const [searchProducts, setSearchProducts] = useState([]);

  const navSearch = (e) => {
    if (e.target.value.length > 0) {
      setSearchProducts(list.filter(item => item.name.toLowerCase().startsWith(e.target.value.toLowerCase())).slice(0, 11))
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

              key={searchProduct.id}><b>{searchProduct.name.slice(0, 1)}</b>{searchProduct.name.slice(1)}</span>))
          }
        </div>
      }
    </div>
  )
}

export default NavSearch