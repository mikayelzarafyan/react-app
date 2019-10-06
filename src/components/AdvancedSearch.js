import React from 'react';
import Accordion from './filters/Accordion';

class AdvancedSearch extends React.Component {
    render() {
        return (
            <div className="advanced-search">
                <h4 className="advanced-search-title">Advanced Search</h4>
                <Accordion
                    handleAdvancedFilter={this.props.handleAdvancedFilter}
                    selectedLocation={this.props.selectedLocation}
                    selectedCategories={this.props.selectedCategories}
                    selectedTypes={this.props.selectedTypes}
                />
            </div>
        );
    };
}

export default AdvancedSearch;
