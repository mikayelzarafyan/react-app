import React from 'react';

class ColorBoxItem extends React.Component {

    /**
     * Choose Color Code which be changed (send action to parent)
     * @param colorCode
     * @param e
     */
    onChangeColor(colorCode, e) {
        if(typeof this.props.onChangeColor === 'function') {
            this.props.onChangeColor(colorCode, e);
        }
    }

    render() {
        let style= {backgroundColor: this.props.color};
        return (
            <div className="color-box-item">
                <div className="color-item-title">
                    {this.props.colorCode}
                </div>
                <div
                    className={`color-item ${(this.props.currentColorCode === this.props.colorCode) ? "active" : ""}`}
                    style={style}
                    onClick={(e) => this.onChangeColor(this.props.colorCode, e)}
                ></div>
            </div>
        );
    };
}

export default ColorBoxItem;
