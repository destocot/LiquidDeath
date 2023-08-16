import React, { ReactEventHandler } from "react";
import { ListProps, product } from "./List";
type LinkProps = {
  currListProduct: product;
  updatePropInFocus: ListProps["updateCurrentProduct"];
};
function handleClick(e: React.MouseEvent<HTMLDivElement>) {
  e.preventDefault();
  e.currentTarget.id;
}
export const Links: React.FC<LinkProps> = ({
  currListProduct,
  updatePropInFocus,
}) => (
  <div
    className="container space-x-6 space-y-6 content-center"
    id={currListProduct.id.toString()}
  >
    <em className="whitespace-nowrap snap-center">{currListProduct.name}</em>
    <div>
      <img
        src={
          "https://cdn.vox-cdn.com/thumbor/di8N7rxlSJkVTYZFZdMvmgvGknI=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23067861/LD_duo_alt.jpg"
        }
        className="object-scale-down"
      />
    </div>
    <br />
    <div>{currListProduct.default_price}$</div>
  </div>
);
