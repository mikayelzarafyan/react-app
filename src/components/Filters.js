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
                    onFilter={this.props.onFilter}
                />
                <Select
                    title="Jobs Location"
                    selectType="location"
                    options={LOCATION}
                    onFilter={this.props.onFilter}
                />
                <Search
                    placeholder="Type your keyword"
                    selectType="search"
                    onFilter={this.props.onFilter}
                />
            </div>
        );
    };
}

export default Filters;
