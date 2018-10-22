const compression = require("compression");
const express = require("express");
const cors = require("cors");
const Meli = require("./providers/meli");
const app = express();
const PORT = 3001;

app.use(cors());
// gzip - desactivar en caso de contar con un reverse proxy
app.use(compression());
// Import controllers
const itemController = require("./controllers/items");

app.get("/api/items", itemController.searchItems);
app.get("/api/items/:id", itemController.getItem);

// Extra route
app.get("/api/category-path/:id", async (req, res, next) => {
  try {
    return res.json(await Meli.getCategoryPath(req.params.id));
  } catch (err) {
    next(err);
  }
});

// TO-DO
//  Error handler

app.listen(PORT, () => console.log(`App ready on port: ${PORT}!`));
