import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";

import { item } from "./views/Item";

// Shared styles
import "./assets/sass/main.sass";

// Main views as per spec
import Searchbox from "./views/Searchbox";
import ItemView from "./views/Item";
import ResultsView from "./views/Results";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      results: [],
      breadcrumb: [
        "Electrónica, Audio y Video",
        "iPod",
        "Reproductores",
        "iPod touch",
        "32 GB"
      ]
    };

    this.doSearch = this.doSearch.bind(this);
  }

  doSearch(q) {
    const searchQuery = q
      .toLowerCase()
      .trim()
      .replace(/\s\s+/gi, "");

    this.setState({
      search: searchQuery,
      results: []
    });

    this.props.history.push("/items?search=" + searchQuery.replace(" ", "+"));
  }

  componentDidMount() {
    // const queryParams = new URLSearchParams(this.props.location.search);
    // if (!this.state.search && queryParams.search) {
    //   this.setS
    // }

    setTimeout(() => {
      this.setState({
        results: new Array(4).fill(item)
      });
    }, 2000);
  }

  render() {
    // const noView = () => <h1>404 <small>Huston, ¡tenemos un problema!</small></h1>;

    return (
      <div>
        <Searchbox value={this.state.search} onSubmit={this.doSearch} />
        <main id="content" className="container">
          <Breadcrumbs path={this.state.breadcrumb} />
          <div className="bg-white mb-5">
            <Switch>
              <Route path="/items/:id" exact component={ItemView} />
              <Route
                path="/items"
                exact
                render={props => <ResultsView results={this.state.results} />}
              />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
