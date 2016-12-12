import React, { Component } from 'react';

import './InputColor.css';

class InputColor extends Component {
    constructor(props) {
        super(props);

        this.state = this.getDefaultState(this.props);

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleResetDefaultColor = this.handleResetDefaultColor.bind(this);
    }

    /**
     * Get the default state
     * @param props
     * @returns {{colorTmp: *}}
     */
    getDefaultState(props) {
        return {color: props.color, colorValid: props.color};
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.color !== nextProps.color) {
            // The color changed
            this.setState(this.getDefaultState(nextProps));
        }
    }

    /**
     * When the user change the color
     * @param e
     */
    handleChange(e) {
        const value = e.target.value.toLowerCase();
        if (this.isColorTypeValid(value)) {
            this.setState((prevState, props) => {
                prevState.color = value;
                return prevState;
            });
            this.onStartTyping(value);
        }

        if (this.isColorValid(value)) {
            this.setState((prevState, props) => {
                prevState.colorValid = value;
                return prevState;
            });
            this.onUpdate(value);
        }
    }

    /**
     * When the input lose the focus
     * @param e
     */
    handleBlur(e) {
        const value = e.target.value.toLowerCase();
        if (!this.isColorValid(value)) {
            this.setState((prevState, props) => {
                prevState.color = prevState.colorValid;
                return prevState;
            });
            this.onStopTyping(value);
        }
    }

    /**
     * Get back the default color
     * @param e
     */
    handleResetDefaultColor(e) {
        this.setState({color: this.props.defaultColor, colorValid: this.props.defaultColor});
        this.onUpdate(this.props.defaultColor);
    }

    /**
     * Is the color typed valid?
     * @param color
     */
    isColorTypeValid(color) {
        const regex = /^#[0-9a-f]{0,6}$/i;
        return regex.test(color);
    }

    /**
     * Is the color valid?
     * @param color
     */
    isColorValid(color) {
        const regex = /^#[0-9a-f]{6}$/i;
        return regex.test(color);
    }

    /**
     * Notify the change
     * @param value
     */
    onUpdate(value) {
        if (this.props.onUpdate) {
            this.props.onUpdate(value);
        }
        this.onStopTyping(value);
    }

    /**
     * Notify start typing
     * @param value
     */
    onStartTyping(value) {
        if (this.props.onStartTyping) {
            this.props.onStartTyping(value);
        }
    }

    /**
     * Notify stop typing
     * @param value
     */
    onStopTyping(value) {
        if (this.props.onStopTyping) {
            this.props.onStopTyping(value);
        }
    }

    render() {
        const style = {
            backgroundColor: this.state.colorValid
        };

        const styleInput = {
            color: (this.state.colorValid !== this.state.color) ? 'red' : 'inherit'
        };

        return (
            <div className="form-line">
                <label>{this.props.label}</label>
                    <span className="form-field">
                        <span className="preview-color" style={style}/>

                        <input type="text" onChange={this.handleChange} onBlur={this.handleBlur}
                               value={this.state.color} style={styleInput}
                               className="input-color"/>

                        {this.props.defaultColor && this.state.color !== this.props.defaultColor &&
                        <i className="fa fa-history icon" aria-hidden="true" title="Use the default color"
                           onClick={this.handleResetDefaultColor}></i>
                        }
                    </span>
            </div>
        );
    }
}

InputColor.defaultProps = {
    label: 'Color'
};

export default InputColor;
