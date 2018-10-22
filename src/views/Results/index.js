import React, { Component } from "react";
import { Link } from "react-router-dom";
import WaitForIt from "../../components/WaitForIt";
import PriceTag from "../../components/PriceTag";
import iconShipping from "../../assets/img/ic_shipping.png";
import "./results.sass";

export default class Results extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const freeShipping = (
      <img
        src={iconShipping}
        alt="Free shipping"
        className="item-result__icon-shipping"
      />
    );

    const results = this.props.results.map((item, i) => {
      return (
        <li className="item-result row" key={item.id + i}>
          <div className="item-result__picture col-auto pr-0">
            <Link to={"/items/" + item.id}>
              <img className="img-fluid" src={item.picture} alt={item.title} />
            </Link>
          </div>
          <div className="item-result__content col">
            <Link to={"/items/" + item.id}>
              <PriceTag className="pb-lg" {...item.price} small={true}>
                {item.free_shipping && freeShipping}
              </PriceTag>
              <h2 className="text-capitalize m-0">{item.title}</h2>
            </Link>
            {/* El spec de la api no pedía esto, pero el del diseño si */}
            {/* <div className="item-result__right col-3">Mendoza</div> */}
          </div>
        </li>
      );
    });

    return (
      <WaitForIt ready={this.props.results.length}>
        <section id="results">
          <ol className="list-unstyled m-0">{results}</ol>
        </section>
      </WaitForIt>
    );
  }
}
