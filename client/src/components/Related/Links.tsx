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

  let currentProd: Array<string> = e.currentTarget.id.split("name");

  updatePropInFocus(currentProd[0]).then((resp: AxiosResponse) => {
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
    className="container flex-col  max-h-fill min-w-full text-center hover:bg-gradient hover:scale-125 left-6"
    id={
      currListProduct.id.toString() + "name" + currListProduct.name.toString()
    }
    onClick={(e) => {
      handleClick(e, changePropInFocus, updatePropInFocus);
    }}
  >
    <div>
      {style ? (
        <img src={`${style.url}`} className=" object-fit h-48 w-96 left-0" />
      ) : null}
    </div>
    <br />
    <div className="font-semibold">{currListProduct.default_price}$</div>
  </div>
);
