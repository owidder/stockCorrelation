import * as React from "react";
import {Row, Col} from "antd";
import * as d3 from "d3";
import * as _ from "lodash";

import {SelectSymbol, Symbol} from "./SelectSymbol";
import {Correlation} from "./correlation/Correlation";

import "antd/dist/antd.css";
import "./StockCorrelation.less";
import {RefObject} from "react";

export interface SymbolMap {
    [key: string]: string;
}

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
    symbolMap: SymbolMap
}

const chooseRandomSymbol = (symbolMap: SymbolMap) => {
    const symbols = _.keys(symbolMap);
    const randomIndex = _.random(symbols.length - 1);
    return symbols[randomIndex];
}

const getSymbolMap = async (): Promise<SymbolMap> => {
    const symbols = await d3.csv("./symbols.csv");
    return symbols.reduce((map, symbol) => {
        return {...map, [symbol.symbol]: symbol.name}
    }, {});
}

const symbolMapToSymbols = (symbolMap: SymbolMap): Symbol[] => {
    return _.keys(symbolMap).map(key => {
        return {
            short: key,
            full: symbolMap[key]
        }
    })
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
        const symbolMap = await getSymbolMap();
        const containerRect = this.containerRef.current.getBoundingClientRect();
        const symbolX = this.state.symbolX || chooseRandomSymbol(symbolMap);
        const symbolY = this.state.symbolY || chooseRandomSymbol(symbolMap);
        this.setState({width: containerRect.width, height: containerRect.height, symbolMap, symbolX, symbolY});
        this.props.symbolChangedCallback(symbolX, symbolY);
    }

    changeX(symbolX: string) {
        this.setState({symbolX});
        this.props.symbolChangedCallback(symbolX, this.state.symbolY);
    }

    changeY(symbolY: string) {
        this.setState({symbolY});
        this.props.symbolChangedCallback(this.state.symbolX, symbolY);
    }

    renderSelectSymbol(selectedSymbol: string, onChange: (symbol: string) => void) {
        if(selectedSymbol) {
            const symbols = symbolMapToSymbols(this.state.symbolMap);
            const companyName = this.state.symbolMap[selectedSymbol];
            return <div>
                <small>Enter Company</small>
                <SelectSymbol symbols={symbols}
                                  selected={companyName}
                                      onChange={onChange}/>
            </div>
        }

        return <span>Nothing selected</span>
    }

    render() {
        return <div className="full">
            <Row>
                <Col span={10}>
                    {this.renderSelectSymbol(this.state.symbolY, symbol => this.changeY(symbol))}
                </Col>
                <Col span={4}><h1 style={{textAlign: "center"}}>vs</h1></Col>
                <Col span={10}>
                    {this.renderSelectSymbol(this.state.symbolX, symbol => this.changeX(symbol))}
                </Col>
            </Row>
            <Row className="full">
                <Col span={24} className="full">
                    <div className="full" ref={this.containerRef}>
                        {this.state.width > 300 && this.state.height > 300 ?
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
