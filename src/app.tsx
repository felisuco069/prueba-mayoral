import React from "react";
import { getWearList } from "./api";
import * as json from "../server/data.json";

interface Wear {
  name: string;
  price: number;
  img_url: string;
}

export const App = () => {
  const [wears, setWears] = React.useState<Wear[]>([]);

  React.useEffect(() => {
    getWearList()
      .then((datas: Wear[]) => {
        setWears(datas);
      })
      .catch((err) => {
        "Ha ocurrido un error inesperado";
      });
  }, []);

  return (
    <>
      <img
        src="../server/imgs/jersey-cuello-pico-escolar_id_30-30311-003-M-4"
        alt=""
      />
      <input placeholder="Buscar" />
      {wears.map((wear) => {
        console.log(wear.img_url);
        return (
          <div key={wear.img_url}>
            <span>{wear.name}</span>
            <img src={wear.img_url} alt="Image not found" />
            <span>{wear.price}</span>
          </div>
        );
      })}
    </>
  );
};
