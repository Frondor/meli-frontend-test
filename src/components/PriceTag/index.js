import React, { Fragment } from "react";
import "./pricetag.sass";

export default function({
  symbol,
  amount,
  decimals = 0,
  small,
  className,
  children
}) {
  let classes = "item-price",
    fraction;
  if (className) classes += " " + className;

  if (amount) {
    [, amount, fraction] =
      amount
        .toLocaleString(undefined, { minimumFractionDigits: decimals })
        .match(/(^.+)[,.](\d+$)/) || [];

    amount = (
      <Fragment>
        {amount}
        <span className="item-price__decimals">{!small && fraction}</span>
      </Fragment>
    );
  } else {
    amount = <span>Precio a convenir</span>;
  }

  if (small) {
    classes += " item-price--sm";
    fraction = fraction && (
      <span className="item-price__decimals">{fraction}</span>
    );
  }

  return (
    <div className={classes}>
      {symbol && <span className="item-price__currency">{symbol} </span>}
      <span className="item-price__amount">{amount}</span>
      {children}
    </div>
  );
}
