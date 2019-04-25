import * as React from "react";
import {Row, Col} from "antd";

import {SelectSymbol} from "./SelectSymbol";
import {Correlation} from "./correlation/Correlation";

import "antd/dist/antd.css";
import "./StockCorrelation.less";
import {RefObject} from "react";

interface StockCorrelationProps {
    width: number;
    height: number;
    symbolX?: string;
    symbolY?: string;
}

interface StockCorrelationState {
    symbolX: string;
    symbolY: string;
    width: number;
    height: number;
}

const SYMBOLS = ["^DJI", "^IXIC", "AAPL", "BTC-USD", "ETH-USD", "FB", "GE", "GM", "HPE", "MSFT", "PG", "WMT", "XOM"];

export class StockCorrelation extends React.Component<StockCorrelationProps, StockCorrelationState> {

    readonly state: StockCorrelationState = {
        symbolX: this.props.symbolX || "FB",
        symbolY: this.props.symbolY || "AAPL",
        width: 0,
        height: 0
    }

    private containerRef: RefObject<HTMLDivElement> = React.createRef();

    componentDidMount(): void {
        const containerRect = this.containerRef.current.getBoundingClientRect();
        this.setState({width: containerRect.width, height: containerRect.height});
    }

    render() {
        return <div className="full">
            <Row>
                <Col span={10}>
                    <SelectSymbol symbols={SYMBOLS} selected={this.state.symbolX}/>
                </Col>
                <Col span={4}></Col>
                <Col span={10}>
                    <SelectSymbol symbols={SYMBOLS} selected={this.state.symbolY}/>
                </Col>
            </Row>
            <Row className="full">
                <Col span={24} className="full">
                    <div className="full" ref={this.containerRef}>
                        {this.state.width > 400 && this.state.height > 300 ?
                            <Correlation width={this.state.width} height={this.state.height} symbolX={this.state.symbolX} symbolY={this.state.symbolY}/> :
                            <span>not enough space: {this.state.width} / {this.state.height}</span>}
                    </div>
                </Col>
            </Row>
        </div>
    }
}
