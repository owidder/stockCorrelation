import * as React from "react";
import {RefObject} from "react";

import {EndOfDayPrice} from "./types";
import {initScatterPlot, DrawFunction} from "./stockPricesScatterPlot";

interface CorrelationProps {
    width: number;
    height: number;
    symbolX: string;
    symbolY: string;
}

const loadData = async (symbol: string) => {
    const response = await fetch(`./prices/${symbol}`);
    return await response.json();
}

export class Correlation extends React.Component<CorrelationProps> {

    private svgRef: RefObject<SVGSVGElement> = React.createRef();

    private drawScatterPlot: DrawFunction;

    componentDidMount() {
        this.drawScatterPlot = initScatterPlot(this.svgRef.current);
        this.draw();
    }

    async draw() {
        const pricesX  = await loadData(this.props.symbolX);
        const pricesY  = await loadData(this.props.symbolY);
        this.drawScatterPlot(this.props.symbolX, this.props.symbolY, pricesX, pricesY);
    }

    componentDidUpdate() {
        this.draw();
    }

    render() {
        return <div>
            <h1>{this.props.symbolX} vs. {this.props.symbolY}</h1>
            <svg ref={this.svgRef} width={this.props.width} height={this.props.height}/>
        </div>
    }
}
