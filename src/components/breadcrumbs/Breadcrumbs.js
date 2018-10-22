import React from "react";
import "./breadcrumbs.sass";

export default function({ path = [] }) {
  const list = path.map((s, i, arr) => {
    const current = i === arr.length - 1;
    let classes = "breadcrumb-item";
    if (current) classes += " active";

    return (
      <li className={classes} key={s}>
        <a href="/" onClick={e => e.preventDefault()}>
          {s}
        </a>
      </li>
    );
  });

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">{list}</ol>
    </nav>
  );
}
