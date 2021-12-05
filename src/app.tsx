import React from "react";
import { getWearList } from "./api";
import classes from "./styles.scss";

interface Wear {
  id: number;
  name: string;
  price: number;
  img_url: string;
  new_price: number;
  more_colours: string;
}

export const App = () => {
  const [wears, setWears] = React.useState<Wear[]>([]);
  const [inputValue, setInputValue] = React.useState("Buscar");

  React.useEffect(() => {
    getWearList()
      .then((datas: Wear[]) => {
        const filtedArray = datas.filter((data) =>
          data.name.includes(inputValue)
        );
        inputValue === "Buscar" ? setWears(datas) : setWears(filtedArray);
      })
      .catch((err) => {
        "Ha ocurrido un error inesperado";
      });
  }, [inputValue]);

  return (
    <>
      <input
        placeholder={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className={classes.container}>
        {wears.map((wear) => {
          return (
            <div className={classes.card} key={wear.id}>
              <div className={classes.imgWithDes}>
                <img src={wear.img_url} alt="Image not found" />
                <span className={classes.description}>{wear.name}</span>
              </div>
              <div className={classes.priceContainer}>
                <span id="" className={classes.price}>{`${wear.price} €`}</span>
                <span className={classes.newprice}>
                  {wear.new_price !== 0 ? `${wear.new_price} € (20%)` : ""}
                </span>
              </div>
              <a href="">{wear.more_colours}</a>
              <button>AÑADIR</button>
            </div>
          );
        })}
      </div>
    </>
  );
};
