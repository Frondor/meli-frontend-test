import React, { Component } from "react";
// import logo from "./logo.svg";
import Header from "./components/header/Header";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";
import "./assets/sass/main.sass";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div id="content" className="container">
          <Breadcrumbs />
        </div>
      </div>
    );
  }
}

export default App;
