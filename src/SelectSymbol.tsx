import * as React from "react";
import {Select} from "antd";

interface SelectSymbolProps {
    symbols: string[];
    selected: string;
    onChange: (symbol: string)  => void;
}

export class SelectSymbol extends React.Component<SelectSymbolProps> {

    render() {
        return <div className="input-field">
            <Select defaultValue={this.props.selected} onChange={this.props.onChange}>
                {this.props.symbols.map((symbol, i) => {
                    return <Select.Option value={symbol} key={i}>{symbol}</Select.Option>
                })}
            </Select>
        </div>
    }
}
