import * as React from "react";
import {ReactNode} from "react";
import {symbol} from "prop-types";

interface CorrelationProps {
    width: number;
    height: number;
    symbolX: string;
    symbolY: string;
}

interface EndOfDayPrice {
    date: string;
    price: number;
}

interface CorrelationState {
    pricesX: EndOfDayPrice[];
    pricesY: EndOfDayPrice[];
}

const loadData = async (symbol: string) => {
    const response = await fetch(`./prices/${symbol}`);
    const prices = await response.json();

    return prices;
}

export class Correlation extends React.Component<CorrelationProps, CorrelationState> {

    readonly state: CorrelationState = {pricesX: [], pricesY: []};

    private async loadData(symbol: string) {

    }

    async componentDidMount() {
        const pricesX  = await loadData(this.props.symbolX);
        const pricesY  = await loadData(this.props.symbolY);
        this.setState({pricesX, pricesY});
    }

    render() {
        return <div>
            <h1>{this.props.symbolX} vs. {this.props.symbolY}</h1>
            <h2>{this.state.pricesX.length > 0 ? this.state.pricesX[0].price : "NA"}</h2>
            <h2>{this.state.pricesY.length > 0 ? this.state.pricesY[0].price : "NA"}</h2>
        </div>
    }
}
