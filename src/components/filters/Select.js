import React from 'react';
import JobItem from "../JobsList";

class Select extends React.Component {
    handleFilter(e) {
        if(typeof this.props.onFilter === 'function') {
            this.props.onFilter(e.target.value, this.props.selectType);
        }
    }

    render() {
        let firstOption;
        let options = [];
        if(this.props.options) {
            options = this.props.options;
        }
        if (this.props.title) {
            firstOption = <option value="all" key="1">{this.props.title}</option>;
        }

        return (
            <div className="select-wrapper">
                <select
                    className="select"
                    value={this.props.value}
                    onChange={(e) => this.handleFilter(e)}
                >
                    {firstOption}
                    {options.map((option, index) =>
                        <option
                            key={this.props.title ? (index + 1).toString() : index.toString()}
                            value={option.key}
                        >{option.value}</option>
                    )}
                </select>
            </div>
        );
    };
}

export default Select;
