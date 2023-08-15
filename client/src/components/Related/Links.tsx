import React from "react";
import { product, data } from "./List";
type LinkProps = {
  product: product;
  data: data;
};
export const Links: React.FC<LinkProps> = ({ product, data }) => (
  <div className="grow content-evenly text-center">
    <em>{product.name}</em>
    <div className="center-self">
      <img
        src={
          "https://cdn.vox-cdn.com/thumbor/di8N7rxlSJkVTYZFZdMvmgvGknI=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23067861/LD_duo_alt.jpg"
        }
        className="object-scale-down w-20 h-20 "
      />
    </div>
    <br />
    <div>{product.default_price}$</div>
  </div>
);
