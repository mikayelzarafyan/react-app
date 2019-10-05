import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {searchValue: ''};
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
                    value={this.state.searchValue}
                    placeholder={this.props.placeholder}
                    onChange={event => this.setState({ searchValue: event.target.value })}
                />
                <button onClick={() => this.handleFilter(this.state.searchValue)}>Search</button>
            </div>
        );
    };
}

export default Search;
