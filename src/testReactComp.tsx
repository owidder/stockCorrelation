import * as React from "react";
import * as ReactDOM from "react-dom";

import {StockCorrelation} from "./StockCorrelation";

const queryString = require("query-string");

const width = window.innerWidth;
const height = window.innerHeight;

const params= queryString.parse(window.location.hash);

const symbolX = params.x || "FB";
const symbolY = params.y || "AAPL";

const setParams = (symbolX: string, symbolY: string) => {
    const newParams = {x: symbolX, y: symbolY};
    window.location.hash = queryString.stringify(newParams);
}

ReactDOM.render(<StockCorrelation symbolChangedCallback={setParams} width={width/2} height={height/2} symbolX={symbolX} symbolY={symbolY}></StockCorrelation>,
    document.getElementById("container"));
