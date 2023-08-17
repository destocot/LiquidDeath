import React, { ReactEventHandler } from "react";
import { ListProps, product } from "./List";
import "./app.css";
type LinkProps = {
  currListProduct: product;
  updatePropInFocus: ListProps["updateCurrentProduct"];
  changePropInFocus: ListProps["setCurrentProduct"];
};
function handleClick(
  e: React.MouseEvent<HTMLDivElement>,
  changePropInFocus,
  updatePropInFocus
) {
  e.preventDefault();
  console.log(e.currentTarget.id);
  let currentProd = e.currentTarget.id.split("name");
  console.log(currentProd);
  updatePropInFocus(currentProd[0]).then((resp) => {
    console.log(resp);
    changePropInFocus(resp.data);
  });
}
export const Links: React.FC<LinkProps> = ({
  currListProduct,
  updatePropInFocus,
  changePropInFocus,
}) => (
  <div
    className="container flex-col  max-h-fill min-w-full text-center "
    id={
      currListProduct.id.toString() + "name" + currListProduct.name.toString()
    }
    onClick={(e) => {
      handleClick(e, changePropInFocus, updatePropInFocus);
    }}
  >
    <em className="whitespace-nowrap">{currListProduct.name}</em>
    <div>
      <img
        src={
          "https://cdn.vox-cdn.com/thumbor/di8N7rxlSJkVTYZFZdMvmgvGknI=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23067861/LD_duo_alt.jpg"
        }
        className="object-scale-down h-48 w-96 left-0"
      />
    </div>
    <br />
    <div>{currListProduct.default_price}$</div>
  </div>
);
