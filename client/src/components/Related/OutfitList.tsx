import React, { Dispatch, SetStateAction } from "react";
import { List } from "./List";
import { useState } from "react";
type OutfitProps = {
  outfitList: Array<object>;
  updateOutfitList: Dispatch<SetStateAction<Array<object>>>;
  styles: object;
};
export const OutfitList: React.FC<OutfitProps> = ({
  outfitList,
  updateOutfitList,
}) => {
  const [hidden, setHidden] = useState<boolean>(true);

  const showOutfits = (e) => {
    hidden ? setHidden(false) : setHidden(true);
    e.target.classList.toggle('turn-outfitlist-btn');
  }

  return (
    <div>
      <button id="outfitlist-button"
        onClick={(e) => showOutfits(e)}
        className="z-[1] w-36 float-right block border-2 fixed right-0 top-[10rem] -rotate-90  text-center h-max bg-gray-300"
      >
        Outfit List
      </button>
      {hidden ? null : (
        <div className="w-36 float-right block fixed right-0 top-[8.5rem]   text-center h-max row bg-gray-300 z-[1]">
          <div id="outfitlist-map-container">
            {outfitList.map((current) => {
              return (
                <div className="border">
                  <em>{current.name}</em>
                  <img src={current.style} />
                  <em>${current.default_price.slice(0, -3)}</em>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
