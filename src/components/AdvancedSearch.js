import React from 'react';
import Accordion from './filters/Accordion';

class AdvancedSearch extends React.Component {
    render() {
        return (
            <div className="advanced-search">
                <h4 className="advanced-search-title">Advanced Search</h4>
                <Accordion
                    handleAdvancedFilter={this.props.handleAdvancedFilter}
                />
            </div>
        );
    };
}

export default AdvancedSearch;
