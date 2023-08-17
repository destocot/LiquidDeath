import React, {
  FunctionComponent,
  HTMLFactory,
  SetStateAction,
  useEffect,
} from "react";

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
  setCurrentProduct: React.Dispatch<React.SetStateAction<ProdBase>>;
};

export const List: FunctionComponent<ListProps> = ({
  currentProduct,
  updateCurrentProduct,
  setCurrentProduct,
}) => {
  const [relatedIDs, setRelatedIDs] = useState<Array<number>>([]);
  const [related, setRelated] = useState<Array<object>>();
  const [relatedStyles, setRelatedStyles] = useState<Array<object>>([]);
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
    let styleHolder: Array<object> = [];
    relatedIDs.forEach((ID) => {
      getRelatedObjs(ID)
        .then((resp) => {
          relatedObjHolder.push(resp.data);
          return relatedObjHolder;
        })
        .then(() => {
          if (relatedObjHolder.length === relatedIDs.length)
            setRelated(relatedObjHolder);
        })
        .then(() => {
          axios
            .get(`/products/${ID}/styles`)
            .then((resp) => {
              styleHolder.push(resp.data.results[0].photos[0]);

              return styleHolder;
            })
            .then(() => {
              if (styleHolder.length === relatedIDs.length)
                setRelatedStyles(styleHolder);
            });
        });
    });
  }, [relatedIDs]);

  return (
    <div className=" container-xl flex flex-row overflow-auto max-w-full min-w-screen space-x-24 ">
      {related
        ? related.map((current, index) => {
            return (
              <div className="min-w-max">
                <Links
                  currListProduct={current}
                  updatePropInFocus={updateCurrentProduct}
                  changePropInFocus={setCurrentProduct}
                  style={relatedStyles[index]}
                />
              </div>
            );
          })
        : null}
    </div>
  );
};
