const getPicture = item => {
  return item.pictures && item.pictures.length
    ? item.pictures[0].secure_url
    : item.picture;
};

/**
 * @description Tranforma un item para que cumpla con lo requerido en el práctico
 */
module.exports = function(item) {
  let decimals = (String(item.price).match(/\.(\d+$)/) || [])[1];

  const payload = {
    id: item.id,
    title: item.title,
    price: {
      currency: item.currency_id,
      amount: item.price,
      decimals: (decimals && decimals.length) || 0
    },
    picture: getPicture(item),
    condition: item.condition,
    free_shipping: item.shipping.free_shipping
  };

  // no se incluyen las propiedades si no vienen definidas en {item}
  if (item.sold_quantity) payload.sold_quantity = item.sold_quantity;
  if (item.description) payload.description = item.description;

  return payload;
};
