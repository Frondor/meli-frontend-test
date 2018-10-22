const _ = require("lodash");
const axios = require("axios");
const FakeRedis = require("../redis");
const transformItem = require("./transformItem");

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

  async search(q, limit) {
    const res = await this.http.get(`/sites/${this.site}/search?q=${q}`);

    // Try to use the filters, hence saving 1 http request
    let categories = res.data.filters
      .filter(f => f.id === "category")
      .map(cats => {
        return (
          (cats.values &&
            cats.values[0] &&
            cats.values[0].path_from_root &&
            cats.values[0].path_from_root) ||
          []
        ).map(c => c.name);
      });

    const items = (res.data.results || []).slice(0, limit).map(i => {
      i = transformItem(i);
      delete i.sold_quantity; // no se pide en este spec

      return i;
    });

    if (items.length && !categories.length) {
      categories = await this.getCategoryPath(items[0].category_id);
    }

    return { author, categories, items };
  }

  getItem(id) {
    return this.http
      .get(`/items/${id}`)
      .then(res => ({ author, item: transformItem(res.data) }));
  }

  getItemDescription(id) {
    return this.http
      .get(`/items/${id}/description`)
      .then(res => res.data.plain_text);
  }

  getCurrencies() {
    return this.http.get("/currencies");
  }

  async getCategoryPath(id) {
    const cacheKey = "categoryPath:" + id;
    let payload = await FakeRedis.get("categoryPath::");

    if (!payload) {
      try {
        const { data } = await this.http.get("/categories/" + id);
        payload =
          (data &&
            data.path_from_root &&
            data.path_from_root.map(c => c.name)) ||
          [];
      } catch (err) {
        throw err;
      }

      return await FakeRedis.set(cacheKey, payload);
    }

    return payload;
  }
}

module.exports = new Meli({ baseURL });
