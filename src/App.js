import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";

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
    this.setResults = this.setResults.bind(this);
  }

  doSearch(q) {
    const searchQuery = q
      .toLowerCase()
      .trim()
      .replace(/\s\s+/g, "");

    this.props.history.push("/items?search=" + searchQuery.replace(/ /g, "+"));
  }

  setResults (results = [], breadcrumb = []) {
    this.setState({ results, breadcrumb });
  }

  render() {
    // const noView = () => <h1>404 <small>Huston, ¡tenemos un problema!</small></h1>;

    return (
      <div>
        <Searchbox onSubmit={this.doSearch} />
        <main id="content" className="container">
          <Breadcrumbs path={this.state.breadcrumb} />
          <div className="bg-white mb-5">
            <Switch>
              <Route path="/items/:id" exact component={ItemView} />
              <Route
                path="/items"
                exact
                render={props => (
                  <ResultsView
                    results={this.state.results}
                    setResults={this.setResults}
                    {...props}
                  />
                )}
              />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
