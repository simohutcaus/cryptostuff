import React from "react";
import styled, { css } from "styled-components";
import { SelectableTile } from "../Shared/Tile";
import { fontSize3, fontSizeBig, greenBoxShadow } from "../Shared/Styles";
import CoinHeaderGrid, {
  CoinHeaderGridStyled,
} from "../Settings/CoinHeaderGrid";

import { AppContext } from "../App/AppProvider";

const JustifyRight = styled.div`
  justify-self: right;
`;

const JustifyLeft = styled.div`
  justify-self: left;
`;

const ChangePct = styled.div`
  color: green;
  ${(props) =>
    props.red &&
    css`
      color: red;
    `}
`;

const TickerPrice = styled.div`
  ${fontSizeBig}
`;

const numberFormat = (number) => {
  return +(number + "").slice(0, 7);
};

const PriceTileStyled = styled(SelectableTile)`
  ${props =>
    props.compact &&
    css`
      display: grid;
      ${fontSize3}
      grid-gap: 5px;
      grid-template-columns: repeat(3, 1fr);
      justify-items: right;
    `}
  ${props =>
    props.currentFavorite &&
    css`
      box-shadow: 0px 0px 4px 2px #5fff17;
      pointer-events: none;
    `}
`

function ChangePercent({ data }) {
  return (
    <JustifyRight>
      <ChangePct red={data.CHANGEPCTDAY <= 0}>
        <div>{numberFormat(data.CHANGEPCTDAY)}</div>
      </ChangePct>
    </JustifyRight>
  );
}

function PriceTile({ sym, data, currentFavorite, setCurrentFavorite }) {
  return (
    <PriceTileStyled currentFavorite={currentFavorite} setCurrentFavorite={setCurrentFavorite} onClick={setCurrentFavorite}>
      <CoinHeaderGridStyled>
        <div>{sym}</div>
        <ChangePercent data={data} />
      </CoinHeaderGridStyled>
      <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
}

function PriceTileCompact({ sym, data, currentFavorite, setCurrentFavorite }) {
  return (
    <PriceTileStyled
      compact
      currentFavorite={currentFavorite}
      onClick={setCurrentFavorite}
    >
      <JustifyLeft>
        <div>{sym}</div>
      </JustifyLeft>
      <ChangePercent data={data} />
      <TickerPrice>${numberFormat(data.PRICE)}</TickerPrice>
    </PriceTileStyled>
  );
}

export default function ({ price, index }) {
  let sym = Object.keys(price)[0];
  let data = price[sym]["USD"];
  let TileClass = index < 5 ? PriceTile : PriceTileCompact;
  return (
    <AppContext.Consumer>
      {({currentFavorite, setCurrentFavorite}) => ( 
      <TileClass
        sym={sym}
        data={data}
        currentFavorite={currentFavorite === sym}
        setCurrentFavorite={() => setCurrentFavorite(sym)}
        ></TileClass>
      )}
    </AppContext.Consumer>
  );
}
