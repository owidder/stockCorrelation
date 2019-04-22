import * as React from "react";
import * as ReactDOM from "react-dom";

import {Correlation} from "./correlation/correlation";

const width = window.innerWidth;
const height = window.innerHeight;

ReactDOM.render(<Correlation width={width/2} height={height/2} symbolX={"FB"} symbolY={"GE"}></Correlation>,
    document.getElementById("container"));
