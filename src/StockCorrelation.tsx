import * as React from "react";
import {Row, Col} from "antd";
import * as d3 from "d3";

import {SelectSymbol} from "./SelectSymbol";
import {Correlation} from "./correlation/Correlation";

import "antd/dist/antd.css";
import "./StockCorrelation.less";
import {RefObject} from "react";

interface StockCorrelationProps {
    symbolX?: string;
    symbolY?: string;
    symbolChangedCallback: (symbolX: string, symbolY: string) => void;
}

interface StockCorrelationState {
    symbolX: string;
    symbolY: string;
    width: number;
    height: number;
    symbolMap: {[key: string]: string}
}

export class StockCorrelation extends React.Component<StockCorrelationProps, StockCorrelationState> {

    readonly state: StockCorrelationState = {
        symbolX: this.props.symbolX,
        symbolY: this.props.symbolY,
        width: 0,
        height: 0,
        symbolMap: {}
    }

    private containerRef: RefObject<HTMLDivElement> = React.createRef();

    async componentDidMount() {
        const symbols = await d3.csv("./symbols.csv");
        const symbolMap = symbols.reduce((map, symbol) => {
            return {...map, [symbol.symbol]: symbol.name}
        }, {});
        const containerRect = this.containerRef.current.getBoundingClientRect();
        this.setState({width: containerRect.width, height: containerRect.height, symbolMap});
        this.props.symbolChangedCallback(this.state.symbolX, this.state.symbolY);
    }

    changeX(symbolX: string) {
        this.setState({symbolX});
        this.props.symbolChangedCallback(symbolX, this.state.symbolY);
    }

    changeY(symbolY: string) {
        this.setState({symbolY});
        this.props.symbolChangedCallback(this.state.symbolX, symbolY);
    }

    render() {
        return <div className="full">
            <Row>
                <Col span={10}>
                    <SelectSymbol symbolMap={this.state.symbolMap}
                                  selected={this.state.symbolY}
                                  onChange={symbolX => this.changeY(symbolX)}/>
                </Col>
                <Col span={4}/>
                <Col span={10}>
                    <SelectSymbol symbolMap={this.state.symbolMap}
                                  selected={this.state.symbolX}
                                  onChange={symbolY => this.changeX(symbolY)}/>
                </Col>
            </Row>
            <Row className="full">
                <Col span={24} className="full">
                    <div className="full" ref={this.containerRef}>
                        {this.state.width > 400 && this.state.height > 300 ?
                            <Correlation width={this.state.width} height={this.state.height}
                                         symbolX={this.state.symbolX} symbolY={this.state.symbolY}
                                         symbolMap={this.state.symbolMap}/> :
                            <span>not enough space: {this.state.width} / {this.state.height}</span>}
                    </div>
                </Col>
            </Row>
        </div>
    }
}
