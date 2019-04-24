import * as React from "react";
import {RefObject} from "react";

import {EndOfDayPrice} from "./types";
import {drawStockPrices} from "./drawStockPrices";

interface CorrelationProps {
    width: number;
    height: number;
    symbolX: string;
    symbolY: string;
}

interface CorrelationState {
    pricesX: EndOfDayPrice[];
    pricesY: EndOfDayPrice[];
}

const loadData = async (symbol: string) => {
    const response = await fetch(`./prices/${symbol}`);
    return await response.json();
}

export class Correlation extends React.Component<CorrelationProps, CorrelationState> {

    readonly state: CorrelationState = {pricesX: [], pricesY: []};

    private svgRef: RefObject<SVGSVGElement> = React.createRef();

    async componentDidMount() {
        const pricesX  = await loadData(this.props.symbolX);
        const pricesY  = await loadData(this.props.symbolY);
        this.setState({pricesX, pricesY});
    }

    componentDidUpdate() {
        drawStockPrices(this.svgRef.current, this.props.symbolX, this.props.symbolY, this.state.pricesX, this.state.pricesY);
    }

    render() {
        return <div>
            <h1>{this.props.symbolX} vs. {this.props.symbolY}</h1>
            <svg ref={this.svgRef} width={this.props.width} height={this.props.height}/>
        </div>
    }
}
