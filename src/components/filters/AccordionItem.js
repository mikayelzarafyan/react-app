import React from 'react';

class AccordionItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };
    }

    /**
     * Function to toggle accordion open and close
     * @param e
     */
    toggleAccordion(e) {
        this.setState({isOpen: !this.state.isOpen});
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
        let selectedItems = this.props.selectedItems;
        if(!selectedItems) {
            selectedItems = [];
        }
        return (
            <div className="accordion-item">
                <button
                    className={"accordion-button " + (this.state.isOpen ? 'active' : '')}
                    onClick={(e) => this.toggleAccordion(e)}
                >{this.props.title}</button>
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
                                checked={selectedItems.includes(option.key) ? true : false}
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
