import React, {
  FunctionComponent,
  HTMLFactory,
  SetStateAction,
  useEffect,
} from "react";
import initial from "../PlaceHolderData.js";
import { useState } from "react";
import { Links } from "./Links";
import axios, { Axios, AxiosResponse } from "axios";
import "./app.css";
type ProdBase = {
  id: number;
  name: string;
};
export type product = {
  id: number;
  name: string;
  slogan: string;
  description: string;
  category: string;
  default_price: string;
  created_at?: string;
  updated_at?: string;
  features?: Array<{ feature: string; value: string }>;
};
export type ListProps = {
  currentProduct: {
    id: number;
    name: string;
  };
  updateCurrentProduct: React.Dispatch<React.SetStateAction<ProdBase>>;
  hide: boolean;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

export const List: FunctionComponent<ListProps> = ({
  currentProduct,
  updateCurrentProduct,
  hide,
  setHidden,
}) => {
  const [related, setRelated] = useState<Array<product>>([]);
  const updRelated = async () => {};
  useEffect(async () => {}, [currentProduct]);

  return hide ? null : (
    <div className=" flex flex-row overflow-scroll ">
      {related.map((current) => {
        return (
          <Links
            currListProduct={current}
            updatePropInFocus={updateCurrentProduct}
          />
        );
      })}
    </div>
  );
};
