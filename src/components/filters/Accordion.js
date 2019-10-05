import React from 'react';
import AccordionItem from './AccordionItem';
import { TYPES, LOCATION, CATEGORIES } from '../../utils/constants';

class Accordion extends React.Component {
    render() {
        return (
            <div className="accordion-wrapper">
                <AccordionItem
                    title="Categories"
                    options={CATEGORIES}
                    filterType="categories"
                    handleAdvancedFilter={this.props.handleAdvancedFilter}
                />
                <AccordionItem
                    title="Employment Type"
                    options={TYPES}
                    filterType="type"
                    handleAdvancedFilter={this.props.handleAdvancedFilter}
                />
                <AccordionItem
                    title="Location"
                    options={LOCATION}
                    filterType="location"
                    handleAdvancedFilter={this.props.handleAdvancedFilter}
                />
            </div>
        );
    };
}

export default Accordion;
