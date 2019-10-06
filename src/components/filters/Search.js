import React from 'react';

class Search extends React.Component {
    handleOnInput(value) {
        if(typeof this.props.onInput === 'function') {
            this.props.onInput(value);
        }
    }

    handleFilter(value) {
        if(typeof this.props.onFilter === 'function') {
            this.props.onFilter(value, this.props.selectType);
        }
    }
    render() {
        return (
            <div className="search-wrapper">
                <input
                    type="text"
                    value={this.props.searchValue}
                    placeholder={this.props.placeholder}
                    onChange={event => this.handleOnInput(event.target.value)}
                />
                <button onClick={() => this.handleFilter(this.props.searchValue)}>Search</button>
            </div>
        );
    };
}

export default Search;
