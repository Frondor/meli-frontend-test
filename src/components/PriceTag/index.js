import React from "react";
import "./pricetag.sass";

export default function({
  currency = "$",
  amount,
  decimals = 2,
  small,
  className,
  children
}) {
  let classes = "item-price",
    fraction;
  if (className) classes += " " + className;

  [, amount, fraction] =
    amount
      .toLocaleString(undefined, { minimumFractionDigits: decimals })
      .match(/(^.+)[,.](\d+$)/) || [];

  if (small) {
    classes += " item-price--sm";
    fraction = <span className="item-price__decimals">{fraction}</span>;
  }

  return (
    <div className={classes}>
      <span className="item-price__currency">{currency} </span>
      <span className="item-price__amount">
        {amount}
        <span className="item-price__decimals">{!small && fraction}</span>
      </span>
      {children}
    </div>
  );
}
