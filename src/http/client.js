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
let { protocol, host } = window.location;

if (process.env.NODE_ENV === "production") host += "/api"
else host = host.substr(0, host.length - 1) + "1/api";

const baseURL = protocol + "//" + host;
export default new Http({
  baseURL,
  timeout: 11000
});
