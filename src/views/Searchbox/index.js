import React, { Component } from "react";
import queryString from "query-string";
import searchIcon from "../../assets/img/ic_Search.png";
import logoURL from "../../assets/img/Logo_ML.png";
import "./searchbox.sass";

export default class Searchbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };

    this.input = React.createRef();

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    this.setState({
      search: ev.target.value
    });
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.input.current.blur();

    this.props.onNavigate(
      "/items?search=" +
        this.state.search
          .toLowerCase()
          .trim()
          .replace(/\s\s+/g, "")
          .replace(/ /g, "+")
    );
  }

  componentDidMount() {
    this.setState({}); // force componentDidUpdate
  }

  componentDidUpdate() {
    const { search } = queryString.parse(this.props.location.search);
    if (search && search !== this.lastSearch) {
      this.lastSearch = search;
      this.setState({ search });
    }
  }

  goHome(e) {
    e.preventDefault();
    this.setState({ search: "" });
    this.props.onNavigate("/");
  }

  render() {
    return (
      <header id="search-box" className="bg-yellow">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <div id="logo">
                <a href="/" onClick={e => this.goHome(e)}>
                  <img src={logoURL} alt="Mercadolibre logo" />
                </a>
              </div>
            </div>
            <form className="col pl-2" onSubmit={this.onSubmit}>
              <div id="search-box" className="input-group">
                <input
                  ref={this.input}
                  tabIndex="1"
                  maxLength="120"
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck="false"
                  autoComplete="off"
                  type="text"
                  className="form-control"
                  placeholder="Nunca dejes de buscar"
                  value={this.state.search}
                  onChange={this.onChange}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary bg-light border-0"
                    type="button"
                  >
                    <img src={searchIcon} alt="Ícono de búsqueda" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </header>
    );
  }
}
