import React from "react";
import logo from "../../assets/img/Logo_ML.png";
// import searchIcon from "../../assets/img/ic_Search.png";
import "./searchbox.sass";

export default function (props) {
  return (
    <header id="search-box" className="bg-yellow">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-auto">
            <div id="logo">
              <img src={logo} alt="Mercadolibre logo" />
            </div>
          </div>
          <div className="col">
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
              />
              {/* <div className="input-group-append">
                <img src={searchIcon} alt="Ícono de búsqueda" class="img-fluid" />
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
