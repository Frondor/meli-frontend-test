import axios from "axios";
import { item } from "../views/Item";

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

  _fakeGet(coll) {
    return new Promise((resolve, reject) => {
      if (coll) resolve({data: { items: new Array(4).fill(item) }});
      else resolve(item);
    });
  }
}

export default new Http({
  // Hack villero para que funcione por ip de la red también
  baseURL:
    window.location.protocol +
    "//" +
    window.location.host.substr(0, window.location.host.length - 1) +
    "1/api",
  timeout: 11000
});
