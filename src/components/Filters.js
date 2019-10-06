import React from 'react';
import Search from './filters/Search';
import Select from './filters/Select';
import { CATEGORIES, LOCATION } from '../utils/constants';

class Filters extends React.Component {
    render() {
        return (
            <div className="filters-wrapper">
                <Select
                    title="Jobs Category"
                    selectType="categories"
                    options={CATEGORIES}
                    value={this.props.filterCategory}
                    onFilter={this.props.onFilter}
                />
                <Select
                    title="Jobs Location"
                    selectType="location"
                    options={LOCATION}
                    value={this.props.filterLocation}
                    onFilter={this.props.onFilter}
                />
                <Search
                    placeholder="Type your keyword"
                    selectType="search"
                    searchValue={this.props.filterSearch}
                    onInput={this.props.onInput}
                    onFilter={this.props.onFilter}
                />
            </div>
        );
    };
}

export default Filters;
