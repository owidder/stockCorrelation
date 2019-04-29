import * as React from "react";
import * as _ from "lodash";
import {AutoComplete} from "antd";

interface SelectSymbolProps {
    symbols: Symbol[];
    selected: string;
    onChange: (symbol: string)  => void;
}

interface SelectSymbolState {
    data: Array<string>;
}

export interface Symbol {
    short: string;
    full: string;
}

export class SelectSymbol extends React.Component<SelectSymbolProps, SelectSymbolState> {

    readonly state: SelectSymbolState = {data: []};

    handleSearch(text: string) {
        const data = _.uniq(this.props.symbols.map(symbol => symbol.full).filter(full => full.toLowerCase().indexOf(text.toLowerCase()) > -1));
        console.log(data);
        this.setState({data})
    }

    handleSelect(full: string) {
        const short = this.props.symbols.find(s => s.full == full).short;
        this.props.onChange(short);
    }


    render() {
        return <div className="input-field">
            <AutoComplete
                dataSource={this.state.data}
                onSearch={(text) => this.handleSearch(text)}
                onSelect={this.handleSelect.bind(this)}
                defaultValue={this.props.selected}
                placeholder="Enter company"/>
        </div>
    }
}
