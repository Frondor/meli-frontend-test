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
}

export default new Http({
  baseURL: "0.0.0.0:3001/api",
  timeout: 11000
});
