const compression = require("compression");
const express = require("express");
const app = express();
const PORT = 3001;

// gzip - desactivar en caso de contar con un reverse proxy
app.use(compression());

// Import controllers
const itemController = require("./controllers/items");

app.get("/api/items", itemController.searchItems);
app.get("/api/item/:id", itemController.getItem);

app.listen(PORT, () => console.log(`App ready on port: ${PORT}!`));
