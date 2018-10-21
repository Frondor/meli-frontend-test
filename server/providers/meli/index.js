const _ = require("lodash");
const axios = require("axios");
const parseItem = require("./parseItem");

// Hacer de cuenta que es una variable de entorno ¯\_(ツ)_/¯
const baseURL = "https://api.mercadolibre.com";

// En el práctico se pide devolver un objeto de este tipo, pero no especifica cómo obtenerlo
// ni aparece en la documentación de la API. Hardcodeo mi nombre
const author = {
  name: "Federico",
  lastname: "Vázquez"
};

class Meli {
  constructor({ baseURL, site = "MLA" }) {
    this.http = axios.create({
      baseURL,
      timeout: 10000
    });

    this.site = site;
  }

  search(q, limit) {
    return this.http.get(`/sites/${this.site}/search?q=${q}`).then(res => {
      let categories = res.data.filters.find(f => f.id === "category");
      const items = (res.data.results || []).slice(0, limit).map(i => {
        i = parseItem(i);
        delete i.sold_quantity; // no se pide en este spec

        return i;
      });

      if (categories) {
        categories = (
          (categories.values &&
            categories.values[0] &&
            categories.values[0].path_from_root &&
            categories.values[0].path_from_root) ||
          []
        ).map(c => c.name);
      }

      return { author, categories, items };
    });
  }

  getItem(id) {
    return this.http
      .get(`/items/${id}`)
      .then(res => ({ author, item: parseItem(res.data) }));
  }

  getItemDescription(id) {
    return this.http
      .get(`/items/${id}/description`)
      .then(res => res.data.plain_text);
  }

  currencies() {
    return this.http.get("/currencies");
  }

  categories(id) {
    let endpoint = "/categories";
    if (id) endpoint += "/" + id;
    return this.http.get(endpoint);
  }
}

module.exports = new Meli({ baseURL });
