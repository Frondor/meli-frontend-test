import React, { Component } from "react";
import Helmet from "react-helmet";
import PriceTag from "../../components/PriceTag";
import ApiClient from "../../http/client";
import "./item.sass";
import WaitForIt from "../../components/WaitForIt";

const ItemDescription = ({ value }) => (
  <WaitForIt ready={value}>
    <h2 className="pb-lg m-0">Descripción del producto</h2>
    <p className="m-0 pb-sm">{value}</p>
  </WaitForIt>
);

export default class ItemView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      item: props.item
    };
  }

  fetchItem(id, catId) {
    // Fetch item and category path from root
    const promises = [ApiClient.getItem(id)];
    if (catId) promises.push(ApiClient.getCategoryPath(catId));

    Promise.all(promises)
      .then(([itemRes, catRes]) => {
        const item = { ...this.props.item, ...itemRes.data.item };
        // If navigated directly, we dont have catId
        if (!catId && item.category_id) {
          ApiClient.getCategoryPath(item.category_id).then(res => {
            this.props.setItem(item, res.data);
          });
        }

        this.props.setItem(item, catRes && catRes.data);
      })
      .catch(err => {
        this.props.history.replace("/error/" + err.message);
      });
  }

  componentDidMount() {
    const { item } = this.props;
    if (!item || !item.description) {
      this.fetchItem(this.props.match.params.id, item && item.category_id);
    }
  }

  render() {
    const { item } = this.props;
    if (!item) return <WaitForIt />;

    return (
      <article className="item row">
        <Helmet>
          {item && <title>{item.title} en Mercadolibre</title>}
          {item &&
            item.description && (
              <meta
                name="description"
                content={item.description.substr(0, 200)} // Quick fix
              />
            )}
        </Helmet>
        <div className="col-xs-12 col-sm-8 col-md-9 item__left">
          <section className="item__picture">
            <img
              className="w-100"
              src={item.picture}
              alt={`Imagen de ${item.title}`}
            />
          </section>

          <section className="item__description d-none d-sm-block">
            <ItemDescription value={item.description} />
          </section>
        </div>
        <div className="col item__right">
          <section>
            <p className="item__condition">
              <small>
                {item.condition === "new" ? "Nuevo" : "Usado"}
                {item.sold_quantity && ` - ${item.sold_quantity} vendidos`}
              </small>
            </p>

            <h1 className="text-capitalize m-0 pb-lg">{item.title}</h1>

            <PriceTag className="pb-lg" {...item.price} />

            <div className="btn-buy">
              <button className="btn btn-block btn-blue">Comprar</button>
            </div>
          </section>

          <section className="item__description d-sm-none mt-5">
            <ItemDescription value={item.description} />
          </section>
        </div>
      </article>
    );
  }
}
