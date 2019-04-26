import * as React from "react";
import {Select} from "antd";
import * as _ from "lodash";

interface SelectSymbolProps {
    symbolMap: {[key: string]: string};
    selected: string;
    onChange: (symbol: string)  => void;
}

export class SelectSymbol extends React.Component<SelectSymbolProps> {

    render() {
        return <div className="input-field">
            <Select defaultValue={this.props.selected} onChange={this.props.onChange}>
                {_.keys(this.props.symbolMap).map((symbol, i) => {
                    return <Select.Option value={symbol} key={i}>{this.props.symbolMap[symbol]}</Select.Option>
                })}
            </Select>
        </div>
    }
}
