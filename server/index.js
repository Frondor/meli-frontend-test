const compression = require("compression");
const Meli = require("./providers/meli");
const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(cors());
// gzip - desactivar en caso de contar con un reverse proxy
app.use(compression());
// Import controllers
const itemController = require("./controllers/items");

// Main routes
app.get("/api/items", itemController.searchItems);
app.get("/api/items/:id", itemController.getItem);

// Extra route bien villera
app.get("/api/category-path/:id", async (req, res, next) => {
  try {
    return res.json(await Meli.getCategoryPath(req.params.id));
  } catch (err) {
    next(err);
  }
});

// Serve build artifacts
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html"));
});

// TO-DO
//  Error handler goes here

app.listen(process.env.PORT || PORT, () =>
  console.log(`App ready on port: ${PORT}!`)
);
