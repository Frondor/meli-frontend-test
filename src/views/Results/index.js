import React from "react";
import "./results.sass";
import { item } from "../Item";
import PriceTag from "../../components/PriceTag";
import iconShipping from "../../assets/img/ic_shipping.png";

const freeShipping = (
  <img
    src={iconShipping}
    alt="Free shipping"
    className="item-result__icon-shipping"
  />
);

const results = new Array(4).fill(item).map((item, i) => {
  return (
    <li className="item-result row" key={item.id + i}>
      <div className="item-result__picture col-auto pr-0">
        <a href="/">
          <img className="img-fluid" src={item.picture} alt={item.title} />
        </a>
      </div>
      <div className="item-result__content col">
        <a href="/">
          <PriceTag className="pb-lg" {...item.price} small={true}>
            {item.free_shipping && freeShipping}
          </PriceTag>
          <h2 className="m-0">{item.title}</h2>
        </a>
        {/* La api no pedía esto, pero el spec si */}
        {/* <div className="item-result__right col-3">Mendoza</div> */}
      </div>
    </li>
  );
});

export default function() {
  return (
    <section id="results">
      <ol className="list-unstyled m-0">{results}</ol>
    </section>
  );
}
