import React from "react";
import "./breadcrumbs.sass";

export default function(props) {
  // const list = ["One", "Two", "Three"].map(s => (
  //   <li key={s}>
  //     <a href={"/" + s}>{s}</a>
  //   </li>
  // ));
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><a href="/va">Home</a></li>
        <li className="breadcrumb-item"><a href="/va">Library</a></li>
        <li className="breadcrumb-item active" aria-current="page">Data</li>
      </ol>
    </nav>
  );
}
