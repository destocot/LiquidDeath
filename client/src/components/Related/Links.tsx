import React, { ReactEventHandler } from "react";
import { ListProps, product } from "./List";
import "./app.css";
import { AxiosResponse } from "axios";
type LinkProps = {
  currListProduct: product;
  updatePropInFocus: ListProps["updateCurrentProduct"];
  changePropInFocus: ListProps["setCurrentProduct"];
  style: object;
};

function handleClick(
  e: React.MouseEvent<HTMLDivElement>,
  changePropInFocus: LinkProps["changePropInFocus"],
  updatePropInFocus: LinkProps["changePropInFocus"]
) {
  e.preventDefault();
  console.log(e.currentTarget.id);
  let currentProd: Array<string> = e.currentTarget.id.split("name");
  console.log(currentProd);
  updatePropInFocus(currentProd[0]).then((resp: AxiosResponse) => {
    console.log(resp);
    changePropInFocus(resp.data);
  });
}
export const Links: React.FC<LinkProps> = ({
  currListProduct,
  updatePropInFocus,
  changePropInFocus,
  style,
}) => (
  <div
    className="container flex-col  max-h-fill min-w-full text-center hover:bg-gradient hover:scale-125"
    id={
      currListProduct.id.toString() + "name" + currListProduct.name.toString()
    }
    onClick={(e) => {
      handleClick(e, changePropInFocus, updatePropInFocus);
    }}
  >
    <em className="whitespace-nowrap">{currListProduct.name}</em>
    <div>
      {style ? (
        <img src={`${style.url}`} className=" object-fit h-48 w-96 left-0" />
      ) : null}
    </div>
    <br />
    <div>{currListProduct.default_price}$</div>
  </div>
);
