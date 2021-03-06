import HighChartsConfig from "./HighChartsConfig";
import React from "react";
import { Tile } from "../Shared/Tile";
import { AppContext } from "../App/AppProvider";
import ReactHighcharts from "react-highcharts";
import HighchartsTheme from './HighchartsTheme';
ReactHighcharts.Highcharts.setOptions(HighchartsTheme);

export default function () {
  return (
    <AppContext.Consumer>
      {({historical}) => (
        <Tile>
          {historical ? <ReactHighcharts config={HighChartsConfig(historical)}/> : <div>Loading</div>}
        </Tile>
      )}
    </AppContext.Consumer>
  );
}
