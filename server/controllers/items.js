const Meli = require("../providers/meli");

const handleError = err => {
  const status = (err && err.status) || 500;
  return {
    message: "human readable text",
    error: "machine_readable_error_code",
    status,
    cause: []
  };
};

const getItem = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [ payload, description ] = await Promise.all([
      await Meli.getItem(id),
      await Meli.getItemDescription(id)
    ]);

    payload.item.description = description

    res.json(payload);
  } catch (err) {
    next(err);
  }
};

const searchItems = async (req, res, next) => {
  const { q } = req.query;
  try {
    res.json(await Meli.search(q, 4));
  } catch (err) {
    next(err);
  }
};

module.exports = { getItem, searchItems };
