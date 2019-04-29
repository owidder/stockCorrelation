import * as React from "react";
import {RefObject} from "react";

import {EndOfDayPrice} from "./types";
import {initScatterPlot, DrawFunction} from "./stockPricesScatterPlot";

interface CorrelationProps {
    width: number;
    height: number;
    symbolX: string;
    symbolY: string;
    symbolMap: {[key: string]: string}
}

const loadData = async (symbol: string): Promise<EndOfDayPrice[]> => {
    const response = await fetch(`./prices/${symbol}`);
    return await response.json();
}

export class Correlation extends React.Component<CorrelationProps> {

    private svgRef: RefObject<SVGSVGElement> = React.createRef();

    private drawScatterPlot: DrawFunction;

    componentDidMount() {
        this.drawScatterPlot = initScatterPlot(this.svgRef.current, this.props.symbolMap);
        this.draw();
    }

    async draw() {
        if(this.props.symbolX && this.props.symbolY) {
            const pricesX  = await loadData(this.props.symbolX);
            const pricesY  = await loadData(this.props.symbolY);
            if(pricesX.length > 0 && pricesY.length > 0) {
                this.drawScatterPlot(this.props.symbolX, this.props.symbolY, pricesX, pricesY, this.props.symbolMap);
            }
        }
    }

    componentDidUpdate() {
        this.draw();
    }

    render() {
        return <div>
            <svg ref={this.svgRef} width={this.props.width} height={this.props.height}/>
        </div>
    }
}
