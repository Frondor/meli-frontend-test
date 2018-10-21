import React, { Component } from "react";
import Searchbox from "./views/Searchbox";
import Breadcrumbs from "./components/breadcrumbs/Breadcrumbs";
// import ItemView from "./views/Item";
import ResultsView from "./views/Results";
import "./assets/sass/main.sass";

class App extends Component {
  render() {
    const categories = [
      "Electrónica, Audio y Video",
      "iPod",
      "Reproductores",
      "iPod touch",
      "32 GB"
    ];

    return (
      <div>
        <Searchbox />
        <main id="content" className="container">
          <Breadcrumbs path={categories} />
          <div className="bg-white mb-5">
            {/* <ItemView /> */}
            <ResultsView />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
