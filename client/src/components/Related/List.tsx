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
};

export const List: FunctionComponent<ListProps> = ({
  currentProduct,
  updateCurrentProduct,
}) => {
  const [relatedIDs, setRelatedIDs] = useState<Array<number>>([]);
  const [related, setRelated] = useState<Array<object>>();
  var getRelatedObjs = (ID: number) => {
    return axios.get(`products/${ID}`);
  };
  useEffect(() => {
    axios.get(`/products/${currentProduct.id}/related`).then((resp) => {
      setRelatedIDs(resp.data);
    });
  }, [currentProduct]);
  useEffect(() => {
    let relatedObjHolder: Array<object> = [];
    relatedIDs.forEach((ID) => {
      getRelatedObjs(ID)
        .then((resp) => {
          relatedObjHolder.push(resp.data);
          console.log(relatedObjHolder);
          return relatedObjHolder;
        })
        .then(() => {
          console.log(relatedObjHolder);
          if (relatedObjHolder.length === relatedIDs.length)
            setRelated(relatedObjHolder);
        });
    });
  }, [relatedIDs]);

  return (
    <div className=" container flex flex-row overflow-scroll space-x-6 ">
      {related
        ? related.map((current) => {
            console.log(current);
            return (
              <>
                <Links
                  currListProduct={current}
                  updatePropInFocus={updateCurrentProduct}
                />
              </>
            );
          })
        : null}
    </div>
  );
};
