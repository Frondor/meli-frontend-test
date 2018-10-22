import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";

// Shared styles
import "./assets/sass/main.sass";

// Main views as per spec
import Searchbox from "./views/Searchbox";
import ItemView from "./views/Item";
import ResultsView from "./views/Results";

// Extra views
import Home from "./views/Home";
// TO-DO: Error Handler HOComponent
const ErrorView = props => (
  <h2 className="bg-danger p-4 text-white">
    {props.match.params.m || "Una loca página de error genérica se asoma"}
  </h2>
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
      results: [],
      breadcrumb: []
    };

    this.setItem = this.setItem.bind(this);
    this.setResults = this.setResults.bind(this);
    this.onNavigate = this.onNavigate.bind(this);
  }

  setResults(results = [], breadcrumb = []) {
    this.setState({ results, breadcrumb });
  }

  // Transition with base data, then fetch the rest of the item
  setItem(item, breadcrumb = []) {
    this.setState({ item, breadcrumb });
    this.props.history.push("/items/" + item.id);
  }

  onNavigate(path) {
    if (path === "/") {
      this.setState({ results: [], breadcrumb: [], item: null });
    }

    this.props.history.push(path);
  }

  render() {
    // const noView = () => <h1>404 <small>Huston, ¡tenemos un problema!</small></h1>;

    return (
      <div>
        <Searchbox
          location={this.props.location}
          onNavigate={this.onNavigate}
        />
        <main id="content" className="container">
          <Breadcrumbs path={this.state.breadcrumb} />
          <div className="bg-white mb-5">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/items/:id"
                exact
                render={props => (
                  <ItemView
                    item={this.state.item}
                    setItem={this.setItem}
                    {...props}
                  />
                )}
              />
              <Route
                path="/items"
                exact
                render={props => (
                  <ResultsView
                    results={this.state.results}
                    setResults={this.setResults}
                    setItem={this.setItem}
                    {...props}
                  />
                )}
              />
              <Route path="/error/:m?" component={ErrorView} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
