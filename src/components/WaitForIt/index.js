import React from "react";

export default function({ width = "200px", height = "200px", children, ready }) {
  if (ready) return children
  return (
    <svg
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      className="ml-auto w-100 mt-3 mb-3"
    >
      <circle
        cx="50"
        cy="50"
        r="29.1973"
        fill="none"
        stroke="#eeeeee"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          calcMode="spline"
          values="0;40"
          keyTimes="0;1"
          dur="1.5"
          keySplines="0 0.2 0.8 1"
          begin="-0.75s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          calcMode="spline"
          values="1;0"
          keyTimes="0;1"
          dur="1.5"
          keySplines="0.2 0 0.8 1"
          begin="-0.75s"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        cx="50"
        cy="50"
        r="7.45728"
        fill="none"
        stroke="#cccccc"
        strokeWidth="2"
      >
        <animate
          attributeName="r"
          calcMode="spline"
          values="0;40"
          keyTimes="0;1"
          dur="1.5"
          keySplines="0 0.2 0.8 1"
          begin="0s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          calcMode="spline"
          values="1;0"
          keyTimes="0;1"
          dur="1.5"
          keySplines="0.2 0 0.8 1"
          begin="0s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
