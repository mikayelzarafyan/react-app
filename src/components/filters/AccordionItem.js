import React from 'react';

class AccordionItem extends React.Component {

    /**
     * Function to toggle accordion open and close
     * @param e
     */
    toggleAccordion(e) {
        e.target.classList.toggle("active");
        let panel = e.target.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
        }
    }

    handleAdvancedFilter(e) {
        if(typeof this.props.handleAdvancedFilter === 'function') {
            this.props.handleAdvancedFilter(e.target.value, e.target.checked, this.props.filterType);
        }
    }

    render() {
        const options = this.props.options || [];
        return (
            <div className="accordion-item">
                <button className="accordion-button" onClick={(e) => this.toggleAccordion(e)}>{this.props.title}</button>
                <div className="accordion-panel">
                    {options.map((option, index) =>
                        <label
                            className="custom-checkbox"
                            key={index.toString()}
                        >
                            {option.value}
                            <input
                                type="checkbox"
                                value={option.key}
                                onChange={(e) => this.handleAdvancedFilter(e)}
                            />
                            <span className="checkmark"></span>
                        </label>
                    )}
                </div>
            </div>
        );
    };
}

export default AccordionItem;
