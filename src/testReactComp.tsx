import * as React from "react";
import * as ReactDOM from "react-dom";

import {StockCorrelation} from "./StockCorrelation";

const width = window.innerWidth;
const height = window.innerHeight;

ReactDOM.render(<StockCorrelation width={width/2} height={height/2} symbolX={"FB"} symbolY={"GE"}></StockCorrelation>,
    document.getElementById("container"));
