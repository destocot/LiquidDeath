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
  return (
    <div>
      <button
        onClick={() => {
          hidden ? setHidden(false) : setHidden(true);
        }}
        className=" outline-4 outline-black outline-double rounded-lg w-36 float-right block fixed right-0 top-96 -rotate-90  text-center h-max "
      >
        Outfit List
      </button>
      {hidden ? null : (
        <div className="rounded-lg w-36 float-right block fixed right-0 top-96   text-center h-max outline-double outline-black row bg-gray-300">
          <div className="font-bold border-black border-b-8">
            {" "}
            {outfitList.map((current) => {
              return (
                <div>
                  <em>{current.name}</em>
                  <img src={current.style} />
                  <em>{current.default_price}$</em>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
