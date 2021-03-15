import React from "react";
import classes from "./Burger.module.css";
import { withRouter } from "react-router-dom";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = (props) => {
  // console.log(props);
  let t;
  if (props.ingredients) {
    t = Object.keys(props.ingredients)
      .map((igKey) => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
          return <BurgerIngredient key={igKey + i} type={igKey} />;
        });
      })
      .reduce((arr, el) => {
        return arr.concat(el);
      }, []);
    if (t.length === 0) {
      t = <p>Please start add ingredient</p>;
    }
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {t}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
