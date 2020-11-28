import React from "react";

export default function ({ coin, style }) {
  return (
    <img
      alt={coin.coinSymbol}
      style={style || { height: "50px" }}
      src={`http://cryptocompare.com/${coin.ImageUrl}`}
    />
  );
}
