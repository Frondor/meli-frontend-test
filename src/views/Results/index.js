import React, { Component } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import WaitForIt from "../../components/WaitForIt";
import PriceTag from "../../components/PriceTag";
import iconShipping from "../../assets/img/ic_shipping.png";
import ApiClient from "../../http/client";
import "./results.sass";

const Cache = {
  lastResults: {}
};

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.lastSearch = "";
  }

  search(noCache) {
    const { search } = queryString.parse(this.props.location.search);
    if (!search) return this.props.history.replace("/");
    if (search === this.lastSearch) return; // prevent infinite loops on componentDidUpdate
    this.lastSearch = search;

    // Handle browser back button, prevent it from
    // firing same request again
    if (!noCache && Cache.lastResults[search]) {
      const { categories, items } = Cache.lastResults[search];
      return this.props.setResults(items, categories);
    } else this.props.setResults([]);

    ApiClient.search(search).then(({ data }) => {
      const { categories, items } = (Cache.lastResults[search] = data);

      this.props.setResults(items, categories);
    });
  }

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
            <div className="row m-0 p-0">
              <div className="col">
                <Link to={"/items/" + item.id}>
                  <PriceTag className="pb-lg" {...item.price} small={true}>
                    {item.free_shipping && freeShipping}
                  </PriceTag>
                  <h2 className="text-capitalize m-0">{item.title}</h2>
                </Link>
              </div>

              {item.location && (
                <div className="col-xs-12 col-md-3 pt-3 text-muted">
                  <small className="item-result__right text-capitalize">
                    {item.location}
                  </small>
                </div>
              )}
            </div>
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

  componentDidMount() {
    this.search();
  }

  componentDidUpdate() {
    this.search(true);
  }

  componentWillUnmount() {
    // ApiClient.abort()
  }
}
