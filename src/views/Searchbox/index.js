import React, { Component } from "react";
import { Link } from "react-router-dom";
// import searchIcon from "../../assets/img/ic_Search.png";
import logoURL from "../../assets/img/Logo_ML.png";
import "./searchbox.sass";

export default class Searchbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      search: props.value || ""
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(ev) {
    this.setState({
      search: ev.target.value
    })
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.onSubmit(this.state.search)
  }

  render() {
    return (
      <header id="search-box" className="bg-yellow">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <div id="logo">
                <Link to="/">
                  <img src={logoURL} alt="Mercadolibre logo" />
                </Link>
              </div>
            </div>
            <form className="col pl-2" onSubmit={this.onSubmit}>
              <div id="search-box" className="input-group">
                <input
                  tabIndex="1"
                  maxLength="120"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Nunca dejes de buscar"
                  onChange={this.onChange}
                />
                {/* <div className="input-group-append">
                  <img src={searchIcon} alt="Ícono de búsqueda" class="img-fluid" />
                </div> */}
              </div>
            </form>
          </div>
        </div>
      </header>
    );
  }
}
