import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import ColorBoxItem from './ColorBoxItem';
import { SketchPicker } from 'react-color';

class ColorBox extends React.Component {
    constructor(props) {
        super(props);

        let colors = {
            primary: '#007bff',
            accent: '#28a745',
            dark: '#343a40',
            light: '#6c757d',
        };

        if(!localStorage.getItem('AppColors')) {
            localStorage.setItem('AppColors', JSON.stringify(colors));
        }
        colors = JSON.parse(localStorage.getItem('AppColors'));

        this.state = {
            isOpen: false,
            colors: colors,
            showColorPickerClass: '',
            currentColorCode: 'primary'
        };

        Object.entries(colors).map(color => {
            document.documentElement.style
                .setProperty(`--${color[0]}-color`, color[1]);
            return color;
        });

        window.addEventListener('click', (event) => {
            this.closeColorBoxOnDocumentClick(event);
        });
    }

    /**
     * Close Opened Color Box on document other place click
     * @param event
     */
    closeColorBoxOnDocumentClick(event) {
        let colorBoxWrapper = event.target.closest('.color-box-wrapper');

        if(!colorBoxWrapper) {
            this.setState({ showColorPickerClass: '' });
            let domColorBoxWrapper = document.querySelector('.color-box-wrapper');
            if(domColorBoxWrapper.classList.contains('active')) {
                this.setState({isOpen: false});
                let colorBox = domColorBoxWrapper.querySelector('.color-box');

                if(colorBox) {
                    colorBox.style.maxWidth = null;
                }
            }
        }
    }

    /**
     * Toogle Color Box to open and close
     * @param e
     */
    toggleBox(e) {
        this.setState({isOpen: !this.state.isOpen});
        let colorBox = e.target.closest('.color-box-button').nextElementSibling;
        if (colorBox.style.maxWidth) {
            colorBox.style.maxWidth = null;
            this.setState({ showColorPickerClass: '' });
        } else {
            colorBox.style.maxWidth = `${colorBox.scrollWidth}px`;
        }
    }

    /**
     * Choose Color Code which be changed
     * @param colorCode
     * @param e
     * @returns {Promise<void>}
     */
    handleChangeColor = async (colorCode) => {
        await this.setState({ currentColorCode: colorCode });
        await this.setState({ showColorPickerClass: 'show-picker' });
    }

    /**
     * Change and update color in state, local storage and css variables after complete changing color
     * @param color
     * @returns {Promise<void>}
     */
    handleChangeComplete = async (color) => {
        let colorCode = this.state.currentColorCode;
        await this.setState(previousState => {
            let colors = Object.assign({}, previousState.colors);
            colors[colorCode] = color.hex;
            return { colors };
        });

        await this.setState({'colorPicker': color.hex});
        localStorage.setItem('AppColors', JSON.stringify(this.state.colors));
        document.documentElement.style
            .setProperty(`--${colorCode}-color`, color.hex);
    }

    render() {
        let colors = Object.entries(this.state.colors);
        return (
            <div className={"color-box-wrapper " + (this.state.isOpen ? 'active' : '')}>
                <div className="color-box-button" onClick={(e) => this.toggleBox(e)}>
                    <FontAwesomeIcon icon={faCog} size="lg" className='icon' />
                </div>
                <div className={`color-box ${this.state.showColorPickerClass}`}>
                    <div className="title">Color Box</div>
                    <div className="color-row">
                        {colors.map((color, index) =>
                            <ColorBoxItem
                                key={index.toString()}
                                currentColorCode={this.state.currentColorCode}
                                colorCode={color[0]}
                                color={color[1]}
                                onChangeColor={ this.handleChangeColor }
                            />
                        )}
                    </div>
                </div>
                <div className={`color-picker-wrapper ${this.state.showColorPickerClass}` }>
                    <SketchPicker
                        color={ this.state.colorPicker }
                        onChangeComplete={ this.handleChangeComplete }
                    />
                </div>
            </div>
        );
    };
}

export default ColorBox;
