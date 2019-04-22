import * as React from "react";
import * as ReactDOM from "react-dom";

import {Correlation} from "./correlation/correlation";

ReactDOM.render(<Correlation width={10} height={10} symbolX={"FB"} symbolY={"GE"}></Correlation>,
    document.getElementById("container"));
