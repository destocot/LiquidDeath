import React, { ReactEventHandler, useState } from "react";
import { ListProps, product } from "./List";
import "./app.css";
import { AxiosResponse } from "axios";
import SetStateAction from "react";
import { OutfitList } from "./OutfitList";
type LinkProps = {
  currListProduct: product;
  updatePropInFocus: ListProps["updateCurrentProduct"];
  changePropInFocus: ListProps["setCurrentProduct"];
  style: object;
  outfitList: Array<object>;
  updateOutfitList: React.Dispatch<React.SetStateAction<Array<object>>>;
  hidden: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

function handleClick(
  e: React.MouseEvent<HTMLDivElement>,
  changePropInFocus: LinkProps["changePropInFocus"],
  updatePropInFocus: LinkProps["changePropInFocus"],
  currListProduct: object,
  hidden: boolean,
  setHidden: React.Dispatch<React.SetStateAction<boolean>>
) {
  e.preventDefault();
  setHidden(true);
  let idVar: string =
    currListProduct.id.toString() + "name" + currListProduct.name.toString();
  let currentProd: Array<string> = idVar.split("name");

  updatePropInFocus(currentProd[0]).then((resp: AxiosResponse) => {
    changePropInFocus(resp.data);
  });
}
export const Links: React.FC<LinkProps> = ({
  currListProduct,
  updatePropInFocus,
  changePropInFocus,
  style,
  outfitList,
  updateOutfitList,
  hidden,
  setHidden,
}) => {
  const [overlayStat, setOverlay] = useState<boolean>(false);
  return (
    <div
      className="container flex-col  max-h-fill min-w-full text-center hover:bg-gradient " // hover:scale-125 left-6
    >
      <div
        className="container flex h-48 w-max-[100vw] relative justify-center "
        onMouseEnter={() => setOverlay(true)}
        onMouseLeave={() => setOverlay(false)}
      >
        {style ? (
          <img src={`${style.url}`} className=" object-cover w-96" ></img>
        ) : null}
        {overlayStat ? (
          <div className=" text-black bg-slate-300 h-48 absolute w-96 bg-opacity-70 space-x-12 ">
            <button
              className="bg-gray-500 rounded-xl relative top-1/2 h-8 w-24 hover:border-2"
              onClick={(e) => {
                handleClick(
                  e,
                  changePropInFocus,
                  updatePropInFocus,
                  currListProduct,
                  hidden,
                  setHidden
                );
              }}
            >
              {" "}
              View
            </button>
            <button
              className="bg-gray-500 rounded-xl relative top-1/2 h-8 w-32 hover:border-2"
              onClick={(e) => {
                let toOutfit = currListProduct;
                toOutfit.style = style.url;
                let outfitHolder = outfitList;
                outfitHolder.push(toOutfit);
                updateOutfitList(outfitHolder);
                outfitHolder = [];
              }}
            >
              Add To Outfit{" "}
            </button>
          </div>
        ) : null}
      </div>
      <div className="font-semibold text-[20px]">${currListProduct.default_price.slice(0, -3)}</div>
    </div>
  );
};
