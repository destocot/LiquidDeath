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
      {hidden ? (
        <button
          onClick={() => {
            hidden ? setHidden(false) : setHidden(true);
          }}
          className=" outline-4 outline-white outline-double rounded-lg w-36 float-right block fixed right-0 top-96 -rotate-90  text-center h-max "
        >
          Outfit List
        </button>
      ) : (
        <div className="rounded-lg w-36 float-right block fixed right-0 top-96   text-center h-max outline-double outline-white row">
          {" "}
          Outfit
          <div className="">
            {outfitList.map((current) => {
              return (
                <div>
                  <img src={current.style} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
