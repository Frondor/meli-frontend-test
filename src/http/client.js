import axios from "axios";

class Http {
  constructor(axiosOptions) {
    this.http = axios.create(axiosOptions);
  }

  search(queryParam) {
    return this.http.get("/items?q=" + queryParam);
  }

  getItem(id) {
    return this.http.get("/items/" + id);
  }

  getCategoryPath(catId) {
    return this.http.get("/category-path/" + catId);
  }
}

// Hack villero para que funcione por ip de la red también
const { protocol, host } = window.location;
const baseURL = protocol + "//" + host.substr(0, host.length - 1) + "1/api";
export default new Http({
  baseURL,
  timeout: 11000
});
