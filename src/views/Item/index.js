import React, { Component } from "react";
import PriceTag from "../../components/PriceTag";
import "./item.sass";

import picture from "../../assets/img/580.png";

export const item = {
  id: String("MLA000000001"),
  title: String("Almohada de agua con dulce de leche y tortas fritas"),
  price: {
    currency: String("$"),
    amount: Number("2123.00"),
    decimals: Number("2")
  },
  picture: String(picture),
  condition: String("new"),
  free_shipping: Boolean("true"),
  sold_quantity: Number("2"),
  description: String(
    "Dos y dos son cuatro, cuatro y dos son seis, seis y dos son ocho, y ocho dieciseis"
  ).repeat(10)
};

const itemStatus = `${item.condition === "new" ? "Nuevo" : "Usado"} - ${
  item.sold_quantity
} vendidos`;

const ItemDescription = ({ className = "", value }) => (
  <section className={(className += " item__description")}>
    <h2 className="pb-lg m-0">Descripción del producto</h2>
    <p className="m-0 pb-sm">{value}</p>
  </section>
);

export default class ItemView extends Component {
  render() {
    return (
      <article className="item row">
        <div className="col-xs-12 col-sm-8 col-md-9 item__left">
          <section className="item__picture">
          {/* filter: blur(5px) grayscale();
      opacity: 0.5; */}
            <img
              className="w-100"
              src={item.picture}
              alt={`Imagen de ${item.title}`}
            />
          </section>

          <ItemDescription
            value={item.description}
            className="d-none d-sm-block"
          />
        </div>
        <div className="col item__right">
          <section>
            <p className="item__condition">
              <small>{itemStatus}</small>
            </p>

            <h1 className="text-capitalize m-0 pb-lg">{item.title}</h1>

            <PriceTag className="pb-lg" {...item.price} />

            <div className="btn-buy">
              <button className="btn btn-block btn-blue">Comprar</button>
            </div>
          </section>

          <ItemDescription
            value={item.description}
            className="d-sm-none mt-5"
          />
        </div>
      </article>
    );
  }
}
